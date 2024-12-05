import { Server } from 'socket.io';

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const users = [];

  
  const messages = [];

  
  const userMessages = new Map(); 

  

  const getUserLatestMessage = (userId, reciverId) => {
    const key = `${userId}-${reciverId}`;
    return userMessages.get(key) || { message: "No message", time: new Date().toISOString(),isRead:false,sender:''};
  };

  io.on('connection', (socket) => {
    console.log('A guest connected:', socket.id);

    socket.on('set username', ({ username }) => {
      const user = {
        id: socket.id,
        userName: username,
        sender:"",
        message: "No message",
        time: new Date().toISOString(),
        isRead: false,
      };
    
      users.push(user);
      console.log(users,"user");
      io.sockets.sockets.forEach((userSocket) => {
        const userId = userSocket.id;
        const usersData = users
          .filter(u => u.id !== userId)
          .map(u => ({
            ...u,
            message: getUserLatestMessage(userId, u.id).message,
            time: getUserLatestMessage(userId, u.id).time,
            sender: getUserLatestMessage(userId, u.id).sender
          }));
        userSocket.emit('users', usersData);
      });
    });
    
    socket.on('get messages', ({ senderId, receiverId }) => {
      console.log("hit get message");
      
      const filteredMessages = messages.filter(
        msg => (msg.sender === senderId && msg.receiver === receiverId) ||
               (msg.sender === receiverId && msg.receiver === senderId)
      );
      socket.emit('filtered messages', filteredMessages);
    });

    socket.on('chat message', (data) => {
      let sender, receiver, message, image;
    
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        ({ sender, receiver, message, image } = parsedData);
      } catch (error) {
        socket.emit('error', { message: 'Invalid message format' });
        return;
      }

      const chat = {
        _id: messages.length + 1,
        sender,
        receiver,
        message,
        image,
        timestamp: new Date().toISOString(),
        isRead:false
      };
    
      messages.push(chat);
      console.log(messages,"Messages");
      
      userMessages.set(`${sender}-${receiver}`, { message,sender, time: chat.timestamp, isRead:chat.isRead });
      userMessages.set(`${receiver}-${sender}`, { message,sender, time: chat.timestamp, isRead:chat.isRead });
      console.log(userMessages,"userMessages");

      [sender, receiver].forEach(userId => {
        const userSocket = io.sockets.sockets.get(userId);
        if (userSocket) {
          const usersData = users
            .filter(u => u.id !== userId)
            .map(u => ({
              ...u,
              message: getUserLatestMessage(userId, u.id).message,
              time: getUserLatestMessage(userId, u.id).time,
              sender:getUserLatestMessage(userId, u.id).sender,
            }));
          userSocket.emit('users', usersData);
        }
      });

      io.to(receiver).emit('new message', chat);
      
      socket.emit('message sent', chat);
    });

    
    socket.on('message opened', (data) => {
      const { sender, receiver } = data;
      console.log("log");
      

      userMessages.set(`${sender}-${receiver}`, { ...userMessages.get(`${sender}-${receiver}`), isRead: true });
      userMessages.set(`${receiver}-${sender}`, { ...userMessages.get(`${receiver}-${sender}`), isRead: true });
    
      io.to(sender).emit('message seen', { receiver, isRead: true });
      io.to(receiver).emit('message seen', { sender, isRead: true });

      [sender, receiver].forEach(userId => {
        const userSocket = io.sockets.sockets.get(userId);
        if (userSocket) {
          const usersData = users
            .filter(u => u.id !== userId)
            .map(u => ({
              ...u,
              message: getUserLatestMessage(userId, u.id).message,
              sender: getUserLatestMessage(userId, u.id).sender,
              isRead: getUserLatestMessage(userId, u.id).isRead,
            }));
          userSocket.emit('users', usersData);
        }
      });
    });
    

    socket.on('disconnect', () => {
      console.log('Guest disconnected:', socket.id);

      const userIndex = users.findIndex((user) => user.id === socket.id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        console.log(`Removed user ${socket.id}`);
        
        userMessages.forEach((_, key) => {
          if (key.includes(socket.id)) {
            userMessages.delete(key);
          }
        });

        io.sockets.sockets.forEach((userSocket) => {
          const userId = userSocket.id;
          const usersData = users
            .filter(u => u.id !== userId)
            .map(u => ({
              ...u,
              message: getUserLatestMessage(userId, u.id).message,
              time: getUserLatestMessage(userId, u.id).time,
              sender:getUserLatestMessage(userId, u.id).sender,
            }));
          userSocket.emit('users', usersData);
        });
      }
    });
    socket.on('message sent', (message) => {
      console.log('Message sent acknowledgement:', message);
    });
  });

  return io;
};


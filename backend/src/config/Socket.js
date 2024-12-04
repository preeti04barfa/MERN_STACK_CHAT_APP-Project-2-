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

  io.on('connection', (socket) => {
    console.log('A guest connected:', socket.id);

    io.emit('users', users);

    // socket.on('set username', ({ username }) => {
    //   const user = {
    //     id: socket.id,
    //     userName: username || `User${users.length + 1}`,
    //     message: "Hello",
    //     time: '2024-11-28T10:05:00Z',
    //     isRead: true,
    //   };
    //   users.push(user);
    //   console.log(users, "connected users");
    //   io.emit('users', users);
    // });


    socket.on('set username', ({ username }) => {
      const userMessages = messages.filter(
        (msg) => msg.sender === socket.id || msg.receiver === socket.id
      );
      
   
      const latestMessage = userMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    
      const user = {
        id: socket.id,
        userName: username || `User${users.length + 1}`,
        message: latestMessage ? latestMessage.message : "No message",
        time: latestMessage ? latestMessage.timestamp : new Date().toISOString(), 
        isRead: latestMessage ? latestMessage.isRead : true, 
      };
    
      users.push(user);
      console.log(users, "connected users");
      io.emit('users', users);
    });
    
    socket.on('get messages', ({ senderId, receiverId }) => {
      console.log("hit get message ");
      
      if(messages){
      const filteredMessages = messages.filter(
        msg => (msg.sender === senderId && msg.receiver === receiverId) ||
               (msg.sender === receiverId && msg.receiver === senderId)
      );
      socket.emit('filtered messages', filteredMessages);}
      else{
        console.log("no chat fround");
        
      }
    });

    socket.on('chat message', (data) => {
      let sender, receiver, message;
    
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        ({ sender, receiver, message } = parsedData);
      } catch (error) {
        socket.emit('error', { message: 'Invalid message format' });
        return;
      }

      const chat = {
        _id: messages.length + 1,
        sender,
        receiver,
        message,
        timestamp: new Date().toISOString(),
      };
    
      messages.push(chat); 
      console.log('msg save in array:', messages);
      const updateUserMessage = (userId, message, timestamp) => {
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          users[userIndex].message = message;
          users[userIndex].time = timestamp;
          io.emit('users', users);
        }
      };

      updateUserMessage(sender, message, chat.timestamp);
      updateUserMessage(receiver, message, chat.timestamp);

      io.to(receiver).emit('new message', chat);
      console.log(`msg emit ${receiver}`);
    });
    socket.on('disconnect', () => {
      console.log('Guest disconnected:', socket.id);

      const userIndex = users.findIndex((user) => user.id === socket.id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        console.log(`Removed user ${socket.id}`);
        console.log(users, "connected users");
        io.emit('users', users);
      }
    });
  });

  return io;
};

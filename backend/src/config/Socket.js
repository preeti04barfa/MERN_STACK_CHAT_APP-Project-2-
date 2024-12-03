import { Server } from 'socket.io';
import { Chat } from '../model/ChatModel.js';
import { Room } from '../model/RoomModel.js';

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const users = []; 

  io.on('connection', (socket) => {
    console.log('A guest connected:', socket.id);

    io.emit('users', users);
    socket.on('set username', ({ username }) => {
      const user = { id: socket.id, userName: username || `User${users.length + 1}`, message:"Hello", time: '2024-11-28T10:05:00Z', isRead: true};
      users.push(user);
      console.log(users, "connected users");
      io.emit('users', users);
    });

    socket.on('join room', async ({ roomId, socketId2}) => {
      try {
        let room;
    
        if (roomId) {
          room = await Room.findById(roomId);
          if (!room) {
            console.error(`Room with ID ${roomId} does not exist.`);
            socket.emit('error', { message: 'Room does not exist' });
            return;
          }
    
          if (!room.participants.includes(socket.id)) {
            room.participants.push(socket.id);
            await room.save();
          }
    
    
          if (room.participants.length > 2 && !room.groupChat) {
            room.groupChat = true;
            await room.save();
          
            io.to(room._id.toString()).emit('group chat status', { status: true });
          }
        } else {
          console.log("Creating a new room for guest:", socket.id);
          room = new Room({ participants: [socket.id, socketId2] });
          await room.save();
          console.log(`New room created with ID: ${room._id}`);
          io.emit('room', room);
        }
    
        const joinedRoomId = room._id.toString();
        socket.join(joinedRoomId);
    
        console.log(`Guest ${socket.id} joined room ${joinedRoomId}`);
        io.to(joinedRoomId).emit('guest joined', { guestId: socket.id });
        socket.emit('joined room', { roomId: joinedRoomId });
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', { message: 'Unable to join room' });
      }
    });
    
    socket.on('chat message', async (data) => {
      let senderId, roomId, message;

      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        ({ senderId, roomId, message } = parsedData);
      } catch (error) {
        console.error('Error parsing chat message data:', error);
        socket.emit('error', { message: 'Invalid message format' });
        return;
      }

      console.log(`Received message: ${message} from ${senderId || socket.id} in room ${roomId}`);

      try {
        const room = await Room.findById(roomId);
        if (!room) {
          console.error(`Room ${roomId} does not exist.`);
          socket.emit('error', { message: 'Room does not exist' });
          return;
        }

        const chat = new Chat({
          sender: senderId || socket.id,
          room: roomId,
          message,
        });

        await chat.save();
        console.log('Message saved to database');


        io.to(roomId).emit('new message', {
          _id: chat._id,
          senderId: senderId || socket.id,
          roomId,
          message: chat.message,
          timestamp: chat.createdAt,
        });

        console.log('Message emitted to room participants');
      } catch (error) {
        console.error('Error saving chat:', error);
        socket.emit('error', { message: 'Failed to save message' });
      }
    });

    socket.on('disconnect', async () => {
      console.log('Guest disconnected:', socket.id);

 
      const userIndex = users.findIndex((user) => user.id === socket.id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        console.log(`Removed user ${socket.id}`);
        console.log(users, "connected users");
      }

      try {
        // Optionally remove the user from all rooms
        const rooms = await Room.find({ participants: socket.id });
        for (const room of rooms) {
          room.participants = room.participants.filter((id) => id !== socket.id);
          await room.save();
        }
      } catch (error) {
        console.error('Error updating rooms on disconnect:', error);
      }
    });
  });

  return io;
};

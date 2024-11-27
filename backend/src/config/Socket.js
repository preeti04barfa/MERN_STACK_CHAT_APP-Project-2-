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

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join room', async ({ userId, roomId }) => {
      try {
        let room;

        if (roomId) {

          room = await Room.findById(roomId);

          if (!room) {
            console.error(`Room with ID ${roomId} does not exist.`);
            socket.emit('error', { message: 'Room does not exist' });
            return;
          }

          if (!room.participants.includes(userId)) {
            room.participants.push(userId);
            await room.save();
          }
        } else {

          console.log("Creating a new room for user:", userId);
          room = new Room({ participants: [userId] });
          console.log(room,"data ready to insert");
          
          await room.save();
          console.log(`New room created with ID: ${room._id}`);
        }


        const joinedRoomId = room._id.toString();
        socket.join(joinedRoomId);

        console.log(`User ${userId} joined room ${joinedRoomId}`);
        io.to(joinedRoomId).emit('user joined', { userId });


        socket.emit('joined room', { roomId: joinedRoomId });
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', { message: 'Unable to join room' });
      }
    });



    socket.on('chat message', async (data) => {
      let senderId, receiverId, roomId, message;
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        ({ senderId, receiverId, roomId, message } = parsedData);
      } catch (error) {
        console.error('Error parsing chat message data:', error);
        return;
      }

      console.log(`Received message: ${message} from ${senderId} in room ${roomId}`);
      try {
        const room = await Room.findById(roomId);
        if (!room) {
          console.error(`Room ${roomId} does not exist.`);
          socket.emit('error', { message: 'Room does not exist' });
          return;
        }

        const chat = new Chat({
          sender: senderId,
          receiver: receiverId,
          room: roomId,
          message,
        });

        await chat.save();
        console.log('Message saved to database');

        io.to(roomId).emit('new message', {
          _id: chat._id,
          senderId,
          receiverId,
          roomId,
          message: chat.message,
          timestamp: chat.createdAt,
        });

        console.log('Message emitted to room participants');
      } catch (error) {
        console.error('Error saving chat:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

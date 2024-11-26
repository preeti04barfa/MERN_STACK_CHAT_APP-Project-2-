import { express, http, Server } from "./src/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(3002, () => {
    console.log('listening on:3002');
  });
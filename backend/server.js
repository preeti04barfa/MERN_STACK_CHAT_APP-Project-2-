import { setupSocket } from "./src/config/Socket.js";
import { ChatRouter, dbConnection, express, http, router, Server } from "./src/index.js";
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = setupSocket(server);
dbConnection();
app.use(express.json());
app.use('/api', router);
app.use('/api/chat', ChatRouter);


server.listen(3002, () => {
  console.log('Server listening on:3002');
});

export { io }
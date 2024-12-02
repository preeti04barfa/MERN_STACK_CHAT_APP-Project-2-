import { setupSocket } from "./src/config/Socket.js";
import { ChatRouter, dbConnection, dotenv, express, http, router, Server } from "./src/index.js";

import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = setupSocket(server);
dbConnection();
app.use(express.json());
app.use('/api', router);
app.use('/api/chat', ChatRouter);


server.listen(PORT, () => {
  console.log(`Server listening on:${PORT}`);
});

export { io }
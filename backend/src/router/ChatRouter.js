
import { express, getChatHistory } from '../index.js';
const ChatRouter = express.Router();

ChatRouter.get('/history/:roomId', getChatHistory);

export default ChatRouter;




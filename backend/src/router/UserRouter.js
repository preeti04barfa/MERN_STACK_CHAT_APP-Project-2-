
import { express, UserCreate, UserGet } from '../index.js';
const router = express.Router();

router.post('/user', UserCreate);
router.get('/all', UserGet);

export default router;


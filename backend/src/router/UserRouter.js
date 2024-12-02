

import { auth, express, getSingleUser, UserCreate, UserGet, userLogin } from '../index.js';
const router = express.Router();

router.post('/user', UserCreate);
router.get('/all', UserGet);
router.post('/user-login', userLogin);
router.get('/user-one',auth, getSingleUser);

export default router;


import {Router} from 'express';
import {signUp, signIn, signOut, checkAuth} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const userRouter = Router();

userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/sign-out',signOut);

userRouter.get("/check", protect, checkAuth);

export default userRouter;
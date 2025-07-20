import {Router} from 'express';
import {signUp, signIn, signOut, fetchAllUser} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/sign-out',signOut);

userRouter.get("/all", fetchAllUser);

export default userRouter;
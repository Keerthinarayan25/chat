import { Router } from 'express';
import { sendMessage, getMessage, getUsersForSidebar } from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const messageRouter = Router();

messageRouter.get("/users",protect, getUsersForSidebar);
messageRouter.get("/:id",protect, getMessage);
messageRouter.post("/send/:id",protect, sendMessage);

export default messageRouter;
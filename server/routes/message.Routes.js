import { Router } from 'express';
import { sendMessage, fetchMessage } from '../controllers/message.controller.js';


const messageRouter = Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/:chatId", fetchMessage);

export default messageRouter;
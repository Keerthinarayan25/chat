import {Router} from 'express';
import {accessChat, fetchChat} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/",accessChat);
chatRouter.get("/",fetchChat);



export default chatRouter;
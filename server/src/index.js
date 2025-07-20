import express from 'express';
import {PORT} from '../config/env.js';
import userRouter from '../routes/user.routes.js';
import messageRouter from '../routes/message.Routes.js';
import connectToDatabase from '../database/mongodb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser());


app.use("/api/auth", userRouter);
app.use("/api/message",messageRouter);

app.post('/', (req,res) => {
  res.send("Hello world");
})

app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();

});


export default app;
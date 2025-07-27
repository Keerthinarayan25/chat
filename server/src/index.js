import express from 'express';
import {PORT} from '../config/env.js';
import userRouter from '../routes/user.routes.js';
import messageRouter from '../routes/message.Routes.js';
import connectToDatabase from '../database/mongodb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { app, server } from "../utils/socket.js"
import path from "path";



dotenv.config();

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}))

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser());


app.use("/api/auth", userRouter);
app.use("/api/message",messageRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client", "dist", "index.html"));
  });
}

server.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();

});


export default app;
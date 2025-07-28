
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId,io } from "../utils/socket.js";


export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterdUsers = await User.find({
      _id: {$ne: loggedInUserId},
    }).select("-password");
    res.status(200).json(filterdUsers);
    
  } catch (error) {
    console.log("Error in Getting users for side bar controllers:",error.message);
    return res.status(500).json({message: "Internal server error"});
    
  }
};



export const sendMessage = async(req , res) => {
  
  const  {content}  = req.body;
  const {id: receiverId} = req.params;
  const senderId = req.user._id;
  if(!content || content.trim() === ""){

    return res.status(400).json({ error: "Content is required" });
  }
  try {

    const newMessage = await Message({
      senderId,
      receiverId,
      content,
    });
    
    await newMessage.save();
    // console.log(newMessage);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json(newMessage);

  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({
      error: err.message || "Message send failed",
      stack: err.stack,});
  }


};

export const getMessage = async(req,res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;
  if(!userToChatId){
    return res.status(400).send("Chat Id required");
  }

  try{
    const messages = await Message.find({
      $or: [
        {senderId: myId, receiverId:userToChatId},
        {senderId: userToChatId, receiverId: myId},
      ],
    });
    res.status(200).json(messages);
  } catch(error){
    console.log("Error in getMessages controller: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
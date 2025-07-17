
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";


export const sendMessage = async(req , res) => {
  
  const {senderId, content, chatId} = req.body;

  if(!senderId || !content || !chatId){
    return res.status(400).send("Missing fields");
  }

  try {

    let message = await Message.create({
      sender: senderId,
      content: content,
      chat: chatId
    });

    message = await message.populate("sender", "name email");
    message = await message.populate("chat");
    message = await message.populate({
      path: "chat.users",
      select:"name email",
    });

    await Chat.findByIdAndUpdate(chatId,{latestMessage: message._id});
    res.status(200).json(message);

  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({
      error: err.message || "Message send failed",
      stack: err.stack,});
  }


};

export const fetchMessage = async(req,res) => {
  const { chatId } = req.params;

  if(!chatId){
    return res.status(400).send("Chat Id required");
  }

  try{
    const message = await Message.find({chat: chatId})
    .populate("sender", "email")
    .populate("chat");

    res.status(200).json(message);
  } catch(error){
    res.status(500).json({error:"Failed to fetch messages",details:error});
  }
};
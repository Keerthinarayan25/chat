
import Message from "../models/message.model.js";
import User from "../models/user.model.js";



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
  
  const { content } = req.body;
  const {id: receiverId} = req.params;
  const senderId = req.user._id;


  try {

    let newMessage = await Message({
      senderId,
      receiverId,
      content,
    });
    
    await newMessage.save();
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
  if(!id){
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
    res.status(500).json({error:"Failed to fetch messages",details:error});
  }
};
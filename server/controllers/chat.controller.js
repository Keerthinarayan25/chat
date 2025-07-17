import Chat from "../models/chat.model.js";


export const  accessChat = async(req , res) =>{
  const {userId, currentUserId} = req.body;

  if(!userId || !currentUserId){
    return res.status(400).send("User ID not provided");
  }

  try{
    let chat = await Chat.findOne({
      isGroupChat:false,
      users:{$all:[userId, currentUserId]},
      
    }).populate("users","-password").populate("latestMessage");

    if(chat) return res.status(200).json({
      success:true,
      message:'Chat founded',
      chat
    });


    const newChat = await Chat.create({
      chatName:"sender",
      isGroupChat: false,
      users:[userId, currentUserId],
    });

    const fullChat = await Chat.findById(newChat._id).populate("users","-password");
    res.status(200).json({
      success:true,
      message:'Chat Created',
      fullChat
    });

  } catch(error){
    res.status(500).json({message:"Error accessing chat",error});
  }

};


export const fetchChat = async (req, res) =>{
  const {currentUserId} = req.body;

  if(!currentUserId){
    return res.status(400).send("User Id required");
  }

  try{
    const chats = await Chat.find({users: {$in: [currentUserId]}})
    .populate("users","-password").populate("latestMessage")
    .sort({updatedAt: -1});

    console.log("Fetched chats:",data);
    res.status(200).json(chats);
  } catch(error) {
    res.status(500).json({message:"Error fetching chats",error});
  }
};


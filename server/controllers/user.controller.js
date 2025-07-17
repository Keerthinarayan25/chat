import mongoose from "mongoose";
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signUp = async (req, res,next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {name, email,password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required"
    });
}
    const existingUser = await User.findOne({email});

    if(existingUser){
      throw new Error('user already exists');
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    const newUsers = await User.create([{
      name,
      email,
      password:hashedPassword
    }],{session});

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success:true,
      message:"user created successfully",
      data:{
        user:newUsers[0]
      }
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Incorrect input'});
  }
};



export const signIn = async (req,res,next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();

  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      throw new Error('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    
    if(!isPasswordValid){
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      success:true,
      message:'User signed in successfully',
      data:{
        user,
      }
    });

  }catch(error){
    next(error);

  }
}

export const signOut = async(req,res,next) => {
  try {
    res.status(200).json({
      success:true,
      message:'Sign out successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const fetchAllUser = async (req, res) => {
  try {
    const { currentUserId } = req.query;
    console.log("📥 currentUserId received:", currentUserId);

    if (!currentUserId) {
      return res.status(400).json({ message: "currentUserId is required" });
    }

    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");


    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};



import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  const {name, email,password} = req.body;
  
  try {

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required"});
    }

    if (password.length < 6){
      return res.status(400).json({message:"Password must be at least 6 characters"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      throw new Error('user already exists');
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    const newUsers = new User({
      name,
      email,
      password:hashedPassword
    });

    if(newUsers){
      generateToken(newUsers._id, res);
      await newUsers.save();

      res.status(200).json({
        _id: newUsers._id,
        name: newUsers.name,
        email: newUsers.email,
      });
    } else {
      return res.status(400).json({message:"Invalid user data"});
    } 

  } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({message:'Incorrect input'});
  }
};



export const signIn = async (req,res) =>{
  const {email,password} = req.body;
  try{

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message: "Invalid credentials"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    
    if(!isPasswordValid){
      return res.status(400).json({message: "Invalid credentials"});
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,

    });
  
  }catch(error){
    console.log("Error in login controller", error.message);
    return res.status(500).json({message:"Internal Server Error"});

  }
}

export const signOut = async(req,res) => {
  try {
    res.cookie("jwt","",{ maxAge:0});
    res.status(200).json({
      success:true,
      message:'Sign out successfully'
    });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
  try{
    res.status(200).json(req.user);
  } catch(error){
    console.log("Error in checkauth controller:",error.message);
    return res.status(500).json({message:"Internal server error"});
  }
}
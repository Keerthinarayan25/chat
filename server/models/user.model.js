import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'User name is required'],
    trim:true,
    minLegth:3,
    maxLength:15
  },
  email:{
    type:String,
    required:[true, 'user email is required'],
    trim:true,
    lowercase:true,
    match:[/\S+@\S+\.\S+/, 'Please fill a valid email address']
  },
  password:{
    type:String,
    required:[true, 'User password is required'],
    minLength:6
  },

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
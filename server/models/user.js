import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique: false,
    default: null,
  },
  fullname: {
    type:String,
    required:true,
  },
  matricNumber: {
    type:String,
    required:true,
  },
  level: {
    type:String,
    required:true,
  },
  college: {
    type:String,
    required:true,
  },
  department: {
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  userCreated:{
    type:Date,
    
  }
  
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);

export default User;

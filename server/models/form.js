import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
import User from './user.js';

const studentFormSchema = new Schema({
  username: {
    type: String, 
    required: true,
  },
  courseCode:{
    type:String,
  },
  longitude:{
    type:String,
    required:true,
  },
  latitude:{
    type:String,
    required:true,
  },
  uniqueCode:{
    type:String,
    required:true,
  },
  levels:{
    type:String,
  },
  department:{
    type:String,
  },
  formCreated:{
    type:Date,
    required:true,
  }, 
  ipAddress:{
    type:String,

  }
});

studentFormSchema.plugin(passportLocalMongoose);

const StudentForm = new mongoose.model("StudentForm",studentFormSchema);

export default StudentForm;

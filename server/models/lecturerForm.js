import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
import Lecturer from './lecturer.js';

const lecturerFormSchema = new Schema({
 lecturer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lecturer',
    required: true,
  },
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
  college:{
    type:String,
  },
  date:{
    type:Date,
    required:true,

  }
});

lecturerFormSchema.plugin(passportLocalMongoose);

const LecturerForm = new mongoose.model("LecturerForm",lecturerFormSchema);

export default LecturerForm;

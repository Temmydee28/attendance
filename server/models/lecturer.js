import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const lecturerSchema = new Schema({
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
  levels: {
    type:[String],
    default:[],
    required:true,
  },
  college: {
    type:String,
    required:true,
  },
  departments:{
    type:[String],
    default:[],
    required:true,
  },
  password: {
    type:String,
    required:true,
  },
  date:{
    type:Date,
    required:true,
  }
});

lecturerSchema.plugin(passportLocalMongoose);

const Lecturer = new mongoose.model("Lecturer",lecturerSchema);

export default Lecturer;

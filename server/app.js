import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userController from './controllers/user.js';
import formController from './controllers/form.js';
import tableController from './controllers/table.js';
import customPassport from './config/passportconfig.js';
import session from 'express-session';
import jwt from 'jsonwebtoken';

const app = express();

const PORT = 8001;
const myConnectionUrl = process.env.MONGODB_CONNECT_URL;

mongoose.connect(myConnectionUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });


  const corsOptions = {
    origin: 'https://attendance-app-eight.vercel.app',
    credentials: true, // This allows credentials (cookies) to be sent with the request
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

const verifyTokenn = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.lecturer = decoded.lecturer;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

app.post("/", cors(),  userController.login);
app.post("/signup", cors(), userController.signup);
app.post("/LSignup", cors(), userController.LSignup);
app.post("/LSignin", cors(), userController.LSignin);
app.get("/users", cors(), verifyToken, userController.users);
app.get("/srecord", cors(), verifyToken, tableController.Srecord);
 app.get("/lrecord", cors(), verifyTokenn, tableController.Lrecord);
app.get("/lecturers", cors(), verifyTokenn, userController.lecturer);
app.post("/submitattendance", cors(), formController.studentForm);
app.post("/createattendance", cors(), formController.lecturerForm);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

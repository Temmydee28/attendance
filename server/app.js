import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userController from './controllers/user.js';
import formController from './controllers/form.js';
import tableController from './controllers/table.js';
import session from 'express-session';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 8001;
const myConnectionUrl = process.env.MONGODB_CONNECT_URL;

mongoose.connect(myConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });

const corsOptions = {
  origin: 'https://attendance-app-eight.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Manually setting CORS headers as a fallback
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://attendance-app-eight.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

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

app.post("/", userController.login);
app.post("/signup", userController.signup);
app.post("/LSignup", userController.LSignup);
app.post("/LSignin", userController.LSignin);
app.get("/users", verifyToken, userController.users);
app.get("/srecord", verifyToken, tableController.Srecord);
app.get("/lrecord", verifyTokenn, tableController.Lrecord);
app.get("/lecturers", verifyTokenn, userController.lecturer);
app.post("/submitattendance", formController.studentForm);
app.post("/createattendance", formController.lecturerForm);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

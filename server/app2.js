import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const app = express();
const PORT = 8001;
const SECRET_KEY = process.env.SESSION_SECRET; // Replace with a strong, secret key

app.use(cors());
app.use(bodyParser.json());
const myConnectionUrl = process.env.MONGODB_CONNECT_URL;

mongoose.connect(myConnectionUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    fullname: String,
    matricNumber: String,
    level: String,
    college: String,
    department: String,
    password: String
  });
  
const User = mongoose.model('User', userSchema);

// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

app.post('/signup', async (req, res) => {
  try {
    const receivedData = req.body;
    const { fullname, username, matricNo, level, college, department, password } = receivedData;
  
    const newUser = new User({
        username: username,
        fullname: fullname,
        matricNumber: matricNo,
        level: level,
        college: college,
        department: department,
        password: password     
      });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/', async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username: username }); // Use findOne instead of find
  
      if (user) {
        // Generate a JWT upon successful signin
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
        console.log('Generated Token:', token);
  
        // Log decoded user information
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Decoded User:', decoded.user);
  
        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Protected route to fetch user data
app.get('/users', verifyToken, async (req, res) => {
    try {
      console.log('User ID from token:', req.user._id);
  
      const user = await User.findById(req.user._id);
      
      console.log('User ID from MongoDB document:', user ? user._id : 'Not found');
  
      if (user) {
        res.status(200).json({
          username: user.username,
          matricNumber: user.matricNumber,
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

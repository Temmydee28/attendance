import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Lecturer from '../models/lecturer.js';
import LecturerForm from '../models/lecturerForm.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const saltRounds = 10;

const userController = {


  login: async (req, res) => {
    const receivedData = req.body;
    const { username, password } = receivedData;

    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return res.status(400).json({ status: 'failure', message: 'User does not exist or credentials are incorrect' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ status: 'failure', message: 'User does not exist or credentials are incorrect' });
      }

      // Save user details in the session
      if (user) {
        // Generate a JWT upon successful signin
        const token = jwt.sign({ user }, process.env.SESSION_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);

        // Log decoded user information
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        console.log('Decoded User:', decoded.user);

        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
      // Send a success response




    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: 'An error occurred during login' });
    }
  },


  LSignin: async (req, res) => {
    const receivedData = req.body;
    const { username, password } = receivedData;

    try {
      const lecturer = await Lecturer.findOne({ username: username });

      if (!lecturer) {
        return res.status(400).json({ status: 'failure', message: 'lecturer does not exist or credentials are incorrect' });
      }

      const passwordMatch = await bcrypt.compare(password, lecturer.password);

      if (!passwordMatch) {
        return res.status(400).json({ status: 'failure', message: 'lecturer does not exist or credentials are incorrect' });
      }

      // Save lecturer details in the session
      if (lecturer) {
        // Generate a JWT upon successful signin
        const token = jwt.sign({ lecturer }, process.env.SESSION_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);

        // Log decoded user information
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        console.log('Decoded User:', decoded.lecturer);

        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
      // Send a success response




    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: 'An error occurred during login' });
    }
  },

  users: async (req, res) => {
    try {
      console.log('User ID from token:', req.user._id);

      const user = await User.findById(req.user._id);

      console.log('User ID from MongoDB document:', user ? user._id : 'Not found');

      if (user) {
        res.status(200).json({
          _id:user._id,
          username: user.username,
          fullname: user.fullname,
          matricNumber: user.matricNumber,
          college: user.college,
          department: user.department,
          level: user.level,
        });
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: "internal server error" })
    }

  },


  lecturer: async (req, res) => {
    try {
      console.log('lecturer ID from token:', req.lecturer._id);

      const lecturer = await Lecturer.findById(req.lecturer._id);

      console.log('lecturer ID from MongoDB document:', lecturer ? lecturer._id : 'Not found');

      if (lecturer) {
        res.status(200).json({
          _id:lecturer._id,
          username: lecturer.username,
          fullname: lecturer.fullname,
          college: lecturer.college,
          departments: lecturer.departments,
          levels: lecturer.levels,
        });
      } else {
        res.status(404).json({ message: 'Lecturer not found' })
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: "internal server error" })
    }

  },

  // Lrecords: async (req, res) => {
  //   try {
  //     console.log('Lecturer ID from token:', req.lecturer._id);

  //     const lecturerForm = await User.findById(req.lecturer._id);

  //     console.log('User ID from MongoDB document:', lecturerForm ? lecturerForm._id : 'Not found');

  //     if (lecturerForm) {
  //       res.status(200).json({
  //         username: lecturerForm.username,
  //         courseCode:lecturerForm.courseCode,
  //         college: lecturerForm.college,
  //         department: lecturerForm.department,
  //         level: lecturerForm.level,

  //       });
  //     } else {
  //       res.status(404).json({ message: 'Lecturer Form not found' })
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     res.status(500).json({ message: "internal server error" })
  //   }

  // },
  
  // Lrecord: async (req, res) => {
  //   try {
  //     console.log('lecturer ID from token:',req.lecturer._id);

  //     const lecturer = await Lecturer.findById(req.lecturer._id);

  //     const lecturerForm = await LecturerForm.find({ lecturer: lecturer._id}).exec();

  //     console.log('User ID from MongoDB document:', lecturerForm ? lecturerForm._id : 'Not found');

  //     if (lecturerForm) {
  //       res.status(200).json({
  //           id:lecturerForm._id,
  //           lecturer:lecturerForm.lecturer,
  //           username: lecturerForm.username,
  //           courseCode: lecturerForm.courseCode,
  //           college:lecturerForm.college,
  //           levels: lecturerForm.levels,
  //           department: lecturerForm.department,
  //           longitude: lecturerForm.longitude,
  //           latitude: lecturerForm.latitude,
  //           uniqueCode:lecturerForm.uniqueCode,
  //           date:lecturerForm.date
          
  //       });
  //     } else {
  //       res.status(404).json({ message: 'Lecturer not found' })
  //     }
  //   } catch (error) {
  //     console.error('Error fetching lecturer form data:', error);
  //     res.status(500).json({ message: "internal server error" })
  //   }

  // },

  // Lrecord: async (req, res) => {
  //   try {
  //     console.log('lecturer ID from token:', req.lecturer._id);

  //     const lecturer = await Lecturer.findById(req.lecturer._id);

  //     const lecturerForms = await LecturerForm.find({ lecturer: lecturer._id }).exec();

  //     if (lecturerForms && lecturerForms.length > 0) {
  //       const lecturerForm = lecturerForms[0]; // Assuming you need the first form, or handle accordingly

  //       console.log('User ID from MongoDB document:', lecturerForm._id);

  //       res.status(200).json({
  //         id: lecturerForm._id,
  //         lecturer: lecturerForm.lecturer,
  //         username: lecturerForm.username,
  //         courseCode: lecturerForm.courseCode,
  //         college: lecturerForm.college,
  //         levels: lecturerForm.levels,
  //         department: lecturerForm.department,
  //         longitude: lecturerForm.longitude,
  //         latitude: lecturerForm.latitude,
  //         uniqueCode: lecturerForm.uniqueCode,
  //         date: lecturerForm.date,
  //       });
  //     } else {
  //       res.status(404).json({ message: 'Lecturer form not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching lecturer form data:', error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },


  signup: async (req, res) => {
    const receivedData = req.body;
    const { fullname, username, matricNo, level, college, department, password, userCreated } = receivedData;
console.log(receivedData)
    try {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists', details: 'Username is taken' });
      }

      // Use a Promise to handle the asynchronous bcrypt.hash operation
      const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });
      };

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create a new user with the hashed password
      const newUser = new User({
        username: username,
        fullname: fullname,
        matricNumber: matricNo,
        level: level,
        college: college,
        department: department,
        password: hashedPassword,
        userCreated:userCreated
      });

      // Save the new user
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },



  LSignup: async (req, res) => {

    const receivedData = req.body;
    const { fullname, username, levels, college, departments, password,date } = receivedData;
    console.log(receivedData);
    try {
      const existingLecturer = await Lecturer.findOne({ username: username });
      if (existingLecturer) {
        return res.status(400).json({ error: 'Lecturer already exists', details: 'Username is taken' });
      }

      // Use a Promise to handle the asynchronous bcrypt.hash operation
      const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });
      };

      // Hash the password
      const hashedPassword = await hashPassword(password);
      // Create a new user with the hashed password

      const newLecturer = new Lecturer({
        username: username,
        fullname: fullname,
        levels: levels,
        college: college,
        departments: departments,
        password: hashedPassword,
       date:date
      });

      // Save the new user
      await newLecturer.save();

      res.status(201).json({ message: 'Lecturer registered successfully' });
    } catch (error) {
      console.error('Error registering Lecturer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  // users: async (req, res) => {
  //   if (req.session.user) {
  //     res.status(200).json({ user: req.session.user });
  //   } else {
  //     res.status(401).json({ message: 'Unauthorized' });
  //   }
  // }
};

export default userController;

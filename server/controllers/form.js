// import bcrypt from 'bcrypt';
// import StudentForm from '../models/form.js';
// import LecturerForm from '../models/lecturerForm.js';
// import User from '../models/user.js';
// import Lecturer from '../models/lecturer.js';
// import jwt from 'jsonwebtoken';
// import 'dotenv/config';

// const formController = {

//   studentForm: async (req, res) => {

//     const receivedData = req.body;
//     const { uniqueCode, courseCode, longitude, latitude } = receivedData;

//     try {
//       const users = await User.find();
//       for (const user of users) {
//         const existingForm = await StudentForm.findOne({ $and: [{ user: user._id }, { uniqueCode: uniqueCode }, { courseCode: courseCode }] });

//         if (existingForm) {
//           return res.status(400).json({ error: 'Attendance already exists', details: 'Attendance is taken' });
//         }


//         const newForm = new StudentForm({
//           user: user._id,
//           courseCode: courseCode,
//           longitude: longitude,
//           latitude: latitude,
//           uniqueCode: uniqueCode,
//         });

//         // Save the new form
//         await newForm.save();
//       }

//         res.status(201).json({ message: 'Form submitted successfully' });

//     } catch (error) {
//       console.error('Error submitting form:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   lecturerForm: async (req, res) => {
//     const receivedData = req.body;
//     const { uniqueCode, courseCode, longitude, latitude } = receivedData;
//     console.log(receivedData);

//     try {
//       const lecturers = await Lecturer.find();

//       for (const lecturer of lecturers) {
//         const existingAttendance = await LecturerForm.findOne({
//           $and: [{ uniqueCode: uniqueCode }, { courseCode: courseCode }],
//         }).exec();

//         if (existingAttendance) {
//           return res.status(400).json({
//             error:
//               'Attendance already created, change the unique code to create new attendance',
//             details: 'Attendance is taken',
//           });
//         }

//         const newForm = new LecturerForm({
//           lecturer: lecturer._id,
//           courseCode: courseCode,
//           longitude: longitude,
//           latitude: latitude,
//           uniqueCode: uniqueCode,
//         });

//         // Save the new form
//         await newForm.save();
//       }

//       // Send the response outside the loop
//       res.status(201).json({ message: 'Form submitted successfully' });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

// };


// export default formController;



import StudentForm from '../models/form.js';
import LecturerForm from '../models/lecturerForm.js';
import User from '../models/user.js';
import Lecturer from '../models/lecturer.js';
import ip from 'ip';

const myIp = ip.address();

const formController = {
  // studentForm: async (req, res) => {
  //   const receivedData = req.body;
  //   const { uniqueCode, courseCode, longitude, latitude, username } = receivedData;

  //   try {


  //     const existingForm = await StudentForm.findOne({ $and: [{ username: username }, { uniqueCode: uniqueCode }, { courseCode: courseCode }] }).exec();

  //     const checkAttendance = await LecturerForm.findOne({ $and: [{ uniqueCode: uniqueCode }, { courseCode: courseCode }, { latitude: latitude }, { longitude: longitude }] }).exec();

  //     if(existingForm){
  //       return res
  //       .status(400)
  //       .json({ error: 'duplicate form', details: 'Attendance is taken' });
  //   }
  //  else if (existingForm && checkAttendance) {
  //     if (existingForm.latitude && checkAttendance.latitude) {
  //         if (existingForm.longitude && checkAttendance.longitude) {
  //          if (existingForm.uniqueCode && checkAttendance.uniqueCode) {
  //          if (existingForm.courseCode && checkAttendance.courseCode){

  //               const newForm = new StudentForm({
  //                 username: username,
  //                 courseCode: courseCode,
  //                 longitude: longitude,
  //                 latitude: latitude,
  //                 uniqueCode: uniqueCode,
  //               });

  //               await newForm.save();
  //             }
  //             else {
  //               return res
  //                 .status(400)
  //                 .json({ error: 'Incorrect Course code', details: 'Incorrect Course code' });
  //             }
  //           }
  //           else {
  //             return res
  //               .status(400)
  //               .json({ error: 'Incorrect Unique code', details: 'Incorrect Unique code' });
  //           }
  //         }
  //         else {
  //           return res
  //             .status(400)
  //             .json({ error: 'You are not in class', details: 'Attendance is taken' });
  //         }
  //       }
  //       else {
  //         return res
  //           .status(400)
  //           .json({ error: 'You are not in class', details: 'Attendance is taken' });
  //       }
  //     }
  //       else {
  //         return res
  //           .status(400)
  //           .json({ error: 'checking .....', details: 'Attendance is taken' });
  //       }
  //     res.status(201).json({ message: 'Form submitted successfully' });
  //   } catch (error) {
  //     console.error('Error submitting student form:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // },

  // studentForm: async (req, res) => {
  //   const receivedData = req.body;
  //   const { uniqueCode, courseCode, longitude, latitude, username } = receivedData;
  
  //   try {
  //     // Check if the student has already submitted the form
  //     const existingForm = await StudentForm.findOne({ username: username, uniqueCode: uniqueCode, courseCode: courseCode });
  
  //     if (existingForm) {
  //       return res.status(400).json({ error: 'Duplicate form', details: 'Attendance already taken' });
  //     }
  
  //     // Check if the student's geolocation matches the lecturer's session
  //     const checkAttendance = await LecturerForm.findOne({ uniqueCode: uniqueCode, courseCode: courseCode, latitude: latitude, longitude: longitude });
  
  //     if (!checkAttendance) {
  //       return res.status(400).json({ error: 'You are not in class', details: 'Attendance not allowed' });
  //     }
  
  //     // Create and save the new student form
  //     const newForm = new StudentForm({
  //       username: username,
  //       courseCode: courseCode,
  //       longitude: longitude,
  //       latitude: latitude,
  //       uniqueCode: uniqueCode,
  //     });
  
  //     await newForm.save();
  
  //     res.status(201).json({ message: 'Form submitted successfully' });
  //   } catch (error) {
  //     console.error('Error submitting student form:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // },
  
  studentForm: async (req, res) => {
    const receivedData = req.body;
    const {username, uniqueCode, courseCode, longitude, latitude, levels, department,date } = receivedData;
  
    try {
      // Check if a lecturer form with matching parameters exists
      // const existingForm = await LecturerForm.findOne({
      //   uniqueCode: uniqueCode,
      //   courseCode: courseCode,
      //   longitude: longitude,
      //   latitude: latitude,
      //   levels: level // Check if the level is included in lecturer's levels
      // });

  


const existingForm = await LecturerForm.findOne({ $and: [{uniqueCode: uniqueCode }, { courseCode: courseCode }, { latitude: latitude }, { longitude: longitude }] })
  .select('uniqueCode, courseCode, latitude, longitude')
  .exec();

  const attendanceForm = await StudentForm.findOne({ $and: [{ipAddress: myIp } , {username: username}, {uniqueCode: uniqueCode }, { courseCode: courseCode }, { latitude: latitude }, { longitude: longitude }] })
  .select('username, uniqueCode, courseCode, latitude, longitude,ipAddress')
  .exec();
     if (attendanceForm) {
         return res.status(400).json({ error: 'Duplicate form', details: 'Attendance already taken' });
       }
      // If no matching lecturer form is found, return an error
      else if (!existingForm) {
        return res.status(400).json({ error: 'Invalid form', details: 'No matching form found' });
      }
  
      // Create a new student form and save it
      const newForm = new StudentForm({
        username:username,
        courseCode: courseCode,
        longitude: longitude,
        latitude: latitude,
        uniqueCode: uniqueCode,
        levels: levels,
        department:department,
        formCreated:date,
        ipAddress:myIp
      });
      await newForm.save();
  
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting student form:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },  

  lecturerForm: async (req, res) => {
    const receivedData = req.body;
    const { _id, uniqueCode, courseCode, longitude, latitude, username, levels,departments,college, date } = receivedData;

    try {
      // Check if a form already exists
      const existingAttendance = await LecturerForm.findOne({ $and: [{ username: username }, { uniqueCode: uniqueCode }, { courseCode: courseCode }], }).exec();

      if (existingAttendance) {
        return res.status(400).json({
          error: 'Duplicate form',
          details: 'Attendance is taken',
        });
      }

      // Create a new form
      const newForm = new LecturerForm({
        lecturer:_id,
        username: username,
        courseCode: courseCode,
        college:college,
        levels: levels,
        department:departments,
        longitude: longitude,
        latitude: latitude,
        uniqueCode: uniqueCode,
        date:date,
        
      });

      // Save the new form
      await newForm.save();

      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting lecturer form:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


};

export default formController;

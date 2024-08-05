// import bcrypt from 'bcrypt';
// import StudentForm from '../models/form.js';
// import LecturerForm from '../models/lecturerForm.js';
// import jwt from 'jsonwebtoken';
// import 'dotenv/config';




// const formController = {

//     studentForm:  async (req, res) => {
//         const receivedData = req.body;
//         const { fullname, matricNumber, level, college, department, courseCode,longitude,latitude } = receivedData;
      
//         try {
//             const existingForm = await StudentForm.findOne({ matricNumber: matricNumber });
        
//             if (existingForm) {
//               return res.status(400).json({ error: 'Attendance already exists', details: 'Attendance is taken' });
//             }
        
//             const newForm = new StudentForm({
//               fullname: fullname,
//               matricNumber: matricNumber,
//               level: level,
//               college: college,
//               department: department,
//               courseCode: courseCode,
//               longitude: longitude,
//               latitude: latitude,
//             });
        
//             // Save the new form
//             await newForm.save();
        
//             res.status(201).json({ message: 'Form submitted successfully' });
//           } catch (error) {
//             console.error('Error submitting form:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//           }
//         },

//         lecturerForm:  async (req, res) => {
//           const receivedData = req.body;
//           const { fullname, uniqueCode, level, college, department, courseCode,longitude,latitude } = receivedData;
        
//           try {
//               const existingAttendance = await LecturerForm.findOne({ uniqueCode: uniqueCode });
          
//               if (existingAttendance) {
//                 return res.status(400).json({ error: 'Attendance already created, change the unique code to create new attendance', details: 'Attendance is taken' });
//               }
              
          
//               const newForm = new StudentForm({
//                 fullname: fullname,
              
//                 level: level,
//                 college: college,
//                 department: department,
//                 courseCode: courseCode,
//                 longitude: longitude,
//                 latitude: latitude,
//               });
          
//               // Save the new form
//               await newForm.save();
          
//               res.status(201).json({ message: 'Form submitted successfully' });
//             } catch (error) {
//               console.error('Error submitting form:', error);
//               res.status(500).json({ error: 'Internal Server Error' });
//             }
//           }
// }


// export default formController;
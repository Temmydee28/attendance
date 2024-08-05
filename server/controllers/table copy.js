import StudentForm from '../models/form.js';
import LecturerForm from '../models/lecturerForm.js';
import User from '../models/user.js';
import Lecturer from '../models/lecturer.js';



const tableController  = {

    Lrecord: async (req, res) => {
        try {
          console.log('lecturer ID from token:', req.lecturer._id);
          const lecturer = await Lecturer.findById(req.lecturer._id);

          const lecturerForms = await LecturerForm.find({lecturer:lecturer._id}).exec();

          if (lecturerForms && lecturerForms.length > 0) {
            // Map through the forms and structure the response data
            const response = lecturerForms.map(form => ({
                id: form._id,
                lecturer: form.lecturer,
                username: form.username,
                courseCode: form.courseCode,
                college: form.college,
                levels: form.levels,
                department: form.department,
                longitude: form.longitude,
                latitude: form.latitude,
                uniqueCode: form.uniqueCode,
                date: form.date
            }));

            res.status(200).json(response);
          } else {
            res.status(404).json({ message: 'Lecturer forms not found' });
        }
    } catch (error) {
        console.error('Error fetching lecturer form data:', error);
        res.status(500).json({ message: "internal server error" });
    }
    
      },

      Srecord: async (req,res) =>  {
        try{
          console.log('Student ID from Token:', req.user._id);
          const student = await User.findById(req.user._id);

          const studentForms = await StudentForm.find({username:student.username}).exec();

          if (studentForms && studentForms.length > 0) {
            // Map through the forms and structure the response data
            const response = studentForms.map(form => ({
                id: form._id,
                username: form.username,
                courseCode: form.courseCode,
                longitude: form.longitude,
                latitude: form.latitude,
                uniqueCode: form.uniqueCode,
                levels: form.levels,
                formCreated: form.date
            }));

            res.status(200).json(response);
          } else {
            res.status(404).json({ message: 'Student forms not found' });
        }
    } catch (error) {
        console.error('Error fetching Student form data:', error);
        res.status(500).json({ message: "internal server error" });
    }
    }
    
}
export default tableController;
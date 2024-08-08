import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import axios from "axios";
import Input from "./Input";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//import 'react-toastify/dist/ReactToastify.css';

//import Get from './Get';


const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });


  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// toast('This is a default alert message', {
//   position: “top-right”,
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   });



function LecturerForm() {
// const min = 1;
// const max = 1000;
// const random = Math.floor(Math.random() * (max -min + 1))+min;
//   const day = new Date().getDay();

// const uniqueNumber = `AUO${random}${day}Z`;


  const history = useNavigate();
  const [attendanceData, setAttendanceData] = useState({
    _id:"",
    fullname: "",  
    username:"",
    levels: "",
    departments: "",
    college: "",
    longitude: "",
    latitude: "",
    courseCode: "",
    uniqueCode:"",
  });


 
const created = new Date();

const [locationFetched, setLocationFetched] = useState(false);

useEffect(() => {
  if (!locationFetched && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const latitude = position.coords.latitude.toFixed(8);
              const longitude = position.coords.longitude.toFixed(8);

              setAttendanceData(prevValues => ({
                  ...prevValues,
                  latitude: latitude,
                  longitude: longitude
              }));
              setLocationFetched(true); // Set the flag to true after fetching location

              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          },
          (error) => {
              console.error(`Error: ${error.message}`);
          }
      );
  } else if (!("geolocation" in navigator)) {
      console.log("Geolocation is not available in this browser");
  }
}, [locationFetched]);



// if ("geolocation" in navigator) {
//   const successCallback = function (position) {
//       const latitude = position.coords.latitude.toFixed(4);
//       const longitude = position.coords.longitude.toFixed(4);

//       setAttendanceData(prevValues => ({
//           ...prevValues,
//           latitude: latitude,
//           longitude: longitude
//       }));

     

//       // Remove the event listener to stop continuous updates
//       navigator.geolocation.clearWatch(watchID);
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//   };

//   const errorCallback = function (error) {
//       console.error(`Error: ${error.message}`);
//   };

//   // Start watching for the user's position
//   const watchID = navigator.geolocation.watchPosition(successCallback, errorCallback);
// } else {
//   console.log("Geolocation is not available in this browser");
// }



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://attendance-rose.vercel.app/lecturers', {
          headers: {
            Authorization: token,
          }
        });

        setAttendanceData({
          _id:response.data._id || "",
          fullname: response.data.fullname || "",
          username:response.data.username || "",
          levels: "",
          departments:"",
          college: "",
          longitude: "",
          latitude: "",
          courseCode: "",
          uniqueCode: "",
          date:created

        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      
      }
    };
    fetchUserData();
  }, []);

  const updateDepartments = () => {
    // Use a mapping of colleges to departments
    const collegeDepartments = {
      CONAS: ["Computer Science", "Biochemistry", "Microbiology", "Industrial Chemistry", "Geology", "Plant Science", "Chemistry", "Zoology", "Biology", "Physics"],
      FONS: ["Nursing Science"],
      FOHS: ["Public Health", "Human Physiology", "Medical Laborartory science", "Human Anatomy"],
      COLAW: ["Private and Business Law", "Public and International law"],
      COET: ["Mechanical", "Biomedical", "Mechatronic", "Electrical and Electronics", "Computer Engineering", "Telecommunication", "Civil and Environmental", ""],

      COSMAS: ["Political Science", "Accounting", "Banking and Finance", "Business Admin", "Marketing", "Economics", "Geography and Planning", "Mass Communication", "International Relations", "Public Admin", "Sociology", "Criminology"],
      // Add mappings for other colleges
    };


    const selectedCollege = attendanceData.college;
    const departments = collegeDepartments[selectedCollege] || [];

    setAttendanceData((prevValue) => ({
      ...prevValue,
      departments: "", // Reset department when college changes
    }));

    // Update the department options
    const departmentSelect = document.getElementById('department');
    departmentSelect.innerHTML = ""; // Clear existing options

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.text = "Select Department";
    departmentSelect.appendChild(defaultOption);

    departments.forEach((department) => {
      const option = document.createElement("option");
      option.value = department;
      option.text = department;
      departmentSelect.appendChild(option);
      console.log(option);
    });
  };




  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleChange = (event) => {
    const { name, value } = event.target;



    setAttendanceData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));


  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://attendance-rose.vercel.app/createattendance", { ...attendanceData });

      if (response.status === 201) {
       alert( <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success" >Attendance Submitted</Alert>
        </Stack>)

        history("/lecturer/createattendance");
      } else {
        console.error("Unexpected response:", response.data);
        alert('Error occurred. Please check console for details.');
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert("error submitting, try again")
        alert(error.response.data.error);
      } else if (error.request) {
        console.error("No response received from the server");
        alert('No response received from the server');
      } else {
        console.error("Error setting up the request:", error.message);
        alert('Error setting up the request');
      }
    }
  }



  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >

        <form action="POST" className="form-container">
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="spring-modal-title" variant="h6" component="h2">

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={20}>
                    <Grid item xs={3}>

                      <Input
                        width="12ch"
                        readonly='true'
                        id="standard-basic"
                        label="Fullname"
                        type="text"
                        name="fullname"
                        value={attendanceData.fullname}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={3}>

<Input
  width="12ch"
  readonly='true'
  id="standard-basic"
  label="Username"
  type="text"
  name="username"
  value={attendanceData.username}
  onChange={handleChange}
/>
</Grid>
</Grid>
 <Grid container spacing={20}>
                    <Grid item xs={3}>

                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="Unique Code" //Auto query
                        type="text"
                        name="uniqueCode"
                        value={attendanceData.uniqueCode}
                        onChange={handleChange}
                      />
                    </Grid>
                  
                 
                    <Grid item xs={1}>
      
<FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
        <Select
          labelid="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={attendanceData.levels}         
          onChange={handleChange}
          label="Level"
          name="levels"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={100}>100 Level</MenuItem>
          <MenuItem value={200}>200 Level</MenuItem>
          <MenuItem value={300}>300 Level</MenuItem>
          <MenuItem value={400}>400 Level</MenuItem>
          <MenuItem value={500}>500 Level</MenuItem>
        </Select>
      </FormControl> 




                    </Grid>
             
                  </Grid>
                  <Grid container spacing={20}>
                    <Grid item xs={1}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">College</InputLabel>
          <Select
            labelid="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={attendanceData.college}
            onChange={(e) => {
              handleChange(e);
              updateDepartments();
            }}
            onBlur={updateDepartments}
            label="College"
            name="college"
          >
          
            <MenuItem value={attendanceData.college}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="CONAS">CONAS</MenuItem>
            <MenuItem value="FOHS">FOHS</MenuItem>
            <MenuItem value="FONS">FONS</MenuItem>
            <MenuItem value="COLAW">COLAW</MenuItem>
            <MenuItem value="COET">COET</MenuItem>
            <MenuItem value="COSMAS">COSMAS</MenuItem>
          </Select>
        </FormControl>


                    </Grid>
                    <Grid item xs={5}>
                    
                    <label htmlFor="demo-simple-select-standard-label">Department</label>
                    <select
                      labelid="demo-simple-select-standard-label"
                      id="department"
                      value={attendanceData.departments}
                      onChange={handleChange}
                      label="Department"
                      name="departments"
                    >
                      {/* Department options will be dynamically populated based on the selected college */}
                    </select>
                              
                                </Grid>
                                <Grid item xs={5}>
                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="CourseCode"  //autoquery
                        type="text"
                        name="courseCode"
                        value={attendanceData.courseCode}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={5}>

                      <Input
                        //hidden={true}
                        width="12ch"
                        readonly="true"
                        id="longitude"
                        //autoquery
                        type="text"
                        name="longitude"
                        value={attendanceData.longitude}
                        onChange={handleChange}

                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={20}>
                    <Grid item xs={1}>
                      <Input
                        width="12ch"
                        //hidden={true}

                        readonly="true"
                        id="latitude"
                        //autoquery
                        type="text"
                        name="latitude"
                        value={attendanceData.latitude}
                        onChange={handleChange}
                      />
                    </Grid>
                   
                  </Grid>
                </Box>
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                <button type='submit' onClick={submit}>Submit</button>
              </Typography>
            </Box>
          </Fade>
        </form>
      </Modal>

    </div>
  );
}

export default LecturerForm;

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



function StudentForm() {

  const history = useNavigate();
  const [attendanceData, setAttendanceData] = useState({
    _id:"",
    fullname: "",
    username:"",
    matricNumber: "",  // 
    level: "",
    department: "",
    college: "",
    longitude: "",
    latitude: "",
    courseCode: "",
    uniqueCode:"",
    date:"",
    ipaddress:"",
  });
  const created = new Date();
  
//   if ("geolocation" in navigator) {
//     const successCallback = function (position) {
//         const latitude = position.coords.latitude.toFixed(4);
//         const longitude = position.coords.longitude.toFixed(4);

//         setAttendanceData(prevValues => ({
//             ...prevValues,
//             latitude: latitude,
//             longitude: longitude
//         }));

//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//         // Remove the event listener to stop continuous updates
//         navigator.geolocation.clearWatch(watchID);
//     };

//     const errorCallback = function (error) {
//         console.error(`Error: ${error.message}`);
//     };

//     // Start watching for the user's position
//     const watchID = navigator.geolocation.watchPosition(successCallback, errorCallback);
// } else {
//     console.log("Geolocation is not available in this browser");
// }

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







  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8001/users', {
          headers: {
            Authorization: token,
          }
        });

        setAttendanceData({
          _id:response.data._id || "",
          fullname: response.data.fullname || "",
          username:response.data.username || "",
          matricNumber: response.data.matricNumber || "",
          level: response.data.level || "",
          department: response.data.department || "",
          college: response.data.college || "",
          longitude: "",
          latitude: "",
          courseCode: "",
          uniqueCode:"",
          date:created,
       

        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      
      }
    };
    fetchUserData();
  }, []);




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
      const response = await axios.post("http://localhost:8001/submitattendance", { ...attendanceData });

      if (response.status === 201) {
       alert( <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success" >Attendance Submitted</Alert>
        </Stack>)

        history("/submitattendance");
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
                        label="Matric Number" //Auto query
                        type="text"
                        name="matricNo"
                        value={attendanceData.matricNumber}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={20}>
                    <Grid item xs={1}>
                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="Level"  //autoquery
                        type="text"
                        name="level"
                        value={attendanceData.level}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="Department"  //autoquery
                        type="text"
                        name="department"
                        value={attendanceData.department}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={20}>
                    <Grid item xs={1}>
                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="College"  //autoquery
                        type="text"
                        name="college"
                        value={attendanceData.college}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={5}>

                      <Input
                        //  hidden="true"
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
                        // hidden="true"
                        readonly="true"
                        id="latitude"
                        //autoquery
                        type="text"
                        name="latitude"
                        value={attendanceData.latitude}
                        onChange={handleChange}
                      />
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
                    </Grid>
                    <Grid container spacing={20}>
                    <Grid item xs={5}>
                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="uniqueCode"  //autoquery
                        type="text"
                        name="uniqueCode"
                        value={attendanceData.uniqueCode}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Input
                        width="12ch"
                        id="standard-basic"
                        label="ipAddress"  //autoquery
                        type="text"
                        name="ipaddress"
                        value={attendanceData.ipaddress}
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

export default StudentForm;
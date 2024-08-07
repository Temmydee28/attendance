import * as React from "react";
import { useState } from "react"
import Input from "./Input";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ListItem, Checkbox, ListItemText } from '@mui/material';
import { FormGroup, FormControlLabel } from "@mui/material";
// import Checkbox from '@mui/material/Checkbox';


function LSignUp() {

  const history = useNavigate();
  const [signUpData, setSignUpData] = useState({
    fullname:"",
    username:"",
    password:"",
    levels:[],
    departments:[],
    college: "",
    date:""
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

if (type === "checkbox") {
  setSignUpData((prevData) => ({
    ...prevData,
    [name]: checked
      ? [...prevData[name], value] 
      : prevData[name].filter((item) => item !== value),
  }));
} else {
  setSignUpData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}
};



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


  const created = new Date();
  const handleCollegeChange = (event) => {
    setSignUpData((prevData) => ({
      ...prevData,
      date:created,
      college: event.target.value,
    }));
  };
  

  // const handleDepartmentChange = (department) => {
  //   const isSelected = signUpData.departments.includes(department);
  //   if (isSelected) {
  //     setSignUpData(signUpData.departments.filter(dep => dep !== department));
  //   } else {
  //     setSignUpData([...signUpData.departments, department]);
  //   }
  // };

  const handleDepartmentChange = (department) => {
    const isSelected = signUpData.departments.includes(department);
    if (isSelected) {
      setSignUpData((prevData) => ({
        ...prevData,
        departments: prevData.departments.filter(dep => dep !== department),
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        departments: [...prevData.departments, department],
      }));
    }
  };
  


  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/LSignup", { ...signUpData });
      if (response.status === 201) {
        alert("user registered");

        history("/lecturer");
      }
      else {
        console.error("Unexpected response:", response.data);
        alert('Error occurred. Please check console for details.');
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
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


    <div className="app">
      <form action="POST" className="form-container">
        <Input
          label="Fullname"
          type="text"
          width='23ch'
          name="fullname"
          value={signUpData.fullname}
          onChange={handleChange}
        />
        <Input
          label="Username"
          type="text"
          name="username"
          value={signUpData.username}
          onChange={handleChange}
        />

<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
  <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
  <Select
    labelId="demo-simple-select-standard-label"
    id="demo-simple-select-standard"
    value={signUpData.levels}
    onChange={handleChange}
    label="Level"
    name="levels"
    multiple
    renderValue={(selected) => selected.join(", ")}
  >
    <MenuItem value={100}>100 LEVEL</MenuItem>
    <MenuItem value={200}>200 LEVEL</MenuItem>
    <MenuItem value={300}>300 LEVEL</MenuItem>
    <MenuItem value={400}>400 LEVEL</MenuItem>
    <MenuItem value={500}>500 LEVEL</MenuItem>
  </Select>
</FormControl>



        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">College</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={signUpData.college}
  onChange={handleCollegeChange}
            label="College"
            name="college"
          >
            <MenuItem value={signUpData.college}>
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


        {signUpData.college && (<div>
          <p>Selected College :{signUpData.college}</p>

          <label>Select Departments: </label>
          {collegeDepartments[signUpData.college].map((department) => (
            <div key={department}>
              <input
                type="checkbox"
                id={department}
                onChange={() => handleDepartmentChange(department)}
                checked={signUpData.departments.includes(department)}
                value={department} 
              />
              <label htmlFor={department}>{department}</label>
            </div>
          ))}
        </div>
        )
        }
        <Input
          label="Password"
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        />
      

        <button type="submit" onClick={submit}>Sign up</button>
        <p>Have an Account?</p>
        <Link to="/lecturer">Signin</Link>
      </form>
    </div>
  )

};

export default LSignUp;


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


function SignUp() {

  const history = useNavigate();
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    username: "",
    matricNo: "",
    password: "",
    level: "",
    department: "",
    college: "",
    userCreated:"",
  });
  const created = new Date().toLocaleDateString();
  const handleChange = (event) => {
    const { name, value } = event.target;



    setSignUpData((prevValue) => ({
      ...prevValue,
      [name]: value,
      userCreated:created,
    }));


  }
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

    
    const selectedCollege = signUpData.college;
    const departments = collegeDepartments[selectedCollege] || [];

    setSignUpData((prevValue) => ({
      ...prevValue,
      department: "", // Reset department when college changes
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


  // ... (other imports)

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://attendance-rose.vercel.app/signup", { ...signUpData });
      if (response.status === 201) {
        alert("user registered");

        history("/");
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
        <Input
          label="Matric Number"
          type="text"
          name="matricNo"
          value={signUpData.matricNo}
          onChange={handleChange}
        />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={signUpData.level}

            onChange={handleChange}
            label="Level"
            name="level"
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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">College</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={signUpData.college}
            onChange={(e) => {
              handleChange(e);
              updateDepartments();
            }}
            onBlur={updateDepartments}
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



        <label for="demo-simple-select-standard-label">Department</label>
        <select
          labelId="demo-simple-select-standard-label"
          id="department"
          value={signUpData.department}
          onChange={handleChange}
          label="Department"
          name="department"
        >
          {/* Department options will be dynamically populated based on the selected college */}
        </select>

        <Input
          label="Password"
          type="text"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        />

        <button type="submit" onClick={submit}>Sign up</button>
        <p>Have an Account?</p>
        <Link to="/">Signin</Link>
      </form>
    </div>
  );
};

export default SignUp;

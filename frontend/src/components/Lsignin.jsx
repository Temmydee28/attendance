import React, { useState } from "react";
import Input from "./Input";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



function LSignin() {
  const history = useNavigate();

  const [signInData, setSignInData] = useState({
    username: "",
    password: ""
  });



  async function handleChange(event) {
    const { name, value } = event.target;
    console.log(name)

    //setSignInData(value);

    setSignInData(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }


    });
    console.log(signInData);
  }

  async function submit(e){
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/Lsignin", { ...signInData });
      const {token } = response.data;
      localStorage.setItem('token', token);
       if (response.status === 200) {
        alert('successful')
        history("/lecturer/createattendance");
      } else {
        console.error("Unexpected response:", response.data);
        alert('Error occurred. Please check console for details.');
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert(error.response.data.error,"INCORRECT");
      } else if (error.request) {
        console.error("No response received from the server");
        alert('No response received from the server');
      } else {
        console.error("Error setting up the request:", error.message);
        alert('Error setting up the request');
      }
    }
  }


  return ( <div className="app">
    <form action="post" className="form-container">
      <Input
        label="Username"
        type="text"
        name="username"
        value={signInData.username}
        onChange={handleChange}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={signInData.password}
        onChange={handleChange}
      />

      <button type="submit" onClick={submit}>Sign in</button>
      <p>Don't have an Account?</p>
      <Link to="/lecturer/signup">Signup</Link>
    </form>
  </div>

  )
}


export default LSignin;

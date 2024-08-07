import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import SignUp from "./Signup";
import Dashboard from "./Dashboard";
import UserListComponent from "./User";
import StudentForm from "./StudentForm";
import Get from "./Get";
import BasicAlerts from "./Alert";
import LSignUp from "./Lsignup";
import LSignin from "./Lsignin";
import LecturerForm from "./lecturerForm";
import Sidebar from "./Sidebar"
import Hero from "./hero"
import Profile from "./profile.jsx";
import DataTable from "./Lbase.jsx";
import StudentBase from "./Sbase.jsx";



function AppRouter() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserListComponent />} />
        <Route path="/view-attendance" element={<StudentBase />} />
        <Route path="/submitattendance" element={<StudentForm />} />
        <Route path="/get" element={<Get />} />
        <Route path="/alert" element={<BasicAlerts />} />
        <Route path="/lecturer/signup" element={<LSignUp />} />
       <Route path="/lecturer/lrecord" element={<DataTable />} />
      <Route path="/lecturer/" element={<LSignin />} />
      <Route path="/lecturer/createattendance" element={<LecturerForm />} />    
 <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;

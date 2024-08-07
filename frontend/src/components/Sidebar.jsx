import React from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="menu">
        <li>
          <Link to="/">
            {" "}
            <i className="fas fa-tashometer"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/profile">
            {" "}
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="">
            {" "}
            <i className="fas fa-chart-bar"></i>
            <span>Submit Attendance</span>
          </Link>
        </li>
        <li>
          <Link to="">
            {" "}
            <i className="fas fa-briefcase"></i>
            <span>Statistics</span>
          </Link>
        </li>
        <li>
          <Link to="">
            {" "}
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </Link>
        </li>
        <li className="logout">
          <Link to="">
            {" "}
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
      <div className="btn"></div>
    </div>
  );
};

export default Sidebar;

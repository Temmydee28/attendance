import React from "react";
import CircularButton from "./Button";
import { Link } from 'react-router-dom';

function Body(){
    return (
<section>
<div className="App">
      <div className="buttons-container">
    <CircularButton name="Submit Attendance" className="btn1" link="/submitattendance" />
    <CircularButton  name="View Attendance History" className="btn2" link="/view-attendance"/>
    <CircularButton name="Time Table" className="btn3" link="/timetable"/>
    </div>
    </div>

</section>
    )
}

export default Body;
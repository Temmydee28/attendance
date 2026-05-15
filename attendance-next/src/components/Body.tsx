"use client";

import React from "react";
import CircularButton from "./Button";

function Body() {
    return (
        <section className="py-8">
            <div className="flex flex-wrap justify-center gap-6">
                <CircularButton name="Submit Attendance" className="btn1" link="/submitattendance" />
                <CircularButton name="View Attendance History" className="btn2" link="/view-attendance" />
                <CircularButton name="Time Table" className="btn3" link="/timetable" />
            </div>
        </section>
    );
}

export default Body;

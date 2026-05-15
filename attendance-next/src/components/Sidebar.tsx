"use client";

import React from "react";
import "@/styles/Sidebar.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className="Sidebar">
            <ul className="menu">
                <li>
                    <Link href="/dashboard">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link href="/profile">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link href="/submitattendance">
                        <i className="fas fa-chart-bar"></i>
                        <span>Submit Attendance</span>
                    </Link>
                </li>
                <li>
                    <Link href="/statistics">
                        <i className="fas fa-briefcase"></i>
                        <span>Statistics</span>
                    </Link>
                </li>
                <li>
                    <Link href="/settings">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </Link>
                </li>
                <li className="logout" onClick={(e) => { e.preventDefault(); logout(); }}>
                    <Link href="#">
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

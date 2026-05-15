"use client";

import React from 'react';
import '@/styles/hero.css';
import Sidebar from './Sidebar';
import Body from './Body';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const Hero = () => {
    const { user } = useAuth();
    const date = new Date().getHours();

    let hr = "";
    if (date < 12) {
        hr = "Morning";
    } else if (date < 17) {
        hr = "Afternoon";
    } else {
        hr = "Evening";
    }

    return (
        <div className="App lg:flex">
            <Sidebar />

            <div className="main-content flex-1">
                <div className="header-wrapper flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4">
                    <div className="header-title">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Good {hr}</span>
                        <h2 className="text-2xl font-bold text-indigo-700">Dashboard</h2>
                    </div>
                    <div className="user-info flex items-center gap-4">
                        <div className="search-box hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <i className='fas fa-search text-indigo-500'></i>
                            <input type="text" placeholder='Search here' className="bg-transparent border-none outline-none ml-2 text-sm" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200 overflow-hidden">
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Welcome back, {user?.fullname || 'Student'}!</h3>
                    <Body />
                </div>
            </div>
        </div>
    );
}

export default Hero;

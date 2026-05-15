"use client";

import React from 'react';
import '@/styles/profile.css';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="App lg:flex">
            <Sidebar />
            <div className="Profile flex-1 p-8 bg-gray-50 min-h-screen">
                <div className="profile-wrapper bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-4xl font-bold border-4 border-indigo-200 mb-6 uppercase">
                        {user?.fullname?.[0] || 'U'}
                    </div>
                    <div className="profile-title text-center">
                        <span className="text-gray-500 uppercase tracking-widest text-sm">Profile Details</span>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">{user?.fullname || 'User'}</h2>
                        <p className="text-indigo-600 font-medium mt-1">@{user?.username || 'username'}</p>
                    </div>

                    <div className="w-full mt-8 space-y-4 border-t pt-6">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Matric Number</span>
                            <span className="font-semibold text-gray-800">{user?.matricNumber || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">College</span>
                            <span className="font-semibold text-gray-800">{user?.college || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Department</span>
                            <span className="font-semibold text-gray-800">{user?.department || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Level</span>
                            <span className="font-semibold text-gray-800">{user?.level || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

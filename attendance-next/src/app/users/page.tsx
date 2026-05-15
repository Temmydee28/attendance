"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import Sidebar from "@/components/Sidebar";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

export default function UsersPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users");
                // The /users endpoint in the original code seems to return a list of all users
                setData(Array.isArray(response.data) ? response.data : [response.data]);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="lg:flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <Typography variant="h5" className="font-bold text-gray-800 mb-6 border-b pb-4">
                        System Users
                    </Typography>

                    {loading ? (
                        <p className="text-center py-10 text-gray-400">Loading users...</p>
                    ) : data.length === 0 ? (
                        <p className="text-center py-10 text-gray-400">No users found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((user) => (
                                <div key={user._id || user.id} className="border rounded-lg p-4 hover:border-indigo-300 transition-colors bg-gray-50">
                                    <h3 className="font-bold text-gray-800">{user.fullname}</h3>
                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                    <div className="mt-4 text-xs space-y-1">
                                        <p><span className="font-medium">Matric:</span> {user.matricNumber}</p>
                                        <p><span className="font-medium">Dept:</span> {user.department}</p>
                                        <p><span className="font-medium">College:</span> {user.college}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

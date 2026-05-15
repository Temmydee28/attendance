"use client";

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import Sidebar from '@/components/Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';

export default function ViewAttendance() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/srecord");
                setData(response.data);
            } catch (error) {
                console.error('Error fetching attendance history:', error);
                toast.error("Failed to load attendance history");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="lg:flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <Typography variant="h5" className="font-bold text-gray-800 mb-6 border-b pb-4">
                        Your Attendance History
                    </Typography>

                    <TableContainer component={Paper} elevation={0} className="border">
                        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
                            <TableHead className="bg-gray-50">
                                <TableRow>
                                    <TableCell className="font-bold">ID</TableCell>
                                    <TableCell className="font-bold">Username</TableCell>
                                    <TableCell className="font-bold">Course Code</TableCell>
                                    <TableCell className="font-bold">Unique Code</TableCell>
                                    <TableCell className="font-bold">Level</TableCell>
                                    <TableCell className="font-bold">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" className="py-10 text-gray-400">Loading history...</TableCell>
                                    </TableRow>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" className="py-10 text-gray-400">No records found</TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((row) => (
                                        <TableRow key={row._id || row.id}>
                                            <TableCell>{row._id || row.id}</TableCell>
                                            <TableCell>{row.username}</TableCell>
                                            <TableCell>{row.courseCode}</TableCell>
                                            <TableCell className="font-mono text-indigo-700 font-bold">{row.uniqueCode}</TableCell>
                                            <TableCell>{row.levels || row.level}</TableCell>
                                            <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

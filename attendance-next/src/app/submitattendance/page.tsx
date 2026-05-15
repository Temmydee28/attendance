"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid2';
import { toast } from 'react-toastify';
import api from '@/services/api';
import Input from "@/components/Input";
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function StudentForm() {
    const router = useRouter();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [locationFetched, setLocationFetched] = useState(false);
    const [attendanceData, setAttendanceData] = useState({
        fullname: "",
        username: "",
        matricNo: "",
        level: "",
        department: "",
        college: "",
        longitude: "",
        latitude: "",
        courseCode: "",
        uniqueCode: "",
        date: "",
        ipaddress: "",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (user) {
            setAttendanceData(prev => ({
                ...prev,
                fullname: user.fullname || "",
                username: user.username || "",
                matricNo: user.matricNumber || "",
                level: user.level || "",
                department: user.department || "",
                college: user.college || "",
                date: new Date().toISOString(),
            }));
        }
    }, [user]);

    useEffect(() => {
        if (!locationFetched && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setAttendanceData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(8),
                        longitude: position.coords.longitude.toFixed(8)
                    }));
                    setLocationFetched(true);
                },
                (error) => {
                    console.error(`Geolocation error: ${error.message}`);
                    toast.warn("Could not fetch location. Please enable GPS.");
                }
            );
        }
    }, [locationFetched]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAttendanceData(prev => ({ ...prev, [name]: value }));
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/submitattendance", attendanceData);
            if (response.status === 201) {
                toast.success("Attendance Submitted Successfully");
                handleClose();
            }
        } catch (error: any) {
            const message = error.response?.data?.error || 'Submission failed';
            toast.error(message);
        }
    };

    return (
        <div className="lg:flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Submission</h2>
                    <p className="text-gray-600 mb-8 font-serif">Click the button below to open the attendance submission form for your current session.</p>
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        className="bg-indigo-600 hover:bg-indigo-700 py-3 px-8 rounded-full text-lg normal-case"
                    >
                        Open Attendance Form
                    </Button>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{ backdrop: { timeout: 500 } }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography variant="h6" className="font-bold text-indigo-700 mb-4">
                                Verify Attendance Information
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <Input label="Fullname" name="fullname" value={attendanceData.fullname} readonly width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="Username" name="username" value={attendanceData.username} readonly width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="Matric Number" name="matricNo" value={attendanceData.matricNo} readonly width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="Course Code" name="courseCode" value={attendanceData.courseCode} onChange={handleChange} width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="Unique Code" name="uniqueCode" value={attendanceData.uniqueCode} onChange={handleChange} width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="IP Address (Optional)" name="ipaddress" value={attendanceData.ipaddress} onChange={handleChange} width="100%" />
                                </Grid>
                                <Grid xs={12}>
                                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-500 mt-2">
                                        <p>Location: {attendanceData.latitude}, {attendanceData.longitude}</p>
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button onClick={handleClose} variant="outlined" className="text-gray-600 border-gray-300">Cancel</Button>
                                <Button onClick={submit} variant="contained" className="bg-indigo-600 hover:bg-indigo-700">Submit Attendance</Button>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

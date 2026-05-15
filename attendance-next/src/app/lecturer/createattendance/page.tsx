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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function LecturerForm() {
    const router = useRouter();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [locationFetched, setLocationFetched] = useState(false);
    const [attendanceData, setAttendanceData] = useState({
        fullname: "",
        username: "",
        levels: "",
        departments: "",
        college: "",
        longitude: "",
        latitude: "",
        courseCode: "",
        uniqueCode: "",
    });

    const collegeDepartments: Record<string, string[]> = {
        CONAS: ["Computer Science", "Biochemistry", "Microbiology", "Industrial Chemistry", "Geology", "Plant Science", "Chemistry", "Zoology", "Biology", "Physics"],
        FONS: ["Nursing Science"],
        FOHS: ["Public Health", "Human Physiology", "Medical Laborartory science", "Human Anatomy"],
        COLAW: ["Private and Business Law", "Public and International law"],
        COET: ["Mechanical", "Biomedical", "Mechatronic", "Electrical and Electronics", "Computer Engineering", "Telecommunication", "Civil and Environmental"],
        COSMAS: ["Political Science", "Accounting", "Banking and Finance", "Business Admin", "Marketing", "Economics", "Geography and Planning", "Mass Communication", "International Relations", "Public Admin", "Sociology", "Criminology"],
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (user) {
            setAttendanceData(prev => ({
                ...prev,
                fullname: user.fullname || "",
                username: user.username || "",
                college: user.college || "",
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const { name, value } = event.target;
        setAttendanceData(prev => ({ ...prev, [name as string]: value }));
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/createattendance", {
                ...attendanceData,
                date: new Date().toISOString()
            });
            if (response.status === 201) {
                toast.success("Attendance Session Created Successfully");
                handleClose();
            }
        } catch (error: any) {
            const message = error.response?.data?.error || 'Creation failed';
            toast.error(message);
        }
    };

    return (
        <div className="lg:flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Create Attendance Session</h2>
                    <p className="text-gray-600 mb-8">Setup a new attendance session for your students. Provide a unique code they will use to sign in.</p>
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        className="bg-green-600 hover:bg-green-700 py-3 px-8 rounded-full text-lg normal-case"
                    >
                        Start New Session
                    </Button>

                    <div className="mt-8">
                        <Button
                            variant="outlined"
                            onClick={() => router.push('/lecturer/lrecord')}
                            className="text-green-700 border-green-700"
                        >
                            View Past Records
                        </Button>
                    </div>
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
                            <Typography variant="h6" className="font-bold text-green-700 mb-4">
                                Session Configuration
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <Input label="Lecturer Name" name="fullname" value={attendanceData.fullname} readonly width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="Username" name="username" value={attendanceData.username} readonly width="100%" />
                                </Grid>

                                <Grid xs={12} sm={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel>Target Level</InputLabel>
                                        <Select
                                            name="levels"
                                            value={attendanceData.levels}
                                            onChange={handleChange as any}
                                        >
                                            <MenuItem value="100">100 Level</MenuItem>
                                            <MenuItem value="200">200 Level</MenuItem>
                                            <MenuItem value="300">300 Level</MenuItem>
                                            <MenuItem value="400">400 Level</MenuItem>
                                            <MenuItem value="500">500 Level</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid xs={12} sm={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel>College</InputLabel>
                                        <Select
                                            name="college"
                                            value={attendanceData.college}
                                            onChange={(e) => {
                                                setAttendanceData(prev => ({ ...prev, college: e.target.value as string, departments: "" }));
                                            }}
                                        >
                                            <MenuItem value="CONAS">CONAS</MenuItem>
                                            <MenuItem value="FOHS">FOHS</MenuItem>
                                            <MenuItem value="FONS">FONS</MenuItem>
                                            <MenuItem value="COLAW">COLAW</MenuItem>
                                            <MenuItem value="COET">COET</MenuItem>
                                            <MenuItem value="COSMAS">COSMAS</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {attendanceData.college && (
                                    <Grid xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>Department</InputLabel>
                                            <Select
                                                name="departments"
                                                value={attendanceData.departments}
                                                onChange={handleChange as any}
                                            >
                                                {collegeDepartments[attendanceData.college]?.map((dept) => (
                                                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}

                                <Grid xs={12} sm={6}>
                                    <Input label="Course Code" name="courseCode" value={attendanceData.courseCode} onChange={handleChange} width="100%" />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Input label="Unique Session Code" name="uniqueCode" value={attendanceData.uniqueCode} onChange={handleChange} width="100%" />
                                </Grid>

                                <Grid xs={12}>
                                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-500 mt-2">
                                        <p>Current Location: {attendanceData.latitude}, {attendanceData.longitude}</p>
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button onClick={handleClose} variant="outlined" className="text-gray-600 border-gray-300">Cancel</Button>
                                <Button onClick={submit} variant="contained" className="bg-green-600 hover:bg-green-700">Start Session</Button>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

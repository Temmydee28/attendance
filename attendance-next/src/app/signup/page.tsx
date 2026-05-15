"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from "@/services/api";
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SignUp() {
    const router = useRouter();

    const [signUpData, setSignUpData] = useState({
        fullname: "",
        username: "",
        matricNo: "",
        password: "",
        level: "",
        department: "",
        college: "",
        userCreated: "",
    });

    const collegeDepartments: Record<string, string[]> = {
        CONAS: ["Computer Science", "Biochemistry", "Microbiology", "Industrial Chemistry", "Geology", "Plant Science", "Chemistry", "Zoology", "Biology", "Physics"],
        FONS: ["Nursing Science"],
        FOHS: ["Public Health", "Human Physiology", "Medical Laborartory science", "Human Anatomy"],
        COLAW: ["Private and Business Law", "Public and International law"],
        COET: ["Mechanical", "Biomedical", "Mechatronic", "Electrical and Electronics", "Computer Engineering", "Telecommunication", "Civil and Environmental"],
        COSMAS: ["Political Science", "Accounting", "Banking and Finance", "Business Admin", "Marketing", "Economics", "Geography and Planning", "Mass Communication", "International Relations", "Public Admin", "Sociology", "Criminology"],
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const { name, value } = event.target;
        const created = new Date().toLocaleDateString();

        setSignUpData((prevValue) => ({
            ...prevValue,
            [name]: value,
            userCreated: created,
        }));
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("/signup", { ...signUpData });
            if (response.status === 201) {
                toast.success("User registered successfully");
                router.push("/");
            } else {
                toast.error("Registration failed");
            }
        } catch (error: any) {
            const message = error.response?.data?.error || 'Signup failed';
            toast.error(message);
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Student Sign Up</h2>

                <div className="space-y-4">
                    <Input
                        label="Fullname"
                        type="text"
                        name="fullname"
                        value={signUpData.fullname}
                        onChange={handleChange}
                    />
                    <Input
                        label="Username"
                        type="text"
                        name="username"
                        value={signUpData.username}
                        onChange={handleChange}
                    />
                    <Input
                        label="Matric Number"
                        type="text"
                        name="matricNo"
                        value={signUpData.matricNo}
                        onChange={handleChange}
                    />

                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Level</InputLabel>
                        <Select
                            value={signUpData.level}
                            onChange={handleChange as any}
                            label="Level"
                            name="level"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="100">100 Level</MenuItem>
                            <MenuItem value="200">200 Level</MenuItem>
                            <MenuItem value="300">300 Level</MenuItem>
                            <MenuItem value="400">400 Level</MenuItem>
                            <MenuItem value="500">500 Level</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                        <InputLabel>College</InputLabel>
                        <Select
                            value={signUpData.college}
                            onChange={(e) => {
                                handleChange(e as any);
                                setSignUpData(prev => ({ ...prev, department: "" }));
                            }}
                            label="College"
                            name="college"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="CONAS">CONAS</MenuItem>
                            <MenuItem value="FOHS">FOHS</MenuItem>
                            <MenuItem value="FONS">FONS</MenuItem>
                            <MenuItem value="COLAW">COLAW</MenuItem>
                            <MenuItem value="COET">COET</MenuItem>
                            <MenuItem value="COSMAS">COSMAS</MenuItem>
                        </Select>
                    </FormControl>

                    {signUpData.college && (
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Department</InputLabel>
                            <Select
                                value={signUpData.department}
                                onChange={handleChange as any}
                                label="Department"
                                name="department"
                            >
                                <MenuItem value=""><em>Select Department</em></MenuItem>
                                {collegeDepartments[signUpData.college]?.map((dept) => (
                                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    onClick={submit}
                    className="mt-8 w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
                >
                    Sign up
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Have an Account?</p>
                    <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
                        Signin
                    </Link>
                </div>
            </form>
        </div>
    );
}

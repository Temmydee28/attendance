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
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function LSignUp() {
    const router = useRouter();

    const [signUpData, setSignUpData] = useState({
        fullname: "",
        username: "",
        password: "",
        levels: [] as string[],
        departments: [] as string[],
        college: "",
        date: ""
    });

    const collegeDepartments: Record<string, string[]> = {
        CONAS: ["Computer Science", "Biochemistry", "Microbiology", "Industrial Chemistry", "Geology", "Plant Science", "Chemistry", "Zoology", "Biology", "Physics"],
        FONS: ["Nursing Science"],
        FOHS: ["Public Health", "Human Physiology", "Medical Laborartory science", "Human Anatomy"],
        COLAW: ["Private and Business Law", "Public and International law"],
        COET: ["Mechanical", "Biomedical", "Mechatronic", "Electrical and Electronics", "Computer Engineering", "Telecommunication", "Civil and Environmental"],
        COSMAS: ["Political Science", "Accounting", "Banking and Finance", "Business Admin", "Marketing", "Economics", "Geography and Planning", "Mass Communication", "International Relations", "Public Admin", "Sociology", "Criminology"],
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]>) => {
        const { name, value } = event.target;
        setSignUpData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    const handleDepartmentChange = (dept: string) => {
        setSignUpData((prev) => {
            const isSelected = prev.departments.includes(dept);
            return {
                ...prev,
                departments: isSelected
                    ? prev.departments.filter(d => d !== dept)
                    : [...prev.departments, dept]
            };
        });
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const date = new Date().toISOString();

        try {
            const response = await api.post("/LSignup", { ...signUpData, date });
            if (response.status === 201) {
                toast.success("Lecturer registered successfully");
                router.push("/lecturer");
            }
        } catch (error: any) {
            const message = error.response?.data?.error || 'Signup failed';
            toast.error(message);
            console.error("Lecturer signup error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Lecturer Sign Up</h2>

                <div className="space-y-4">
                    <Input
                        label="Fullname"
                        type="text"
                        name="fullname"
                        value={signUpData.fullname}
                        onChange={handleChange as any}
                    />
                    <Input
                        label="Username"
                        type="text"
                        name="username"
                        value={signUpData.username}
                        onChange={handleChange as any}
                    />

                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Levels (Multiple)</InputLabel>
                        <Select
                            multiple
                            name="levels"
                            value={signUpData.levels}
                            onChange={handleChange as any}
                            renderValue={(selected) => (selected as string[]).join(", ")}
                        >
                            <MenuItem value="100">100 LEVEL</MenuItem>
                            <MenuItem value="200">200 LEVEL</MenuItem>
                            <MenuItem value="300">300 LEVEL</MenuItem>
                            <MenuItem value="400">400 LEVEL</MenuItem>
                            <MenuItem value="500">500 LEVEL</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                        <InputLabel>College</InputLabel>
                        <Select
                            name="college"
                            value={signUpData.college}
                            onChange={(e) => {
                                setSignUpData(prev => ({ ...prev, college: e.target.value as string, departments: [] }));
                            }}
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
                        <div className="mt-4">
                            <p className="mb-2 text-sm font-medium text-gray-700">Select Departments:</p>
                            <FormGroup className="max-h-48 overflow-y-auto border rounded p-2">
                                {collegeDepartments[signUpData.college]?.map((dept) => (
                                    <FormControlLabel
                                        key={dept}
                                        control={
                                            <Checkbox
                                                checked={signUpData.departments.includes(dept)}
                                                onChange={() => handleDepartmentChange(dept)}
                                            />
                                        }
                                        label={dept}
                                    />
                                ))}
                            </FormGroup>
                        </div>
                    )}

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleChange as any}
                    />
                </div>

                <button
                    type="submit"
                    onClick={submit}
                    className="mt-8 w-full rounded-md bg-green-600 py-2 text-white transition-colors hover:bg-green-700"
                >
                    Sign up
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Have an Account?</p>
                    <Link href="/lecturer" className="text-sm font-medium text-green-600 hover:underline">
                        Signin
                    </Link>
                </div>
            </form>
        </div>
    );
}

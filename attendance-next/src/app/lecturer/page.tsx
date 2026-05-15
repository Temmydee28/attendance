"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'react-toastify';

export default function LSignin() {
    const router = useRouter();
    const { login } = useAuth();

    const [signInData, setSignInData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignInData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("/Lsignin", { ...signInData });
            const { token, lecturer } = response.data;

            if (response.status === 200) {
                toast.success('Lecturer login successful');
                login(token, { ...lecturer, role: 'lecturer' });
            } else {
                toast.error("Unexpected response");
            }
        } catch (error: any) {
            const message = error.response?.data?.error || 'Login failed';
            toast.error(message);
            console.error("Lecturer login error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Lecturer Sign In</h2>
                <Input
                    label="Username"
                    type="text"
                    name="username"
                    value={signInData.username}
                    onChange={handleChange}
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={signInData.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    onClick={submit}
                    className="mt-6 w-full rounded-md bg-green-600 py-2 text-white transition-colors hover:bg-green-700"
                >
                    Sign in
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an Account?</p>
                    <Link href="/lecturer/signup" className="text-sm font-medium text-green-600 hover:underline">
                        Signup
                    </Link>
                </div>

                <div className="mt-6 border-t pt-4 text-center">
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600">
                        Are you a Student? Sign in here
                    </Link>
                </div>
            </form>
        </div>
    );
}

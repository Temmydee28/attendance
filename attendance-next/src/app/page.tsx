"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'react-toastify';

export default function Signin() {
  const router = useRouter();
  const { login } = useAuth();

  const [signInData, setSignInData] = useState({
    username: "",
    matricNo: "",
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
      const response = await api.post("/", { ...signInData });
      const { token, user } = response.data;

      if (response.status === 200) {
        toast.success('Login successful');
        login(token, { ...user, role: 'student' }); // Assuming root login is for students
      } else {
        toast.error("Unexpected response");
      }
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Student Sign In</h2>
        <Input
          label="Username"
          type="text"
          name="username"
          value={signInData.username}
          onChange={handleChange}
        />
        <Input
          label="Matric Number"
          type="text"
          name="matricNo"
          value={signInData.matricNo}
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
          className="mt-6 w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Sign in
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an Account?</p>
          <Link href="/signup" className="text-sm font-medium text-blue-600 hover:underline">
            Signup
          </Link>
        </div>

        <div className="mt-6 border-t pt-4 text-center">
          <Link href="/lecturer" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Are you a Lecturer? Sign in here
          </Link>
        </div>
      </form>
    </div>
  );
}

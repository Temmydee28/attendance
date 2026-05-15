"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    username: string;
    fullname: string;
    matricNumber?: string;
    role: 'student' | 'lecturer';
    college?: string;
    department?: string;
    level?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const refreshUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // Try student fetch
            const studentRes = await api.get('/users').catch(() => null);
            if (studentRes) {
                setUser({ ...studentRes.data, role: 'student' });
            } else {
                // Try lecturer fetch
                const lecturerRes = await api.get('/lecturers').catch(() => null);
                if (lecturerRes) {
                    setUser({ ...lecturerRes.data, role: 'lecturer' });
                } else {
                    logout();
                }
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        setUser(userData);
        if (userData.role === 'student') {
            router.push('/dashboard');
        } else {
            router.push('/lecturer/createattendance');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

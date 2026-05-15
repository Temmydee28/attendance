import axios from 'axios';

const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const BASE_URL = isDevelopment
    ? "http://localhost:8001"
    : "https://attendance-rose.vercel.app";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

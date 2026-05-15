"use client";

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { toast } from 'react-toastify';

export default function Get() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/get");
                setData(response.data);
            } catch (error) {
                console.error("Error in Get page:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">System Data</h1>
            {data ? (
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(data, null, 2)}
                </pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

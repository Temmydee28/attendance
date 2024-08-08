import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const DataTable = () => {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://attendance-rose.vercel.app//lrecord', {
                    headers: {
                        Authorization: token,
                    }
                });
                const records= Array.isArray(response.data) ?response.data :[response.data]

                setData(records);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Lecturer</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Course Code</TableCell>
                        <TableCell>College</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Unique Code</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.lecturer}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.courseCode}</TableCell>
                            <TableCell>{row.college}</TableCell>
                            <TableCell>{row.levels}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.uniqueCode}</TableCell>
                            <TableCell>{row.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;

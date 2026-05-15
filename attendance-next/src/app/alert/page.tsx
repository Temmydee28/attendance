"use client";

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Stack sx={{ width: '100%', maxWidth: 400 }} spacing={2}>
                <Alert severity="success">Attendance Submitted Successfully!</Alert>
                <Alert severity="info">Processing your request...</Alert>
                <Alert severity="warning">Please ensure you are within the designated area.</Alert>
                <Alert severity="error">Error: Invalid unique code.</Alert>
            </Stack>
        </div>
    );
}

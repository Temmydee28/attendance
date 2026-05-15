"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface InputProps {
    label: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    name?: string;
    id?: string;
    width?: string | number;
    readonly?: boolean;
    hidden?: boolean;
}

function Input(props: InputProps) {
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 1, width: props.width || '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                type={props.type}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                id={props.id}
                slotProps={{
                    htmlInput: {
                        readOnly: props.readonly,
                        hidden: props.hidden,
                    }
                }}
                label={props.label}
                variant="standard"
            />
            <br />
        </Box>
    );
}

export default Input;

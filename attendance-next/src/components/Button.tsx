"use client";

import React from 'react';
import Link from 'next/link';

interface CircularButtonProps {
    name: string;
    className?: string;
    link: string;
}

const CircularButton = ({ name, className, link }: CircularButtonProps) => {
    return (
        <Link href={link} className={`circular-button ${className}`}>
            <span>{name}</span>
        </Link>
    );
};

export default CircularButton;

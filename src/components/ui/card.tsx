"use client"
import React, { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-md ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }: CardProps) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

// src/components/cards/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-800 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;

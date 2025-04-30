// src/components/cards/Card.jsx
import React from 'react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-800 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
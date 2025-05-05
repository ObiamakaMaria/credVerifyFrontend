// src/components/cards/AvailableLoansCard.jsx
import React from 'react';
import Card from './Card';

const AvailableLoansCard = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <Card>
      <h3 className="text-gray-400 text-sm mb-2">Available Loans</h3>
      <div className="text-white text-3xl font-bold mb-6">{formattedAmount}</div>
      <div className="flex justify-between items-center">
        <div className="text-gray-400 text-xs">View All</div>
        <div className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default AvailableLoansCard;
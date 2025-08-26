// src/components/cards/CreditScoreCard.jsx
import React from 'react';
import Card from './Card';

const CreditScoreCard = ({ score, change, period }) => {
  const isPositive = change > 0;

  return (
    <Card>
      <h3 className="text-gray-400 text-sm mb-2">Current Credit Score</h3>
      <div className="flex items-center">
        <div className="text-white text-4xl font-bold mr-2">{score}</div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
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
            className="mr-1"
          >
            {isPositive ? (
              <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
              <polyline points="6 9 12 15 18 9"></polyline>
            )}
          </svg>
          <span className="text-xs">{isPositive ? '+' : ''}{change} in the last {period}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-400 text-xs">Credit score report</div>
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

export default CreditScoreCard;
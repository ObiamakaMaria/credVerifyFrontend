// src/components/cards/QuarterGoalCard.jsx
import React from 'react';
import Card from './Card';
import CircularProgressBar from '../common/CircularProgressBar';

const QuarterGoalCard = ({ percentage, loanDetails }) => {
  // Use loanCompletion from loanDetails if available, otherwise use the provided percentage
  const completionPercentage = loanDetails && loanDetails.loanCompletion !== undefined
    ? loanDetails.loanCompletion
    : percentage;
  return (
    <Card className="flex flex-col items-center">
      <h3 className="text-gray-400 text-sm mb-4">Loan Completion</h3>
      <CircularProgressBar percentage={completionPercentage} />
      <div className="flex justify-between items-center w-full mt-6">
        <div className="text-gray-400 text-xs">All goals</div>
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

export default QuarterGoalCard;
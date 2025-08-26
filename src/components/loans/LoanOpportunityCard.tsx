// src/components/loans/LoanOpportunityCard.jsx
import React from 'react';
import Card from '../cards/Card';

const LoanOpportunityCard = ({ title, description }) => {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <h4 className="text-white font-semibold mb-2">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <button className="mt-4 bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
        Apply Now
      </button>
    </Card>
  );
};

export default LoanOpportunityCard;
// src/components/loans/FinancialOpportunities.jsx
import React from 'react';
import LoanOpportunityCard from './LoanOpportunityCard';

const FinancialOpportunities = ({ opportunities }) => {
  return (
    <div>
      <h3 className="text-gray-400 text-sm mb-4">Available Financial Opportunities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {opportunities.map((opp, index) => (
          <LoanOpportunityCard key={index} title={opp.title} description={opp.description} />
        ))}
      </div>
    </div>
  );
};

export default FinancialOpportunities;
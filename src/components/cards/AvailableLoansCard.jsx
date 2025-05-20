// src/components/cards/AvailableLoansCard.jsx
import React from 'react';
import Card from './Card';

const AvailableLoansCard = ({ amount, loanDetails }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // If we have loan details, show loan amount and balance to repay
  // Otherwise just show the available amount
  const hasLoanDetails = loanDetails && loanDetails.loanAmount;
  
  return (
    <Card>
      {hasLoanDetails ? (
        <>
          <h3 className="text-gray-400 text-sm mb-2">Loan Details</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Loan Amount</span>
              <span className="text-white font-semibold">
                {formatCurrency(parseFloat(loanDetails.loanAmount))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Balance to Repay</span>
              <span className="text-white font-semibold">
                {formatCurrency(
                  parseFloat(loanDetails.monthlyPaymentAmount) * loanDetails.remainingPayments
                )}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-gray-400 text-sm mb-2">Available Loans</h3>
          <div className="text-white text-3xl font-bold mb-6">{formatCurrency(amount)}</div>
        </>
      )}
      <div className="flex justify-between items-center">
        <div className="text-gray-400 text-xs">View Details</div>
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
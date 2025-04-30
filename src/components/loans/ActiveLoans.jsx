// src/components/loans/ActiveLoans.jsx
import React from 'react';
import Card from '../cards/Card';

const ActiveLoans = ({
  originalAmount,
  monthlyPayment,
  nextPaymentDue,
  remainingPayments,
  projectedCompletion,
}) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <Card>
      <h3 className="text-gray-400 text-sm mb-4">Your Active Loan</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Original Deposit Amount</span>
          <span className="text-white font-bold">{formatCurrency(originalAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Monthly Payment</span>
          <span className="text-white font-bold">{formatCurrency(monthlyPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Next Payment Due</span>
          <span className="text-white font-bold">{nextPaymentDue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Remaining Payments</span>
          <span className="text-white font-bold">{remainingPayments}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Projected Completion</span>
          <span className="text-white font-bold">{projectedCompletion}</span>
        </div>
      </div>
    </Card>
  );
};

export default ActiveLoans;
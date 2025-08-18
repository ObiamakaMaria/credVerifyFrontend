// src/components/ActiveLoans.tsx
import React from 'react';
import MakePayment from './MakePayment';
import Card from '../cards/Card';

interface ActiveLoansProps {
  originalAmount: number;
  monthlyPayment: number;
  nextPaymentDue: string;
  remainingPayments: number;
  projectedCompletion: string;
  loanDetails: any;
  onPaymentSuccess: () => void;
}

const ActiveLoans: React.FC<ActiveLoansProps> = ({
  originalAmount,
  monthlyPayment,
  nextPaymentDue,
  remainingPayments,
  projectedCompletion,
  loanDetails,
  onPaymentSuccess,
}) => {
  const formatCurrency = (amount: number): string =>
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

      {/* Payment Button */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <MakePayment loanDetails={loanDetails} onPaymentSuccess={onPaymentSuccess} />
      </div>
    </Card>
  );
};

export default ActiveLoans;


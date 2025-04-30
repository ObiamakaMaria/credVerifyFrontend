// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CreditScoreCard from './components/cards/CreditScoreCard';
import AvailableLoansCard from './components/cards/AvailableLoansCard';
import QuarterGoalCard from './components/cards/QuarterGoalCard';
import HighlightCard from './components/cards/HighlightCard';
import CreditScoreTrendChart from './components/charts/CreditScoreTrendChart';
import PaymentHistoryChart from './components/charts/PaymentHistoryChart';
import ActiveLoans from './components/loans/ActiveLoans';
import FinancialOpportunities from './components/loans/FinancialOpportunities';
import { creditScoreTrendData, paymentHistoryData, financialOpportunities } from './data/mockData';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <div className="ml-16 p-6">
        <Header username="koded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <CreditScoreCard score={760} change={3} period="3 months" />
          <AvailableLoansCard amount={12000} />
          <QuarterGoalCard percentage={84} />
        </div>
        <CreditScoreTrendChart data={creditScoreTrendData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <HighlightCard month="June" year="2023" />
          <HighlightCard month="June" year="2023" />
          <div />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PaymentHistoryChart data={paymentHistoryData} />
          <ActiveLoans
            originalAmount={10000}
            monthlyPayment={500}
            nextPaymentDue="2025-05-01"
            remainingPayments={10}
            projectedCompletion="2025-12-01"
          />
        </div>
        <FinancialOpportunities opportunities={financialOpportunities} />
      </div>
    </div>
  );
};

export default App;
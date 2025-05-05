import React from 'react';
import CreditScoreCard from '../components/cards/CreditScoreCard';
import AvailableLoansCard from '../components/cards/AvailableLoansCard';
import QuarterGoalCard from '../components/cards/QuarterGoalCard';
import HighlightCard from '../components/cards/HighlightCard';
import CreditScoreTrendChart from '../components/charts/CreditScoreTrendChart';
import PaymentHistoryChart from '../components/charts/PaymentHistoryChart';
import ActiveLoans from '../components/loans/ActiveLoans';
import FinancialOpportunities from '../components/loans/FinancialOpportunities';
import { creditScoreTrendData, paymentHistoryData, financialOpportunities } from '../data/mockData';

const Dashboard = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <CreditScoreCard score={760} change={3} period="3 months" />
        <AvailableLoansCard amount={12000} />
        <QuarterGoalCard percentage={84} />
      </div>
      
      {/* Credit Score Trend */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Credit Score Trend</h2>
        <CreditScoreTrendChart data={creditScoreTrendData} />
      </div>
      
      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <HighlightCard 
          month="June" 
          year="2023" 
          title="Perfect Payment Record"
          description="You've made all payments on time this month!"
        />
        <HighlightCard 
          month="June" 
          year="2023"
          title="Credit Utilization Improved"
          description="Your credit utilization ratio decreased by 5%"
        />
      </div>
      
      {/* Payment History and Active Loans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <PaymentHistoryChart data={paymentHistoryData} />
        </div>
        
        <ActiveLoans
          originalAmount={10000}
          monthlyPayment={500}
          nextPaymentDue="2025-05-01"
          remainingPayments={10}
          projectedCompletion="2025-12-01"
        />
      </div>
      
      {/* Financial Opportunities */}
      <FinancialOpportunities opportunities={financialOpportunities} />
    </>
  );
};

export default Dashboard;
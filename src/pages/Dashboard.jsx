import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditScoreCard from '../components/cards/CreditScoreCard';
import AvailableLoansCard from '../components/cards/AvailableLoansCard';
import QuarterGoalCard from '../components/cards/QuarterGoalCard';
import HighlightCard from '../components/cards/HighlightCard';
import CreditScoreTrendChart from '../components/charts/CreditScoreTrendChart';
import PaymentHistoryChart from '../components/charts/PaymentHistoryChart';
import ActiveLoans from '../components/loans/ActiveLoans';
import FinancialOpportunities from '../components/loans/FinancialOpportunities';
import { creditScoreTrendData, paymentHistoryData, financialOpportunities } from '../data/mockData';
import { useContract } from '../utils/ContractContext';
import { useAppKitAccount } from '@reown/appkit/react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAppKitAccount();
  const { creditScore, loanDetails, loading, error, refreshData } = useContract();
  const [formattedLoanData, setFormattedLoanData] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (isConnected && address) {
      refreshData();
    }
  }, [isConnected, address, refreshData]);
  
  // Show welcome modal when user connects wallet and has no loan
  useEffect(() => {
    if (isConnected && address && !loading && initialLoadRef.current) {
      // Check if we have a loan in state or in localStorage
      const hasLoanInState = !!loanDetails;
      const hasLoanInStorage = !!localStorage.getItem(`mockLoan_${address}`);
      
      // Only show welcome modal if there's no loan in either place
      if (!hasLoanInState && !hasLoanInStorage) {
        setShowWelcomeModal(true);
      }
      
      initialLoadRef.current = false;
    }
  }, [isConnected, address, loading, loanDetails]);

  useEffect(() => {
    if (loanDetails) {
      // Format loan data for display
      setFormattedLoanData({
        originalAmount: parseFloat(loanDetails.collateralAmount),
        monthlyPayment: parseFloat(loanDetails.monthlyPaymentAmount),
        nextPaymentDue: new Date(loanDetails.nextPaymentDue).toISOString().split('T')[0],
        remainingPayments: loanDetails.remainingPayments,
        projectedCompletion: new Date(Date.now() + (loanDetails.remainingPayments * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
      });
    }
  }, [loanDetails]);
  const handleCreateLoan = () => {
    setShowWelcomeModal(false);
    navigate('/create-credit-builder-loan');
  };
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowWelcomeModal(false)}></div>
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 z-10 border border-gray-700 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                <svg className="h-10 w-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to CredVerify!</h3>
              <p className="text-gray-300 mb-6">
                Your wallet is connected, but you don't have an active credit builder loan yet. 
                Would you like to create one to start building your credit score?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCreateLoan}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200"
                >
                  Create a Loan
                </button>
                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition duration-200"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isConnected ? (
        // Wallet Connection Prompt
        <div className="bg-gray-800 rounded-lg p-8 text-center mb-6">
          <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">Please connect your wallet to view your credit information and loan details.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => {
                if (window.appKit && window.appKit.open) {
                  window.appKit.open();
                } else if (window.appKit && window.appKit.connect) {
                  window.appKit.connect();
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        // Dashboard Content when wallet is connected
        <>
          {/* Summary Cards */}
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <CreditScoreCard score={creditScore || 0} change={3} period="3 months" />
              <AvailableLoansCard 
                amount={creditScore ? Math.round(creditScore * 15) : 0} 
                loanDetails={loanDetails} 
              />
              <QuarterGoalCard 
                percentage={creditScore ? Math.min(100, Math.round((creditScore / 800) * 100)) : 0} 
                loanDetails={loanDetails} 
              />
            </div>
          )}
          
          {/* Credit Score Trend */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Credit Score Trend</h2>
            <CreditScoreTrendChart data={creditScoreTrendData} />
          </div>
          
          {/* Loan Timeline Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <HighlightCard 
              date={loanDetails?.startDate || new Date()}
              title="Loan Started"
              description="Your credit builder loan was initiated on this date"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            <HighlightCard 
              date={loanDetails ? new Date(loanDetails.startDate.getTime() + (365 * 24 * 60 * 60 * 1000)) : new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))}
              title="Expected Completion"
              description="Your loan will be fully paid off after 12 monthly payments"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
          
          {/* Payment History and Active Loans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Credit Score History</h2>
              <PaymentHistoryChart data={paymentHistoryData} />
            </div>
            
            {formattedLoanData ? (
              <ActiveLoans
                originalAmount={formattedLoanData.originalAmount}
                monthlyPayment={formattedLoanData.monthlyPayment}
                nextPaymentDue={formattedLoanData.nextPaymentDue}
                remainingPayments={formattedLoanData.remainingPayments}
                projectedCompletion={formattedLoanData.projectedCompletion}
                loanDetails={loanDetails}
                onPaymentSuccess={refreshData}
              />
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 flex flex-col justify-center items-center h-full">
                <h2 className="text-xl font-semibold mb-4">No Active Loans</h2>
                <p className="text-gray-400 mb-4 text-center">You don't have any active credit builder loans.</p>
                <button 
                  onClick={handleCreateLoan}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Create a Loan
                </button>
              </div>
            )}
          </div>
          
          {/* Financial Opportunities */}
          <FinancialOpportunities opportunities={financialOpportunities} />
        </>
      )}
    </>
  );
};

export default Dashboard;
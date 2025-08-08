import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';
import { useContract } from '../utils/ContractContext';
import * as contractService from '../utils/contractService';

const CreateCreditBuilderLoan = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAppKitAccount();
  const { 
    approvedStablecoins, 
    stablecoinNames, 
    loading: contractLoading, 
    error: contractError, 
    approveStablecoin, 
    createLoan 
  } = useContract();
  // Form state
  const [formData, setFormData] = useState({
    stablecoin: "",
    amount: 500,
    tokenURI: "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  });
  
  const [amountInput, setAmountInput] = useState(formData.amount);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [localError, setLocalError] = useState('');
  
  // Set initial stablecoin when available and check for existing loan
  useEffect(() => {
    if (approvedStablecoins.length > 0 && !formData.stablecoin) {
      setFormData(prev => ({
        ...prev,
        stablecoin: approvedStablecoins[0]
      }));
    }
    
    // Check if user already has a loan and redirect if needed
    const checkExistingLoan = async () => {
      if (isConnected && address && !contractLoading) {
        try {
          const contract = await contractService.getCredVerifyContract();
          const loan = await contract.loans(address);
          
          if (loan && loan.active) {
            setLocalError('You already have an active loan. Redirecting to dashboard...');
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          }
        } catch (error) {
          console.log('No active loan found or error checking loan status');
        }
      }
    };
    
    checkExistingLoan();
  }, [approvedStablecoins, formData.stablecoin, isConnected, address, contractLoading, navigate]);
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData({
      ...formData,
      amount: value
    });
    setAmountInput(value);
  };
  
  // Handle direct input change
  const handleInputChange = (e) => {
    setAmountInput(e.target.value);
  };
  
  // Apply input value to the form data
  const applyAmount = () => {
    const value = Math.min(5000, Math.max(50, parseInt(amountInput) || 50));
    setFormData({
      ...formData,
      amount: value
    });
    setAmountInput(value);
  };
  
  // Handle approval action
  const handleApprove = async () => {
    if (!formData.stablecoin || !formData.amount) {
      setLocalError('Please select a stablecoin and enter an amount');
      return;
    }
    
    setIsLoading(true);
    setLocalError('');
    
    try {
      const result = await approveStablecoin(formData.stablecoin, formData.amount);
      if (result) {
        setIsApproved(true);
      } else {
        setLocalError('Approval failed. Please try again.');
      }
    } catch (error) {
      console.error('Error in approval process:', error);
      setLocalError(error.message || 'Approval failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle loan creation
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (!formData.stablecoin || !formData.amount) {
      setLocalError('Please select a stablecoin and enter an amount');
      return;
    }
    
    setIsLoading(true);
    setLocalError('');
    
    try {
      const result = await createLoan(
        formData.stablecoin, 
        formData.amount, 
        formData.tokenURI
      );
      
      if (result.success) {
        setTxHash(result.txHash);
        setShowSuccessModal(true);
      } else {
        setLocalError(result.error || 'Failed to create loan. Please try again.');
      }
    } catch (error) {
      console.error('Error creating loan:', error);
      setLocalError(error.message || 'Failed to create loan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle returning to dashboard
  const handleReturnToDashboard = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };
  
  // Simple calculation for display
  const calculateMonthlyPayment = (amount) => {
    const principal = parseFloat(amount);
    const monthlyRate = 8 / (12 * 100); // 8% APR
    const term = 12; // 12 months
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    return payment.toFixed(2);
  };
  
  const monthlyPayment = calculateMonthlyPayment(formData.amount);
  const totalRepayment = (parseFloat(monthlyPayment) * 12).toFixed(2);
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Create Credit Builder Loan</h1>
      
      {(contractError || localError) && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">
          {contractError || localError}
        </div>
      )}
      
      {!isConnected ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center mb-6">
          <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">Please connect your wallet to create a credit builder loan.</p>
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
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Builder Loan Application</h2>
          
          <p className="text-gray-300 mb-6">
            Credit builder loans help establish or improve your credit score by demonstrating 
            your ability to make consistent, on-time payments. You'll deposit collateral 
            that will be held until the loan is repaid.
          </p>
          
          <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-md p-4 mb-6">
            <h3 className="text-blue-400 font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Select a stablecoin and deposit amount (this will be your collateral)</li>
              <li>Approve the stablecoin for use by the smart contract</li>
              <li>Create your credit builder loan</li>
              <li>Make monthly payments to build your credit score</li>
              <li>After completing all payments, your collateral will be returned</li>
            </ol>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Select Stablecoin</label>
            <div className="relative">
              <select
                value={formData.stablecoin}
                onChange={(e) => setFormData({...formData, stablecoin: e.target.value})}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || contractLoading}
              >
                {approvedStablecoins.length === 0 ? (
                  <option value="">Loading stablecoins...</option>
                ) : (
                  <>
                    <option value="">Select a stablecoin</option>
                    {approvedStablecoins.map((coin) => (
                      <option key={coin} value={coin}>
                        {stablecoinNames[coin] || coin}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {contractLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
            {approvedStablecoins.length === 0 && !contractLoading && (
              <button 
                onClick={() => refreshData()} 
                className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh stablecoins
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Collateral Amount</label>
            <div className="flex items-center mb-2">
              <input
                type="range"
                name="amount"
                min="50"
                max="5000"
                step="50"
                value={formData.amount}
                onChange={handleSliderChange}
                className="w-full mr-4"
                disabled={isLoading}
              />
              <span className="text-lg font-semibold">${formData.amount}</span>
            </div>
            <div className="flex items-center">
              <div className="relative flex-grow mr-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  name="amountInput"
                  min="50"
                  max="5000"
                  step="50"
                  value={formData.amount}
                  onChange={handleSliderChange}
                  className="w-full mr-4"
                  disabled={isLoading}
                />
                <span className="text-lg font-semibold">${formData.amount}</span>
              </div>
              <div className="flex items-center">
                <div className="relative flex-grow mr-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="amountInput"
                    min="50"
                    max="5000"
                    step="50"
                    value={amountInput}
                    onChange={handleInputChange}
                    onBlur={applyAmount}
                    className="bg-gray-700 w-full p-2 pl-7 rounded-md"
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="button"
                  onClick={applyAmount}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md"
                  disabled={isLoading}
                >
                  Set
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Minimum deposit: $50 | Maximum: $5,000
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">NFT Metadata URI (optional)</label>
              <input
                type="text"
                name="tokenURI"
                value={formData.tokenURI}
                onChange={(e) => setFormData({...formData, tokenURI: e.target.value})}
                placeholder="ipfs://..."
                className="bg-gray-700 w-full p-2 rounded-md"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-400 mt-1">
                IPFS URI for your NFT metadata (leave as is if unsure)
              </p>
            </div>
            
            <div className="p-4 bg-gray-700 rounded-md mb-6">
              <h3 className="font-semibold mb-2">Loan Summary</h3>
              <div className="flex justify-between mb-1">
                <span>Loan/Collateral Amount:</span>
                <span>${formData.amount}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Term:</span>
                <span>12 months (fixed)</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>APR:</span>
                <span>8%</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Monthly Payment:</span>
                <span>${monthlyPayment}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Repayment:</span>
                <span>${totalRepayment}</span>
              </div>
            </div>
            
            {!isApproved ? (
              <button
                type="button"
                onClick={handleApprove}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 mb-4"
                disabled={isLoading}
              >
                {isLoading || contractLoading ? "Processing..." : "Approve Stablecoin"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
                disabled={isLoading}
              >
                {isLoading || contractLoading ? "Processing..." : "Create Credit Builder Loan"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 z-10 border border-gray-700 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-300 mb-6">
                Your Credit Builder Loan application for ${formData.amount} has been successfully submitted.
                Your loan will be processed shortly.
              </p>
              <div className="p-4 bg-gray-700 rounded-md mb-6 text-left">
                <div className="flex justify-between mb-1">
                  <span>Transaction Hash:</span>
                  <span className="text-blue-400 truncate">
                    {txHash ? (txHash.substring(0, 6) + '...' + txHash.substring(txHash.length - 4)) : 'Processing...'}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Collateral Amount:</span>
                  <span>${formData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span>${monthlyPayment}</span>
                </div>
              </div>
              <button
                onClick={handleReturnToDashboard}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCreditBuilderLoan;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';
import { useContract } from '../utils/ContractContext';
import * as contractService from '../utils/contractService';
import { appKit } from '../config/AppKit';
import type { LoanFormData } from '../types';

const CreateCreditBuilderLoan: React.FC = () => {
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
  const [formData, setFormData] = useState<LoanFormData>({
    stablecoin: "",
    amount: 500,
    term: "12",
    tokenURI: "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  });
  
  const [amountInput, setAmountInput] = useState<number>(formData.amount);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const [localError, setLocalError] = useState<string>('');
  
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
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    setFormData({
      ...formData,
      amount: value
    });
    setAmountInput(value);
  };
  
  // Handle direct input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmountInput(parseInt(e.target.value) || 0);
  };
  
  // Apply input value to the form data
  const applyAmount = (): void => {
    const value = Math.min(5000, Math.max(50, amountInput || 50));
    setFormData({
      ...formData,
      amount: value
    });
    setAmountInput(value);
  };
  
  // Handle approval action
  const handleApprove = async (): Promise<void> => {
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
    } catch (error: unknown) {
      console.error('Error in approval process:', error);
      const errorMessage = error instanceof Error ? error.message : 'Approval failed. Please try again.';
      setLocalError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle loan creation
  const handleSubmit = async (): Promise<void> => {
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
        formData.tokenURI || "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
      );
      
      if (result.success) {
        setTxHash(result.txHash || '');
        setShowSuccessModal(true);
      } else {
        setLocalError(result.error || 'Failed to create loan. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Error creating loan:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create loan. Please try again.';
      setLocalError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle returning to dashboard
  const handleReturnToDashboard = (): void => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };
  
  // Simple calculation for display
  const calculateMonthlyPayment = (amount: number): string => {
    const principal = amount;
    const monthlyRate = 8 / (12 * 100); // 8% APR
    const term = 12; // 12 months
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    return payment.toFixed(2);
  };

  const monthlyPayment = calculateMonthlyPayment(formData.amount);
  const totalRepayment = (parseFloat(monthlyPayment) * 12).toFixed(2);  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Create Your Credit Builder Loan</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Build your credit score with a secured loan. Deposit collateral, make monthly payments, and watch your credit grow.
        </p>
      </div>
      
      {(contractError || localError) && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6 flex items-center">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {contractError || localError}
        </div>
      )}
      
      {!isConnected ? (
        <div className="bg-[#1a093a] rounded-xl p-8 text-center border border-gray-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-white">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">Connect your wallet to create a credit builder loan and start building your credit.</p>
          <button 
            onClick={() => {
              if (appKit && appKit.open) {
                appKit.open();
              }
            }}
            className="bg-button-gradient text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a093a] rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Loan Configuration
              </h2>
              
              {/* Stablecoin Selection */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-3">Choose Your Collateral Currency</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {approvedStablecoins.length === 0 ? (
                    <div className="col-span-full bg-gray-700/50 p-4 rounded-lg text-center">
                      <div className="animate-spin h-6 w-6 border-2 border-purple-500 rounded-full border-t-transparent mx-auto mb-2"></div>
                      <p className="text-gray-400">Loading available currencies...</p>
                    </div>
                  ) : (
                    approvedStablecoins.map((coin: string) => (
                      <div
                        key={coin}
                        onClick={() => setFormData({...formData, stablecoin: coin})}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.stablecoin === coin
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            formData.stablecoin === coin ? 'border-purple-500 bg-purple-500' : 'border-gray-400'
                          }`}>
                            {formData.stablecoin === coin && (
                              <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
                            )}
                          </div>
                          <span className="font-medium text-white">{stablecoinNames[coin] || coin}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-3">Collateral Amount</label>
                <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">Amount</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">${formData.amount}</div>
                      <div className="text-sm text-gray-400">Collateral & Loan Amount</div>
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={formData.amount}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mb-4"
                    disabled={isLoading}
                  />
                  
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>$50</span>
                    <span>$5,000</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        min="50"
                        max="5000"
                        step="50"
                        value={amountInput}
                        onChange={handleInputChange}
                        onBlur={applyAmount}
                        className="bg-gray-700 w-full p-3 pl-8 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                        disabled={isLoading}
                        placeholder="Enter amount"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={applyAmount}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
                      disabled={isLoading}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="mb-8">
                <p className="text-gray-300 mb-3">Quick Select:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 2000, 5000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setFormData({...formData, amount});
                        setAmountInput(amount);
                      }}
                      className={`p-3 rounded-lg border-2 transition ${
                        formData.amount === amount
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
                      }`}
                      disabled={isLoading}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isApproved ? (
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isLoading || !formData.stablecoin || !formData.amount}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                        Approving...
                      </>
                    ) : (
                      <>
                        <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
                        Approve {stablecoinNames[formData.stablecoin] || 'Stablecoin'}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.stablecoin || !formData.amount}
                    className="w-full bg-button-gradient hover:opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                        Creating Loan...
                      </>
                    ) : (
                      <>
                        <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
                        Create Credit Builder Loan
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* How it Works */}
            <div className="bg-[#1a093a] rounded-xl p-6 border border-gray-700 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How It Works
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <div>
                    <p className="text-white font-medium">Deposit Collateral</p>
                    <p className="text-gray-400">Your deposit secures the loan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <div>
                    <p className="text-white font-medium">Make Payments</p>
                    <p className="text-gray-400">12 monthly payments build credit</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <div>
                    <p className="text-white font-medium">Get Collateral Back</p>
                    <p className="text-gray-400">Plus improved credit score</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-[#1a093a] rounded-xl p-6 border border-gray-700 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 text-white">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Collateral Amount</span>
                  <span className="text-white font-semibold">${formData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Loan Term</span>
                  <span className="text-white font-semibold">12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Interest Rate</span>
                  <span className="text-white font-semibold">8% APR</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between">
                  <span className="text-gray-300">Monthly Payment</span>
                  <span className="text-white font-bold">${monthlyPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Repayment</span>
                  <span className="text-white font-bold">${totalRepayment}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-purple-200 text-sm">
                  💡 Your collateral will be returned after completing all 12 payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-[#1a093a] rounded-xl p-8 max-w-md w-full mx-4 z-10 border border-gray-700 shadow-2xl">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 border-2 border-green-500 mb-6">
                <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Loan Created Successfully! 🎉</h3>
              <p className="text-gray-300 mb-6">
                Your Credit Builder Loan for <span className="font-semibold text-white">${formData.amount}</span> has been created. 
                Start making payments to build your credit score!
              </p>
              
              {/* Transaction Details */}
              <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-600">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction:</span>
                    <span className="text-purple-400 font-mono">
                      {txHash ? `${txHash.substring(0, 8)}...${txHash.substring(txHash.length - 6)}` : 'Processing...'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collateral:</span>
                    <span className="text-white font-semibold">${formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Payment:</span>
                    <span className="text-white font-semibold">${monthlyPayment}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleReturnToDashboard}
                className="w-full bg-button-gradient hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCreditBuilderLoan;
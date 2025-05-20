import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import * as contractService from './contractService';

// Create context
const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const { address, isConnected } = useAppKitAccount();
  const [creditScore, setCreditScore] = useState(0);
  const [loanDetails, setLoanDetails] = useState(null);
  const [approvedStablecoins, setApprovedStablecoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stablecoinNames, setStablecoinNames] = useState({});

  // Fetch contract data when wallet is connected
  useEffect(() => {
    const fetchContractData = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get approved stablecoins
        const stablecoins = await contractService.getApprovedStablecoins();
        setApprovedStablecoins(stablecoins);

        // Create a mapping of stablecoin addresses to names
        const names = {};
        stablecoins.forEach((addr) => {
          names[addr] = contractService.getStablecoinName(addr);
        });
        setStablecoinNames(names);

        // Check if we're using mock data
        const usingMockData = import.meta.env.VITE_CONTRACT_ADDRESS?.includes('0x123456789') || 
                              !import.meta.env.VITE_CONTRACT_ADDRESS;
        
        // For mock data, check localStorage first
        if (usingMockData) {
          // Check if there's a stored credit score, otherwise use default
          const storedCreditScore = localStorage.getItem(`creditScore_${address}`);
          setCreditScore(storedCreditScore ? parseInt(storedCreditScore) : 550); // Use 550 as baseline if no score exists
          
          // Check for mock loan in localStorage
          const storedLoan = localStorage.getItem(`mockLoan_${address}`);
          if (storedLoan) {
            try {
              const parsedLoan = JSON.parse(storedLoan);
              // Convert date strings back to Date objects
              parsedLoan.startDate = new Date(parsedLoan.startDate);
              parsedLoan.nextPaymentDue = new Date(parsedLoan.nextPaymentDue);
              setLoanDetails(parsedLoan);
              console.log('Loaded mock loan from localStorage:', parsedLoan);
            } catch (parseError) {
              console.error('Error parsing stored loan:', parseError);
              setLoanDetails(null);
            }
          } else {
            setLoanDetails(null);
          }
        } else {
          // For real blockchain data, get credit score and loan details in parallel
          try {
            const [score, loan] = await Promise.allSettled([
              contractService.getCreditScore(address),
              contractService.getLoanDetails(address)
            ]);

            if (score.status === 'fulfilled') {
              setCreditScore(score.value);
            }

            if (loan.status === 'fulfilled') {
              setLoanDetails(loan.value);
            } else {
              // It's okay if the user doesn't have a loan
              console.log('No active loan found for user');
              setLoanDetails(null);
            }
          } catch (dataError) {
            console.warn('Error fetching user data:', dataError);
            // Don't set error here, as we still have stablecoins data
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching contract data:', err);
        setError('Failed to load blockchain data. Please try again later.');
        setLoading(false);
      }
    };

    fetchContractData();
  }, [isConnected, address]);

  // Approve stablecoin for spending
  const approveStablecoin = async (stablecoinAddress, amount) => {
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contractService.approveStablecoin(stablecoinAddress, amount);
      await tx.wait();
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error approving stablecoin:', err);
      setError('Failed to approve stablecoin. Please try again.');
      setLoading(false);
      return false;
    }
  };

  // Create credit builder loan
  const createLoan = async (stablecoinAddress, amount, tokenURI) => {
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contractService.createCreditBuilderLoan(stablecoinAddress, amount, tokenURI);
      await tx.wait();
      
      // Check if we're using mock data
      const usingMockData = import.meta.env.VITE_CONTRACT_ADDRESS?.includes('0x123456789') || 
                          !import.meta.env.VITE_CONTRACT_ADDRESS;
      
      if (usingMockData) {
        // Create mock loan data for development
        const now = new Date();
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        const mockLoan = {
          borrower: address,
          stablecoin: stablecoinAddress,
          loanAmount: amount.toString(),
          collateralAmount: amount.toString(),
          monthlyPaymentAmount: (parseFloat(amount) * 0.09 / 12).toFixed(2),
          startDate: now,
          nextPaymentDue: nextMonth,
          totalPaid: '0',
          remainingPayments: 12,
          nftId: Math.floor(Math.random() * 1000),
          active: true,
          completed: false,
          paymentCount: 0,
          loanCompletion: 0 // Initialize loan completion at 0%
        };
        
        // Set initial credit score to 550 when loan is created
        localStorage.setItem(`creditScore_${address}`, '550');
        setCreditScore(550);
        
        // Store in localStorage for persistence
        localStorage.setItem(`mockLoan_${address}`, JSON.stringify(mockLoan));
        
        // Update state
        setLoanDetails(mockLoan);
        setLoading(false);
        return { success: true, txHash: tx.hash };
      }
      
      // For real blockchain interaction
      try {
        // Refresh loan details
        const loan = await contractService.getLoanDetails(address);
        setLoanDetails(loan);
      } catch (loanError) {
        console.warn('Error fetching loan after creation:', loanError);
        // Don't fail the whole operation if we can't fetch the loan
      }
      
      setLoading(false);
      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error creating loan:', err);
      setError('Failed to create loan. Please try again.');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Make a payment
  const makePayment = async () => {
    if (!address) return { success: false, error: 'Wallet not connected' };
    
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contractService.makePayment(address);
      await tx.wait();
      
      // For mock data, update the loan details and credit score manually
      const usingMockData = import.meta.env.VITE_CONTRACT_ADDRESS?.includes('0x123456789') || 
                           !import.meta.env.VITE_CONTRACT_ADDRESS;
      
      if (usingMockData && loanDetails) {
        // Update the mock loan
        const updatedLoan = { ...loanDetails };
        updatedLoan.paymentCount += 1;
        updatedLoan.remainingPayments -= 1;
        
        // Calculate total paid
        const monthlyPayment = parseFloat(updatedLoan.monthlyPaymentAmount);
        updatedLoan.totalPaid = (parseFloat(updatedLoan.totalPaid) + monthlyPayment).toString();
        
        // Update next payment due date
        const nextMonth = new Date(updatedLoan.nextPaymentDue);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        updatedLoan.nextPaymentDue = nextMonth;
        
        // Calculate loan completion percentage (0-100%)
        updatedLoan.loanCompletion = Math.round((updatedLoan.paymentCount / 12) * 100);
        
        // Update credit score - increase by 20-30 points per payment
        const currentScore = parseInt(localStorage.getItem(`creditScore_${address}`) || '550');
        const scoreIncrease = Math.floor(Math.random() * 11) + 20; // Random increase between 20-30 points
        const newScore = Math.min(currentScore + scoreIncrease, 850); // Cap at 850
        
        localStorage.setItem(`creditScore_${address}`, newScore.toString());
        localStorage.setItem(`mockLoan_${address}`, JSON.stringify(updatedLoan));
        
        // Update state
        setLoanDetails(updatedLoan);
        setCreditScore(newScore);
      } else {
        // Refresh loan details for real blockchain interaction
        const loan = await contractService.getLoanDetails(address);
        setLoanDetails(loan);
        
        // Refresh credit score
        const score = await contractService.getCreditScore(address);
        setCreditScore(score);
      }
      
      setLoading(false);
      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error making payment:', err);
      setError('Failed to make payment. Please try again.');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Refresh all data
  const refreshData = async () => {
    if (!isConnected || !address) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Refresh stablecoins first
      try {
        const stablecoins = await contractService.getApprovedStablecoins();
        setApprovedStablecoins(stablecoins);
        
        // Update stablecoin names
        const names = {};
        stablecoins.forEach((addr) => {
          names[addr] = contractService.getStablecoinName(addr);
        });
        setStablecoinNames(names);
      } catch (stablecoinError) {
        console.warn('Error refreshing stablecoins:', stablecoinError);
        // Don't set the main error yet, try to get other data
      }
      
      // Get credit score and loan details in parallel
      try {
        const [score, loan] = await Promise.allSettled([
          contractService.getCreditScore(address),
          contractService.getLoanDetails(address)
        ]);

        if (score.status === 'fulfilled') {
          setCreditScore(score.value);
        }

        if (loan.status === 'fulfilled') {
          setLoanDetails(loan.value);
        } else {
          // It's okay if the user doesn't have a loan
          console.log('No active loan found for user');
          setLoanDetails(null);
        }
        
        // Clear any error since we got some data
        setError(null);
      } catch (dataError) {
        console.warn('Error fetching user data:', dataError);
        // Only set error if we haven't gotten any stablecoins either
        if (approvedStablecoins.length === 0) {
          setError('Failed to refresh data. Please try again.');
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error refreshing all data:', err);
      setError('Failed to refresh data. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        creditScore,
        loanDetails,
        approvedStablecoins,
        stablecoinNames,
        loading,
        error,
        approveStablecoin,
        createLoan,
        makePayment,
        refreshData,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook to use the contract context
export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

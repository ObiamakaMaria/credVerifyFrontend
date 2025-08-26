import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import * as contractService from './contractService';
import type { LoanData, ContractResult, StablecoinNames } from '../types';

// Define context type
interface ContractContextType {
  creditScore: number;
  loanDetails: LoanData | null;
  approvedStablecoins: string[];
  loading: boolean;
  error: string | null;
  stablecoinNames: StablecoinNames;
  refreshData: () => Promise<void>;
  createLoan: (stablecoinAddress: string, amount: number, tokenURI: string) => Promise<ContractResult>;
  makePayment: (borrowerAddress: string) => Promise<ContractResult>;
  approveStablecoin: (stablecoinAddress: string, amount: number) => Promise<ContractResult>;
  isStablecoinApproved: (stablecoinAddress: string) => Promise<boolean>;
}

// Create context
const ContractContext = createContext<ContractContextType | undefined>(undefined);

interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const { address, isConnected } = useAppKitAccount();
  const [creditScore, setCreditScore] = useState<number>(0);
  const [loanDetails, setLoanDetails] = useState<LoanData | null>(null);
  const [approvedStablecoins, setApprovedStablecoins] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stablecoinNames, setStablecoinNames] = useState<StablecoinNames>({});

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
        const names: StablecoinNames = {};
        stablecoins.forEach((addr: string) => {
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
  const approveStablecoin = async (stablecoinAddress: string, amount: number): Promise<ContractResult> => {
    if (!address) {
      return { success: false, error: 'Wallet not connected' };
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Approving stablecoin:', { stablecoinAddress, amount });
      
      const result = await contractService.approveStablecoin(stablecoinAddress, amount);
      
      if (result.success) {
        console.log('Stablecoin approved successfully:', result.txHash);
      } else {
        console.error('Stablecoin approval failed:', result.error);
      }
      
      setLoading(false);
      return result;
    } catch (err) {
      console.error('Error approving stablecoin:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve stablecoin. Please try again.';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Create credit builder loan
  const createLoan = async (stablecoinAddress: string, amount: number, tokenURI: string): Promise<ContractResult> => {
    if (!address) {
      return { success: false, error: 'Wallet not connected' };
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Creating loan with parameters:', { stablecoinAddress, amount, tokenURI });
      
      const result = await contractService.createCreditBuilderLoan(stablecoinAddress, amount, tokenURI);
      
      if (!result.success) {
        setLoading(false);
        return result;
      }

      // Check if we're using mock data or real blockchain
      const usingMockData = !import.meta.env.VITE_CONTRACT_ADDRESS || 
                          import.meta.env.VITE_CONTRACT_ADDRESS.includes('0x123456789');
      
      if (usingMockData) {
        // Create mock loan data for development
        const now = new Date();
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        const mockLoan: LoanData = {
          active: true,
          amount: amount.toString(),
          stablecoin: stablecoinAddress,
          monthlyPayment: (amount * 0.09 / 12).toFixed(2),
          paymentsRemaining: 12,
          totalPayments: 12,
          nextPaymentDue: nextMonth.toISOString(),
          collateralAmount: (amount * 1.5).toString(),
          borrower: address,
          loanAmount: amount.toString(),
          monthlyPaymentAmount: (amount * 0.09 / 12).toFixed(2),
          startDate: now,
          totalPaid: '0',
          paymentCount: 0,
          remainingPayments: 12,
          loanCompletion: 0,
          term: 12
        };
        
        // Set initial credit score to 550 when loan is created
        localStorage.setItem(`creditScore_${address}`, '550');
        setCreditScore(550);
        
        // Store in localStorage for persistence
        localStorage.setItem(`mockLoan_${address}`, JSON.stringify(mockLoan));
        
        // Update state
        setLoanDetails(mockLoan);
        
        console.log('Mock loan created successfully:', mockLoan);
      } else {
        // For real blockchain interaction, fetch updated loan details
        try {
          const loan = await contractService.getLoanDetails(address);
          setLoanDetails(loan);
          
          // Also update credit score
          const score = await contractService.getCreditScore(address);
          setCreditScore(score);
          
          console.log('Real loan created successfully, updated data:', { loan, score });
        } catch (loanError) {
          console.warn('Error fetching loan after creation:', loanError);
          // Don't fail the whole operation if we can't fetch the loan immediately
        }
      }
      
      setLoading(false);
      return { success: true, txHash: result.txHash };
    } catch (err) {
      console.error('Error creating loan:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create loan. Please try again.';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Make a payment
  const makePayment = async () => {
    if (!address) return { success: false, error: 'Wallet not connected' };
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Making payment for borrower:', address);
      
      const result = await contractService.makePayment(address);
      
      if (!result.success) {
        setLoading(false);
        return result;
      }
      
      // For mock data, update the loan details and credit score manually
      const usingMockData = !import.meta.env.VITE_CONTRACT_ADDRESS || 
                           import.meta.env.VITE_CONTRACT_ADDRESS.includes('0x123456789');
      
      if (usingMockData && loanDetails) {
        // Update the mock loan
        const updatedLoan = { ...loanDetails };
        updatedLoan.paymentCount = (updatedLoan.paymentCount || 0) + 1;
        updatedLoan.remainingPayments = (updatedLoan.remainingPayments || 12) - 1;
        
        // Calculate total paid
        const monthlyPayment = parseFloat(updatedLoan.monthlyPaymentAmount || '0');
        updatedLoan.totalPaid = (parseFloat(updatedLoan.totalPaid || '0') + monthlyPayment).toString();
        
        // Update next payment due date
        const nextMonth = new Date(updatedLoan.nextPaymentDue);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        updatedLoan.nextPaymentDue = nextMonth.toISOString();
        
        // Calculate loan completion percentage (0-100%)
        updatedLoan.loanCompletion = Math.round(((updatedLoan.paymentCount || 0) / 12) * 100);
        
        // Update credit score - increase by 20-30 points per payment
        const currentScore = parseInt(localStorage.getItem(`creditScore_${address}`) || '550');
        const scoreIncrease = Math.floor(Math.random() * 11) + 20; // Random increase between 20-30 points
        const newScore = Math.min(currentScore + scoreIncrease, 850); // Cap at 850
        
        localStorage.setItem(`creditScore_${address}`, newScore.toString());
        localStorage.setItem(`mockLoan_${address}`, JSON.stringify(updatedLoan));
        
        // Update state
        setLoanDetails(updatedLoan);
        setCreditScore(newScore);
        
        console.log('Mock payment processed successfully:', { updatedLoan, newScore });
      } else {
        // Refresh loan details for real blockchain interaction
        try {
          const loan = await contractService.getLoanDetails(address);
          setLoanDetails(loan);
          
          // Refresh credit score
          const score = await contractService.getCreditScore(address);
          setCreditScore(score);
          
          console.log('Real payment processed successfully, updated data:', { loan, score });
        } catch (refreshError) {
          console.warn('Error refreshing data after payment:', refreshError);
        }
      }
      
      setLoading(false);
      return { success: true, txHash: result.txHash };
    } catch (err) {
      console.error('Error making payment:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to make payment. Please try again.';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
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
        const names: StablecoinNames = {};
        stablecoins.forEach((addr: string) => {
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

  // Check if stablecoin is approved
  const isStablecoinApproved = async (stablecoinAddress: string): Promise<boolean> => {
    try {
      return await contractService.isStablecoinApproved(stablecoinAddress);
    } catch (error) {
      console.error('Error checking stablecoin approval:', error);
      return false;
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
        isStablecoinApproved,
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

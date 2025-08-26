import { ethers } from 'ethers';
import CredVerifyABI from '../abis/CredVerify.json';
import ERC20ABI from '../abis/ERC20.json';
import type { ContractResult, StablecoinNames } from '../types';

// Mock stablecoins for development/testing
const MOCK_STABLECOINS: string[] = [
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'  // USDT
];

const MOCK_STABLECOIN_NAMES: StablecoinNames = {
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'USDC',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'USDT'
};

// Contract address configuration
const CRED_VERIFY_CONTRACT_ADDRESS: string = '0x22ee52A264e34cD11c709526Ffef469dce2fFa95';

/**
 * Get the signer from the connected wallet
 */
export const getSigner = async (): Promise<ethers.Signer> => {
  try {
    // Check if window.ethereum is available (MetaMask or other injected wallet)
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      return signer;
    }
    
    throw new Error('No wallet provider available. Please connect your wallet.');
  } catch (error) {
    console.error('Error getting signer:', error);
    throw error;
  }
};

/**
 * Get the contract instance
 */
export const getCredVerifyContract = async (): Promise<ethers.Contract> => {
  try {
    if (!CRED_VERIFY_CONTRACT_ADDRESS || CRED_VERIFY_CONTRACT_ADDRESS.includes('0x123456789')) {
      throw new Error('Contract address not properly configured. Please set the correct contract address.');
    }
    
    const signer = await getSigner();
    return new ethers.Contract(CRED_VERIFY_CONTRACT_ADDRESS, CredVerifyABI, signer);
  } catch (error) {
    console.error('Error getting contract:', error);
    throw error;
  }
};

/**
 * Get ERC20 contract instance
 */
export const getERC20Contract = async (tokenAddress: string): Promise<ethers.Contract> => {
  try {
    const signer = await getSigner();
    return new ethers.Contract(tokenAddress, ERC20ABI, signer);
  } catch (error) {
    console.error('Error getting ERC20 contract:', error);
    throw error;
  }
};

/**
 * Get approved stablecoins (mock for now)
 */
export const getApprovedStablecoins = async (): Promise<string[]> => {
  try {
    return MOCK_STABLECOINS;
  } catch (error) {
    console.error('Error getting approved stablecoins:', error);
    return [];
  }
};

/**
 * Get stablecoin names
 */
export const getStablecoinNames = (): StablecoinNames => {
  return MOCK_STABLECOIN_NAMES;
};

/**
 * Get stablecoin name by address
 */
export const getStablecoinName = (address: string): string => {
  return MOCK_STABLECOIN_NAMES[address] || 'Unknown Token';
};

/**
 * Get credit score for a borrower
 */
export const getCreditScore = async (borrowerAddress: string): Promise<number> => {
  try {
    const contract = await getCredVerifyContract();
    const score = await contract.getCreditScore(borrowerAddress);
    return Number(score);
  } catch (error) {
    console.error('Error getting credit score:', error);
    // Return mock score for development
    return 750;
  }
};

/**
 * Get loan details for a borrower
 */
export const getLoanDetails = async (borrowerAddress: string): Promise<any> => {
  try {
    const contract = await getCredVerifyContract();
    const loan = await contract.loans(borrowerAddress);
    
    if (!loan.active) {
      return null;
    }
    
    return {
      active: loan.active,
      stablecoin: loan.stablecoin,
      loanAmount: ethers.formatUnits(loan.loanAmount, 18),
      collateralAmount: ethers.formatUnits(loan.collateralAmount, 18),
      monthlyPaymentAmount: ethers.formatUnits(loan.monthlyPaymentAmount, 18),
      term: Number(loan.term),
      paymentsRemaining: Number(loan.paymentsRemaining),
      totalPaid: ethers.formatUnits(loan.totalPaid, 18),
      createdAt: new Date(Number(loan.createdAt) * 1000),
      nextPaymentDue: new Date(Number(loan.nextPaymentDue) * 1000),
    };
  } catch (error) {
    console.error('Error getting loan details:', error);
    return null;
  }
};

/**
 * Approve stablecoin for spending by the contract
 */
export const approveStablecoin = async (stablecoinAddress: string, amount: number): Promise<ContractResult> => {
  try {
    const erc20Contract = await getERC20Contract(stablecoinAddress);
    
    // Convert amount to wei (assuming 18 decimals)
    const amountInWei = ethers.parseUnits(amount.toString(), 18);
    
    // Execute approval
    const tx = await erc20Contract.approve(CRED_VERIFY_CONTRACT_ADDRESS, amountInWei);
    console.log('Approval transaction:', tx.hash);
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Approval confirmed:', receipt);
    
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error approving stablecoin:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Create a credit builder loan
 */
export const createCreditBuilderLoan = async (stablecoinAddress: string, amount: number, tokenURI: string): Promise<ContractResult> => {
  try {
    const contract = await getCredVerifyContract();
    
    // Convert amount to wei (assuming 18 decimals)
    const amountInWei = ethers.parseUnits(amount.toString(), 18);
    
    // Create the loan
    const tx = await contract.createCreditBuilderLoan(
      stablecoinAddress,
      amountInWei,
      tokenURI
    );
    
    console.log('Loan creation transaction:', tx.hash);
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Loan creation confirmed:', receipt);
    
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error creating credit builder loan:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Make a payment on an existing loan
 */
export const makePayment = async (borrowerAddress: string): Promise<ContractResult> => {
  try {
    const contract = await getCredVerifyContract();
    const tx = await contract.makePayment(borrowerAddress);
    
    console.log('Payment transaction:', tx.hash);
    const receipt = await tx.wait();
    console.log('Payment confirmed:', receipt);
    
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error('Error making payment:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Check if stablecoin is approved for spending
 */
export const isStablecoinApproved = async (stablecoinAddress: string): Promise<boolean> => {
  try {
    const erc20Contract = await getERC20Contract(stablecoinAddress);
    const signer = await getSigner();
    const userAddress = await signer.getAddress();
    
    const allowance = await erc20Contract.allowance(userAddress, CRED_VERIFY_CONTRACT_ADDRESS);
    return BigInt(allowance) > 0n;
  } catch (error) {
    console.error('Error checking approval:', error);
    return false;
  }
};

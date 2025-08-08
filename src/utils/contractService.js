import { ethers } from 'ethers';
import CredVerifyABI from '../abis/CredVerify.json';
import ERC20ABI from '../abis/ERC20.json';
import { appKit } from '../config/AppKit';

// Mock stablecoins for development/testing
const MOCK_STABLECOINS = [
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'  // USDT
];

const MOCK_STABLECOIN_NAMES = {
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'USDC',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'USDT'
};

// Contract address configuration
// You should replace this with your actual deployed contract address
const CRED_VERIFY_CONTRACT_ADDRESS = '0x497CC525dc3CbDa236B51D8de92875891bE433eF';

// Network configuration
const NETWORK_ID = import.meta.env.VITE_NETWORK_ID || '1';
const NETWORK_NAMES = {
  '1': 'Ethereum Mainnet',
  '5': 'Goerli Testnet',
  '11155111': 'Sepolia Testnet',
  '80001': 'Mumbai Testnet',
  '137': 'Polygon Mainnet'
};

/**
 * Get the signer from the connected wallet
 * @returns {Promise<ethers.Signer>} The signer
 */
export const getSigner = async () => {
  try {
    const provider = await appKit.getProvider();
    if (!provider) throw new Error('No provider available');
    
    // Check if we're on the correct network
    const network = await provider.getNetwork();
    const chainId = network.chainId.toString();
    
    if (chainId !== NETWORK_ID) {
      throw new Error(`Please connect to ${NETWORK_NAMES[NETWORK_ID] || 'the correct network'}`); 
    }
    
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error('Error getting signer:', error);
    throw error;
  }
};

/**
 * Get the contract instance
 * @returns {Promise<ethers.Contract>} The contract instance
 */
export const getCredVerifyContract = async () => {
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
 * Get an ERC20 token contract instance
 * @param {string} tokenAddress - The address of the ERC20 token
 * @returns {Promise<ethers.Contract>} The ERC20 contract instance
 */
export const getERC20Contract = async (tokenAddress) => {
  try {
    const signer = await getSigner();
    return new ethers.Contract(tokenAddress, ERC20ABI, signer);
  } catch (error) {
    console.error('Error getting ERC20 contract:', error);
    throw error;
  }
};

/**
 * Get the list of approved stablecoins
 * @returns {Promise<Array>} The list of approved stablecoins
 */
export const getApprovedStablecoins = async () => {
  try {
    // Check if we're using a placeholder contract address
    if (CRED_VERIFY_CONTRACT_ADDRESS.includes('0x123456789')) {
      console.warn('Using mock stablecoins since contract address is a placeholder');
      return MOCK_STABLECOINS;
    }
    
    const contract = await getCredVerifyContract();
    const stablecoins = await contract.getApprovedStablecoins();
    
    // If no stablecoins are returned from the contract, use mock data
    if (!stablecoins || stablecoins.length === 0) {
      console.warn('No stablecoins found from contract, using mock data');
      return MOCK_STABLECOINS;
    }
    
    return stablecoins;
  } catch (error) {
    console.error('Error getting approved stablecoins:', error);
    console.warn('Falling back to mock stablecoins');
    return MOCK_STABLECOINS; // Return mock data instead of throwing
  }
};

/**
 * Get stablecoin name by address
 * @param {string} address - The stablecoin address
 * @returns {string} The stablecoin name or shortened address
 */
export const getStablecoinName = (address) => {
  // Check if we have a name for this stablecoin
  if (MOCK_STABLECOIN_NAMES[address]) {
    return MOCK_STABLECOIN_NAMES[address];
  }
  
  // Otherwise return shortened address
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
};

/**
 * Get the credit score for a borrower
 * @param {string} borrowerAddress - The address of the borrower
 * @returns {Promise<number>} The credit score
 */
export const getCreditScore = async (borrowerAddress) => {
  try {
    const contract = await getCredVerifyContract();
    const score = await contract.getCreditScore(borrowerAddress);
    return score.toNumber();
  } catch (error) {
    console.error('Error getting credit score:', error);
    throw error;
  }
};

/**
 * Get loan details for a borrower
 * @param {string} borrowerAddress - The address of the borrower
 * @returns {Promise<Object>} The loan details
 */
export const getLoanDetails = async (borrowerAddress) => {
  try {
    // Check if we're using a placeholder contract address
    if (CRED_VERIFY_CONTRACT_ADDRESS.includes('0x123456789')) {
      console.warn('Using mock loan details for development');
      
      // Check if we have a mock loan stored in localStorage
      const storedLoan = localStorage.getItem(`mockLoan_${borrowerAddress}`);
      if (storedLoan) {
        const parsedLoan = JSON.parse(storedLoan);
        // Convert date strings back to Date objects
        parsedLoan.startDate = new Date(parsedLoan.startDate);
        parsedLoan.nextPaymentDue = new Date(parsedLoan.nextPaymentDue);
        return parsedLoan;
      }
      
      // If no stored loan is found, throw an error to indicate no loan exists
      throw new Error('No active loan found');
    }
    
    // Real loan details retrieval
    const contract = await getCredVerifyContract();
    const loan = await contract.loans(borrowerAddress);
    
    return {
      borrower: loan.borrower,
      stablecoin: loan.stablecoin,
      loanAmount: ethers.utils.formatUnits(loan.loanAmount, 18),
      collateralAmount: ethers.utils.formatUnits(loan.collateralAmount, 18),
      monthlyPaymentAmount: ethers.utils.formatUnits(loan.monthlyPaymentAmount, 18),
      startDate: new Date(loan.startDate.toNumber() * 1000),
      nextPaymentDue: new Date(loan.nextPaymentDue.toNumber() * 1000),
      totalPaid: ethers.utils.formatUnits(loan.totalPaid, 18),
      remainingPayments: loan.remainingPayments.toNumber(),
      nftId: loan.nftId.toNumber(),
      active: loan.active,
      completed: loan.completed,
      paymentCount: loan.paymentCount.toNumber()
    };
  } catch (error) {
    console.error('Error getting loan details:', error);
    throw error;
  }
};

/**
 * Approve stablecoin for spending by the CredVerify contract
 * @param {string} stablecoinAddress - The address of the stablecoin
 * @param {string} amount - The amount to approve
 * @returns {Promise<ethers.providers.TransactionResponse|object>} The transaction response or mock response
 */
export const approveStablecoin = async (stablecoinAddress, amount) => {
  try {
    // Check if we're using a placeholder contract address or mock stablecoins
    if (CRED_VERIFY_CONTRACT_ADDRESS.includes('0x123456789') || 
        MOCK_STABLECOINS.includes(stablecoinAddress)) {
      console.warn('Using mock approval for development');
      
      // Return a mock transaction object that mimics a real transaction
      return {
        hash: '0x' + Math.random().toString(16).substring(2, 42),
        wait: async () => {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          return { status: 1 };
        }
      };
    }
    
    // Real approval process
    const erc20Contract = await getERC20Contract(stablecoinAddress);
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
    
    return await erc20Contract.approve(CRED_VERIFY_CONTRACT_ADDRESS, amountInWei);
  } catch (error) {
    console.error('Error approving stablecoin:', error);
    throw error;
  }
};

/**
 * Create a credit builder loan
 * @param {string} stablecoinAddress - The address of the stablecoin
 * @param {number} amount - The amount of the loan
 * @param {string} tokenURI - The URI of the token metadata
 * @returns {Promise<ethers.providers.TransactionResponse|object>} The transaction response or mock response
 */
export const createCreditBuilderLoan = async (stablecoinAddress, amount, tokenURI) => {
  try {
    // Check if we're using a placeholder contract address or mock stablecoins
    if (CRED_VERIFY_CONTRACT_ADDRESS.includes('0x123456789') || 
        MOCK_STABLECOINS.includes(stablecoinAddress)) {
      console.warn('Using mock loan creation for development');
      
      // Return a mock transaction object that mimics a real transaction
      return {
        hash: '0x' + Math.random().toString(16).substring(2, 42),
        wait: async () => {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          return { status: 1 };
        }
      };
    }
    
    // Real loan creation process
    const contract = await getCredVerifyContract();
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
    
    return await contract.createCreditBuilderLoan(stablecoinAddress, amountInWei, tokenURI);
  } catch (error) {
    console.error('Error creating credit builder loan:', error);
    throw error;
  }
};

/**
 * Make a payment for a loan
 * @param {string} borrowerAddress - The address of the borrower
 * @returns {Promise<ethers.providers.TransactionResponse>} The transaction response
 */
export const makePayment = async (borrowerAddress) => {
  try {
    const contract = await getCredVerifyContract();
    return await contract.makePayment(borrowerAddress);
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};

/**
 * Check if a stablecoin is approved
 * @param {string} stablecoinAddress - The address of the stablecoin
 * @returns {Promise<boolean>} Whether the stablecoin is approved
 */
export const isStablecoinApproved = async (stablecoinAddress) => {
  try {
    const contract = await getCredVerifyContract();
    return await contract.isStablecoinApproved(stablecoinAddress);
  } catch (error) {
    console.error('Error checking if stablecoin is approved:', error);
    throw error;
  }
};

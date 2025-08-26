// Loan-related types
export interface LoanData {
  active: boolean;
  amount: string;
  stablecoin: string;
  monthlyPayment: string;
  paymentsRemaining: number;
  totalPayments: number;
  nextPaymentDue: string;
  collateralAmount: string;
  borrower?: string;
  loanAmount?: string;
  monthlyPaymentAmount?: string;
  startDate?: Date;
  totalPaid?: string;
  paymentCount?: number;
  remainingPayments?: number;
  loanCompletion?: number;
  term?: number;
}

// Form-related types
export interface LoanFormData {
  stablecoin: string;
  amount: number;
  term: string;
  tokenURI?: string;
}

// Contract operation result
export interface ContractResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

// Wallet account type
export interface WalletAccount {
  address: string;
  isConnected: boolean;
}

// Stablecoin names mapping
export interface StablecoinNames {
  [address: string]: string;
}

// UI Component props
export interface CardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface CreditScoreTrendData {
  month: string;
  score: number;
}

export interface PaymentHistoryData {
  month: string;
  amount: number;
  status: 'paid' | 'missed' | 'pending';
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

// Error handling
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// Feature flags or configuration
export interface AppConfig {
  networkId: string;
  contractAddress: string;
  supportedChains: string[];
  features: {
    creditBuilder: boolean;
    paymentHistory: boolean;
    creditScore: boolean;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Credit score related
export interface CreditScoreData {
  score: number;
  grade: string;
  factors: {
    paymentHistory: number;
    creditUtilization: number;
    lengthOfHistory: number;
    creditMix: number;
    newCredit: number;
  };
}

// Transaction related
export interface Transaction {
  hash: string;
  type: 'loan_creation' | 'payment' | 'approval';
  amount?: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

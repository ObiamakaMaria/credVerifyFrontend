// Types communs pour l'application

export interface User {
  id: string;
  name: string;
  email: string;
  walletAddress?: string;
}

export interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  term: number;
  status: 'active' | 'pending' | 'completed' | 'defaulted';
  startDate: Date;
  endDate: Date;
  monthlyPayment: number;
  remainingBalance: number;
}

export interface CreditScore {
  score: number;
  maxScore: number;
  category: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: Date;
}

export interface Payment {
  id: string;
  loanId: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface FinancialOpportunity {
  id: string;
  title: string;
  description: string;
  amount: number;
  interestRate: number;
  term: number;
  requirements: string[];
  isEligible: boolean;
}

// Types pour les contrats Ethereum
export interface ContractConfig {
  address: string;
  abi: any[];
  network: string;
}

// Types pour les composants
export interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

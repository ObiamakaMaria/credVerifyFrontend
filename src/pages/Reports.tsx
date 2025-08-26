import React, { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useContract } from '../utils/ContractContext';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  CreditCard,
  DollarSign,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import CreditScoreTrendChart from '../components/charts/CreditScoreTrendChart';
import PaymentHistoryChart from '../components/charts/PaymentHistoryChart';
import ReportsOverview from '../components/reports/ReportsOverview';

interface ReportMetric {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

interface CreditGoal {
  id: string;
  title: string;
  currentValue: number;
  targetValue: number;
  deadline: Date;
  category: 'credit_score' | 'payment_history' | 'debt_ratio' | 'account_age';
  status: 'on_track' | 'behind' | 'achieved';
}

interface FinancialSummary {
  totalLoaned: number;
  totalPaid: number;
  remainingBalance: number;
  monthlyPayment: number;
  nextPaymentDue: Date;
  paymentsMade: number;
  totalPayments: number;
}

const Reports: React.FC = () => {
  const { address, isConnected } = useAppKitAccount();
  const { creditScore, loanDetails, loading } = useContract();
  const [selectedPeriod, setSelectedPeriod] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('3M');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportMetrics, setReportMetrics] = useState<ReportMetric[]>([]);
  const [creditGoals, setCreditGoals] = useState<CreditGoal[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);

  // Mock data generation
  useEffect(() => {
    if (isConnected && address) {
      // Generate report metrics
      const metrics: ReportMetric[] = [
        {
          label: 'Credit Score',
          value: creditScore,
          change: 25,
          changeType: 'increase',
          icon: <TrendingUp className="w-5 h-5" />,
          color: 'text-green-500'
        },
        {
          label: 'Payment Success Rate',
          value: '100%',
          change: 0,
          changeType: 'increase',
          icon: <Target className="w-5 h-5" />,
          color: 'text-blue-500'
        },
        {
          label: 'On-Time Payments',
          value: loanDetails?.paymentCount || 3,
          change: 1,
          changeType: 'increase',
          icon: <Calendar className="w-5 h-5" />,
          color: 'text-purple-500'
        },
        {
          label: 'Credit Utilization',
          value: '15%',
          change: -5,
          changeType: 'decrease',
          icon: <CreditCard className="w-5 h-5" />,
          color: 'text-orange-500'
        },
        {
          label: 'Total Invested',
          value: `$${loanDetails?.collateralAmount || '750'}`,
          change: 0,
          changeType: 'increase',
          icon: <DollarSign className="w-5 h-5" />,
          color: 'text-green-600'
        },
        {
          label: 'Avg Monthly Payment',
          value: `$${loanDetails?.monthlyPaymentAmount || '65.50'}`,
          change: 0,
          changeType: 'increase',
          icon: <Activity className="w-5 h-5" />,
          color: 'text-indigo-500'
        }
      ];
      setReportMetrics(metrics);

      // Generate credit goals
      const goals: CreditGoal[] = [
        {
          id: '1',
          title: 'Reach 750 Credit Score',
          currentValue: creditScore,
          targetValue: 750,
          deadline: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months from now
          category: 'credit_score',
          status: creditScore >= 750 ? 'achieved' : creditScore >= 700 ? 'on_track' : 'behind'
        },
        {
          id: '2',
          title: 'Complete 12 On-Time Payments',
          currentValue: loanDetails?.paymentCount || 3,
          targetValue: 12,
          deadline: new Date(Date.now() + 9 * 30 * 24 * 60 * 60 * 1000), // 9 months from now
          category: 'payment_history',
          status: (loanDetails?.paymentCount || 3) >= 12 ? 'achieved' : 'on_track'
        },
        {
          id: '3',
          title: 'Maintain <20% Credit Utilization',
          currentValue: 15,
          targetValue: 20,
          deadline: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000), // 1 year from now
          category: 'debt_ratio',
          status: 'achieved'
        }
      ];
      setCreditGoals(goals);

      // Generate financial summary
      if (loanDetails) {
        const summary: FinancialSummary = {
          totalLoaned: parseFloat(loanDetails.collateralAmount || '750'),
          totalPaid: parseFloat(loanDetails.totalPaid || '196.50'),
          remainingBalance: parseFloat(loanDetails.collateralAmount || '750') - parseFloat(loanDetails.totalPaid || '196.50'),
          monthlyPayment: parseFloat(loanDetails.monthlyPaymentAmount || '65.50'),
          nextPaymentDue: new Date(loanDetails.nextPaymentDue || Date.now() + 7 * 24 * 60 * 60 * 1000),
          paymentsMade: loanDetails.paymentCount || 3,
          totalPayments: 12
        };
        setFinancialSummary(summary);
      }
    }
  }, [isConnected, address, creditScore, loanDetails]);

  const generateReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download a PDF report
    console.log('Generating comprehensive credit report...');
    
    setIsGeneratingReport(false);
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-100 text-green-800';
      case 'on_track':
        return 'bg-blue-100 text-blue-800';
      case 'behind':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400">Please connect your wallet to view your credit reports and analytics.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Credit Reports & Analytics</h1>
            <p className="text-gray-400">Track your credit building progress and financial insights</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={generateReport}
              disabled={isGeneratingReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-md transition duration-200"
            >
              {isGeneratingReport ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Report Period</h3>
            <div className="flex bg-gray-700 rounded-lg p-1">
              {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-700 ${metric.color}`}>
                  {metric.icon}
                </div>
                {metric.change !== undefined && (
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.changeType === 'increase' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {Math.abs(metric.change)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-gray-400 text-sm">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Credit Score Trend */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Credit Score Trend</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <CreditScoreTrendChart data={[
              { month: 'Jan', score: 580 },
              { month: 'Feb', score: 620 },
              { month: 'Mar', score: 650 },
              { month: 'Apr', score: 680 },
              { month: 'May', score: 710 },
              { month: 'Jun', score: creditScore }
            ]} />
          </div>

          {/* Payment History */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Payment History</h3>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <PaymentHistoryChart data={[
              { month: 'Jan', amount: 65.50, status: 'paid' },
              { month: 'Feb', amount: 65.50, status: 'paid' },
              { month: 'Mar', amount: 65.50, status: 'paid' },
              { month: 'Apr', amount: 65.50, status: 'pending' }
            ]} />
          </div>
        </div>

        {/* Financial Summary */}
        {financialSummary && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              Financial Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Total Invested</p>
                <p className="text-2xl font-bold text-green-500">${financialSummary.totalLoaned}</p>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-blue-500">${financialSummary.totalPaid}</p>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Remaining Balance</p>
                <p className="text-2xl font-bold text-yellow-500">${financialSummary.remainingBalance.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold text-purple-500">${financialSummary.monthlyPayment}</p>
              </div>
            </div>
            
            {/* Payment Progress */}
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Payment Progress</span>
                <span className="text-white font-medium">
                  {financialSummary.paymentsMade} / {financialSummary.totalPayments} payments
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(financialSummary.paymentsMade / financialSummary.totalPayments) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Next payment due: {financialSummary.nextPaymentDue.toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Credit Goals */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Credit Building Goals
          </h3>
          <div className="space-y-4">
            {creditGoals.map((goal) => (
              <div key={goal.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{goal.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGoalStatusColor(goal.status)}`}>
                    {goal.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">
                    {goal.currentValue} / {goal.targetValue}
                    {goal.category === 'credit_score' ? ' points' : 
                     goal.category === 'payment_history' ? ' payments' : 
                     goal.category === 'debt_ratio' ? '%' : ''}
                  </span>
                  <span className="text-white font-medium">
                    {getProgressPercentage(goal.currentValue, goal.targetValue).toFixed(0)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.status === 'achieved' ? 'bg-green-500' :
                      goal.status === 'on_track' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${getProgressPercentage(goal.currentValue, goal.targetValue)}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-400">
                  Target date: {goal.deadline.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Score Factors Overview */}
        <ReportsOverview />
      </div>
    </div>
  );
};

export default Reports;

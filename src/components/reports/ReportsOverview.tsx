import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CreditFactorsData {
  name: string;
  value: number;
  color: string;
}

interface ReportsOverviewProps {
  creditFactors?: CreditFactorsData[];
}

const ReportsOverview: React.FC<ReportsOverviewProps> = ({ creditFactors }) => {
  const defaultCreditFactors: CreditFactorsData[] = [
    { name: 'Payment History', value: 35, color: '#10B981' },
    { name: 'Credit Utilization', value: 30, color: '#3B82F6' },
    { name: 'Length of Credit History', value: 15, color: '#8B5CF6' },
    { name: 'Credit Mix', value: 10, color: '#F59E0B' },
    { name: 'New Credit', value: 10, color: '#EF4444' }
  ];

  const data = creditFactors || defaultCreditFactors;

  const renderCustomizedLabel = (entry: any) => {
    return `${entry.value}%`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Credit Score Factors</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Details */}
        <div className="space-y-4">
          {data.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: factor.color }}
                ></div>
                <span className="text-white font-medium">{factor.name}</span>
              </div>
              <span className="text-gray-300 font-semibold">{factor.value}%</span>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h4 className="text-blue-300 font-medium mb-2">💡 Improvement Tip</h4>
            <p className="text-gray-300 text-sm">
              Payment history has the biggest impact on your credit score. Keep making on-time payments 
              to see continued improvement in your credit profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsOverview;

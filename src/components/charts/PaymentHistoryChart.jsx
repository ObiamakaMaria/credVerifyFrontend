// src/components/charts/PaymentHistoryChart.jsx
import React from 'react';
import Card from '../cards/Card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const PaymentHistoryChart = ({ data }) => {
  return (
    <Card>
      <h3 className="text-gray-400 text-sm mb-4">Payment History</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <XAxis dataKey="month" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" />
          <Bar dataKey="amount" fill="#48BB78" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-400 text-xs">All transactions</div>
        <div className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default PaymentHistoryChart;
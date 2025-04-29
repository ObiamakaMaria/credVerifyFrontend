// src/components/charts/CreditScoreTrendChart.jsx
import React from 'react';
import Card from '../cards/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const CreditScoreTrendChart = ({ data }) => {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">Credit Score Trend</h3>
        <select className="bg-gray-800 text-gray-400 text-sm rounded p-1">
          <option>Yearly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="year" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" />
          <Line type="monotone" dataKey="score" stroke="#48BB78" strokeWidth={2} fill="#48BB78" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CreditScoreTrendChart;
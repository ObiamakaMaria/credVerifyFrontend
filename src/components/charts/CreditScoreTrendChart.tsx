// src/components/charts/CreditScoreTrendChart.jsx
import React, { useEffect, useState } from 'react';
import Card from '../cards/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useContract } from '../../utils/ContractContext';

const CreditScoreTrendChart = ({ data: initialData }) => {
  const { loanDetails } = useContract();
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Generate chart data based on loan start date
    const generateChartData = () => {
      // If no loan details, use initial data or generate placeholder data
      if (!loanDetails || !loanDetails.startDate) {
        if (initialData && initialData.length > 0) {
          return initialData;
        }
        return generatePlaceholderData();
      }
      
      // Generate data starting from month after loan initiation
      const startDate = new Date(loanDetails.startDate);
      const nextMonth = new Date(startDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      const data = [];
      const baseScore = Math.floor(Math.random() * 100) + 500; // Start with a score between 500-600
      
      // Generate 12 months of data
      for (let i = 0; i < 12; i++) {
        const currentDate = new Date(nextMonth);
        currentDate.setMonth(nextMonth.getMonth() + i);
        
        // Format as "MMM YYYY" (e.g., "Jan 2025")
        const label = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        // Gradually increase score over time (with some randomness)
        const scoreIncrease = Math.floor((i * 25) + (Math.random() * 15 - 5));
        const score = Math.min(850, baseScore + scoreIncrease);
        
        data.push({
          month: label,
          score: score
        });
      }
      
      return data;
    };
    
    // Generate placeholder data if no loan or initial data
    const generatePlaceholderData = () => {
      const data = [];
      const currentDate = new Date();
      const baseScore = 550;
      
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        // Generate a score between 500-850 with an upward trend
        const score = Math.min(850, baseScore + (i * 20) + Math.floor(Math.random() * 30));
        
        data.push({
          month: label,
          score: score
        });
      }
      
      return data;
    };
    
    setChartData(generateChartData());
  }, [loanDetails, initialData]);
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">Credit Score Trend</h3>
        <div className="text-gray-400 text-xs">Projected scores after loan payments</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis 
            dataKey="month" 
            stroke="#A0AEC0" 
            tick={{ fontSize: 10 }}
            interval={1}
          />
          <YAxis 
            stroke="#A0AEC0" 
            domain={[500, 850]}
            ticks={[500, 600, 700, 800, 850]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#2D3748', borderColor: '#4A5568', color: '#E2E8F0' }}
            itemStyle={{ color: '#48BB78' }}
            labelStyle={{ color: '#E2E8F0' }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#48BB78" 
            strokeWidth={2} 
            dot={{ stroke: '#48BB78', strokeWidth: 2, fill: '#1A202C' }}
            activeDot={{ r: 6, stroke: '#48BB78', strokeWidth: 2, fill: '#48BB78' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CreditScoreTrendChart;
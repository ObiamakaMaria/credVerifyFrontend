// src/components/HighlightCard.tsx
import React from 'react';
import Card from './Card';

interface HighlightCardProps {
  date: Date;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ date, title, description, icon }) => {
  // Format date if it's a Date object
  const formatDate = (dateValue: Date): { month: string; year: number } => {
    if (!dateValue) return { month: '', year: 0 };
    
    const month = dateValue.toLocaleString('en-US', { month: 'short' });
    const year = dateValue.getFullYear();
    
    return { month, year };
  };
  
  const { month, year } = formatDate(date);
  
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center">
        {icon && (
          <div className="mr-3 text-blue-400">
            {icon}
          </div>
        )}
        <div>
          <div className="text-blue-400 font-bold text-sm uppercase">{month}</div>
          <div className="text-gray-200 text-2xl font-bold">{year}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-gray-200 font-semibold mb-1">{title}</div>
        <div className="text-gray-400 text-xs">{description}</div>
      </div>
    </Card>
  );
};

export default HighlightCard;




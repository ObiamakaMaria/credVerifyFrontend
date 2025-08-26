// src/components/cards/HighlightCard.jsx
import React from 'react';
import Card from './Card';

const HighlightCard = ({ date, title, description, icon }) => {
  // Format date if it's a Date object
  const formatDate = (dateValue) => {
    if (!dateValue) return { month: '', year: '' };
    
    let dateObj;
    if (typeof dateValue === 'string') {
      dateObj = new Date(dateValue);
    } else if (dateValue instanceof Date) {
      dateObj = dateValue;
    } else {
      return { month: '', year: '' };
    }
    
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    
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
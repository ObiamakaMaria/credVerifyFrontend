// src/components/cards/HighlightCard.jsx
import React from 'react';
import Card from './Card';

const HighlightCard = ({ month, year }) => {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <div className="text-orange-400 font-bold text-sm uppercase">{month}</div>
        <div className="text-gray-200 text-2xl font-bold">{year}</div>
      </div>
      <div className="text-gray-400 text-xs">Top month of the year</div>
    </Card>
  );
};

export default HighlightCard;
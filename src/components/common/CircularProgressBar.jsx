// src/components/common/CircularProgressBar.jsx
import React from 'react';

const CircularProgressBar = ({
  percentage,
  size = 80,
  strokeWidth = 8,
  circleColor = '#2D3748',
  progressColor = '#F6AD55',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke={circleColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute text-white text-xl font-bold">{percentage}%</div>
    </div>
  );
};

export default CircularProgressBar;
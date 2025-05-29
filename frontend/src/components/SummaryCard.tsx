import React from 'react';
import { getDailyStatus } from '../utils/calculations';

interface SummaryCardProps {
  earnedMinutes: number;
  usedMinutes: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  earnedMinutes,
  usedMinutes
}) => {
  const { status, message } = getDailyStatus(earnedMinutes, usedMinutes);
  const difference = earnedMinutes - usedMinutes;
  
  const getCardColor = () => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const remainingMins = Math.floor(mins % 60);
    if (hours > 0) {
      return `${hours}h ${remainingMins}m`;
    }
    return `${remainingMins}m`;
  };

  return (
    <div className={`p-6 rounded-2xl shadow-lg ${getCardColor()} text-white`}>
      <div className="text-center">
        <div className="text-2xl font-bold mb-2">{message}</div>
        
        <div className="space-y-2 text-sm opacity-90">
          <div className="flex justify-between">
            <span>Earned:</span>
            <span>{formatTime(earnedMinutes)}</span>
          </div>
          <div className="flex justify-between">
            <span>Used:</span>
            <span>{formatTime(usedMinutes)}</span>
          </div>
          <div className="border-t border-white border-opacity-30 pt-2 flex justify-between font-semibold">
            <span>Balance:</span>
            <span className={difference >= 0 ? 'text-green-200' : 'text-red-200'}>
              {difference >= 0 ? '+' : ''}{formatTime(Math.abs(difference))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
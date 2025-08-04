import React, { useEffect, useState } from 'react';
import { getStreak, updateStreak, StreakData } from '../db/database';

interface StreakCounterProps {
  totalActivityMinutes: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  totalActivityMinutes
}) => {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: ''
  });

  useEffect(() => {
    loadStreak();
  }, []);

  useEffect(() => {
    updateStreakData();
  }, [totalActivityMinutes]);

  const loadStreak = async () => {
    const streakData = await getStreak();
    setStreak(streakData);
  };

  const updateStreakData = async () => {
    const today = new Date().toDateString();
    const minActivityThreshold = 30; // 30 minutes minimum activity for streak
    
    if (totalActivityMinutes >= minActivityThreshold) {
      if (streak.lastActivityDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        let newCurrentStreak = 1;
        if (streak.lastActivityDate === yesterdayStr) {
          // Continue streak
          newCurrentStreak = streak.currentStreak + 1;
        }
        
        const newLongestStreak = Math.max(newCurrentStreak, streak.longestStreak);
        
        const newStreak = {
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastActivityDate: today
        };
        
        setStreak(newStreak);
        await updateStreak(newStreak);
      }
    }
  };

  const getStreakEmoji = (days: number) => {
    if (days === 0) return '😴';
    if (days < 3) return '🌱';
    if (days < 7) return '🔥';
    if (days < 30) return '🚀';
    return '🏆';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
      <div className="text-center">
        <div className="text-4xl mb-3">
          {getStreakEmoji(streak.currentStreak)}
        </div>
        <div className="text-lg font-bold text-gray-800 mb-1">
          {streak.currentStreak} Day Streak
        </div>
        <div className="text-sm text-gray-600 mb-3">
          Longest: {streak.longestStreak} days
        </div>
        <div className="text-xs text-gray-500 bg-slate-50 rounded-lg p-2">
          Keep 30+ min daily activity to maintain streak
        </div>
      </div>
    </div>
  );
};
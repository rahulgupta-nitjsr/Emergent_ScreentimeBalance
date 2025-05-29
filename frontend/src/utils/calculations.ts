import { Timer } from '../store/timersSlice';

export const calculateEarnedTime = (timers: Timer[]): number => {
  let totalEarned = 0;
  
  timers.forEach(timer => {
    if (timer.id === 'sleep') {
      // Sleep bonus: +0.5 for >7 hours
      if (timer.totalTime >= 420) { // 7 hours = 420 minutes
        totalEarned += timer.totalTime * 0.5;
      }
    } else {
      // Regular multipliers: outdoor=2x, exercise=3x, productive=1.5x
      totalEarned += timer.totalTime * timer.multiplier;
    }
  });
  
  return Math.floor(totalEarned);
};

export const getDailyStatus = (earnedMinutes: number, usedMinutes: number): {
  status: 'green' | 'yellow' | 'red';
  message: string;
} => {
  const difference = earnedMinutes - usedMinutes;
  
  if (difference >= -15) {
    return {
      status: 'green',
      message: 'You did well!'
    };
  } else if (difference >= -30) {
    return {
      status: 'yellow',
      message: 'Well try!'
    };
  } else {
    return {
      status: 'red',
      message: 'Need to improve'
    };
  }
};
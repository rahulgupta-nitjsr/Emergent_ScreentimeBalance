import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { resetDailyTimers } from './store/timersSlice';
import { resetDailyScreenTime, updateEarnedTime } from './store/screenTimeSlice';
import { calculateEarnedTime } from './utils/calculations';
import { TimerBox } from './components/TimerBox';
import { ScreenTimeBox } from './components/ScreenTimeBox';
import { SummaryCard } from './components/SummaryCard';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const timers = useSelector((state: RootState) => state.timers.timers);
  const { earnedMinutes, usedMinutes } = useSelector((state: RootState) => state.screenTime);

  // Reset daily data and calculate earned time
  useEffect(() => {
    dispatch(resetDailyTimers());
    dispatch(resetDailyScreenTime());
    
    const earned = calculateEarnedTime(timers);
    dispatch(updateEarnedTime(earned));
  }, [dispatch, timers]);

  // Calculate earned time whenever timers change
  useEffect(() => {
    const earned = calculateEarnedTime(timers);
    dispatch(updateEarnedTime(earned));
  }, [timers, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ScreenTime Balance
          </h1>
          <p className="text-gray-600 text-sm">
            Earn screen time through healthy activities
          </p>
        </div>

        {/* Timer Boxes Grid */}
        <div className="grid grid-cols-2 gap-4">
          {timers.map((timer) => (
            <TimerBox
              key={timer.id}
              id={timer.id}
              name={timer.name}
              isRunning={timer.isRunning}
              startTime={timer.startTime}
              totalTime={timer.totalTime}
              multiplier={timer.multiplier}
            />
          ))}
        </div>

        {/* Screen Time Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Today's Screen Time
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <ScreenTimeBox
              type="earned"
              minutes={earnedMinutes}
            />
            <ScreenTimeBox
              type="used"
              minutes={usedMinutes}
            />
          </div>
        </div>

        {/* Daily Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Daily Summary
          </h2>
          
          <SummaryCard
            earnedMinutes={earnedMinutes}
            usedMinutes={usedMinutes}
          />
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Outdoor: 1 min = 2 mins screen time</li>
            <li>• Exercise: 1 min = 3 mins screen time</li>
            <li>• Productive: 1 min = 1.5 mins screen time</li>
            <li>• Sleep: +0.5 bonus for 7+ hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
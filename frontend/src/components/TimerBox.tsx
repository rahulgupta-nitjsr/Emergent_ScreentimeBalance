import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, stopTimer, addManualTime } from '../store/timersSlice';
import { useTimer } from '../hooks/useTimer';
import { ManualTimeModal } from './ManualTimeModal';

interface TimerBoxProps {
  id: string;
  name: string;
  isRunning: boolean;
  startTime: number | null;
  totalTime: number;
  multiplier: number;
}

export const TimerBox: React.FC<TimerBoxProps> = ({
  id,
  name,
  isRunning,
  startTime,
  totalTime,
  multiplier
}) => {
  const dispatch = useDispatch();
  const { elapsedTime, formatTime } = useTimer(isRunning, startTime);
  const [showModal, setShowModal] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    // Single click - toggle timer
    if (isRunning) {
      dispatch(stopTimer(id));
    } else {
      dispatch(startTimer(id));
    }
  }, [isRunning, dispatch, id]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 800); // 800ms long press
    setPressTimer(timer);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }, [pressTimer]);

  const handleManualTime = useCallback((minutes: number) => {
    dispatch(addManualTime({ timerId: id, minutes }));
    setShowModal(false);
  }, [dispatch, id]);

  const getBoxColor = () => {
    if (isRunning) return 'bg-green-500';
    if (totalTime > 0) return 'bg-blue-500';
    return 'bg-slate-400 hover:bg-slate-500';
  };

  const formatTotalTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <>
      <div
        className={`relative p-6 rounded-2xl shadow-lg transition-all duration-200 active:scale-95 ${getBoxColor()} text-white min-h-[140px] flex flex-col justify-between cursor-pointer timer-box hover:shadow-xl`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="text-xs opacity-75">{multiplier}x</div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          {isRunning && (
            <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
          )}
          
          <div className="text-sm opacity-90">
            Total: {formatTotalTime(totalTime)}
          </div>
          
          {isRunning && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs">Running</span>
            </div>
          )}
        </div>

        <div className="text-xs text-center opacity-75">
          Tap to {isRunning ? 'stop' : 'start'} • Hold for manual entry
        </div>
      </div>

      {showModal && (
        <ManualTimeModal
          timerName={name}
          onConfirm={handleManualTime}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};
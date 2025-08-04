import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsedTime } from '../store/screenTimeSlice';

interface ScreenTimeBoxProps {
  type: 'earned' | 'used';
  minutes: number;
  onManualUpdate?: (minutes: number) => void;
}

export const ScreenTimeBox: React.FC<ScreenTimeBoxProps> = ({
  type,
  minutes,
  onManualUpdate
}) => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const formatTime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const remainingMins = Math.floor(mins % 60);
    if (hours > 0) {
      return `${hours}h ${remainingMins}m`;
    }
    return `${remainingMins}m`;
  };

  const handleUpdate = () => {
    const newMinutes = parseInt(inputValue);
    if (!isNaN(newMinutes) && newMinutes >= 0) {
      if (type === 'used') {
        dispatch(updateUsedTime(newMinutes));
      }
      onManualUpdate?.(newMinutes);
    }
    setShowInput(false);
    setInputValue('');
  };

  const isEarned = type === 'earned';
  const bgColor = isEarned ? 'bg-emerald-500' : 'bg-purple-500';
  const title = isEarned ? 'Screen Time Earned' : 'Screen Time Used';

  return (
    <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${bgColor} text-white min-h-[120px] flex flex-col justify-between`}>
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-semibold opacity-90">{title}</h4>
        {!isEarned && (
          <button
            onClick={() => setShowInput(!showInput)}
            className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-lg hover:bg-opacity-30 transition-all duration-200"
          >
            Edit
          </button>
        )}
      </div>
      
      {showInput ? (
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Minutes"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 rounded-lg text-black text-center border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-white bg-opacity-20 py-2 rounded-lg text-xs hover:bg-opacity-30 transition-all duration-200"
            >
              Save
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="flex-1 bg-white bg-opacity-20 py-2 rounded-lg text-xs hover:bg-opacity-30 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-bold">{formatTime(minutes)}</div>
          {!isEarned && (
            <div className="text-xs opacity-75 mt-1">Tap edit to update</div>
          )}
        </div>
      )}
    </div>
  );
};
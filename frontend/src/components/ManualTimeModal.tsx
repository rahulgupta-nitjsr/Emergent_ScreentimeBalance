import React, { useState } from 'react';

interface ManualTimeModalProps {
  timerName: string;
  onConfirm: (minutes: number) => void;
  onCancel: () => void;
}

export const ManualTimeModal: React.FC<ManualTimeModalProps> = ({
  timerName,
  onConfirm,
  onCancel
}) => {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');

  const handleConfirm = () => {
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    if (totalMinutes > 0) {
      onConfirm(totalMinutes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-xl font-bold text-center mb-4">
          Add {timerName} Time
        </h3>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium"
            >
              Add Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
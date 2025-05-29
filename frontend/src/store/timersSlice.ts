import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Timer {
  id: string;
  name: string;
  isRunning: boolean;
  startTime: number | null;
  totalTime: number; // in minutes
  multiplier: number;
}

interface TimersState {
  timers: Timer[];
  lastUpdateDate: string;
}

const initialState: TimersState = {
  timers: [
    { id: 'outdoor', name: 'Outdoor', isRunning: false, startTime: null, totalTime: 0, multiplier: 2 },
    { id: 'exercise', name: 'Exercise', isRunning: false, startTime: null, totalTime: 0, multiplier: 3 },
    { id: 'productive', name: 'Productive', isRunning: false, startTime: null, totalTime: 0, multiplier: 1.5 },
    { id: 'sleep', name: 'Sleep', isRunning: false, startTime: null, totalTime: 0, multiplier: 1 },
  ],
  lastUpdateDate: new Date().toDateString(),
};

export const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    startTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timers.find(t => t.id === action.payload);
      if (timer) {
        timer.isRunning = true;
        timer.startTime = Date.now();
      }
    },
    stopTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timers.find(t => t.id === action.payload);
      if (timer && timer.startTime) {
        timer.isRunning = false;
        const elapsedTime = (Date.now() - timer.startTime) / (1000 * 60); // Convert to minutes
        timer.totalTime += elapsedTime;
        timer.startTime = null;
      }
    },
    addManualTime: (state, action: PayloadAction<{ timerId: string; minutes: number }>) => {
      const timer = state.timers.find(t => t.id === action.payload.timerId);
      if (timer) {
        timer.totalTime += action.payload.minutes;
      }
    },
    resetDailyTimers: (state) => {
      const today = new Date().toDateString();
      if (state.lastUpdateDate !== today) {
        state.timers.forEach(timer => {
          timer.totalTime = 0;
          timer.isRunning = false;
          timer.startTime = null;
        });
        state.lastUpdateDate = today;
      }
    },
  },
});

export const { startTimer, stopTimer, addManualTime, resetDailyTimers } = timersSlice.actions;
export default timersSlice.reducer;
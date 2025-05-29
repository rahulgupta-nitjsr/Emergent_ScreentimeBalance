import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScreenTimeState {
  earnedMinutes: number;
  usedMinutes: number;
  lastUpdateDate: string;
}

const initialState: ScreenTimeState = {
  earnedMinutes: 0,
  usedMinutes: 0,
  lastUpdateDate: new Date().toDateString(),
};

export const screenTimeSlice = createSlice({
  name: 'screenTime',
  initialState,
  reducers: {
    updateEarnedTime: (state, action: PayloadAction<number>) => {
      state.earnedMinutes = action.payload;
    },
    updateUsedTime: (state, action: PayloadAction<number>) => {
      state.usedMinutes = action.payload;
    },
    resetDailyScreenTime: (state) => {
      const today = new Date().toDateString();
      if (state.lastUpdateDate !== today) {
        state.earnedMinutes = 0;
        state.usedMinutes = 0;
        state.lastUpdateDate = today;
      }
    },
  },
});

export const { updateEarnedTime, updateUsedTime, resetDailyScreenTime } = screenTimeSlice.actions;
export default screenTimeSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import timersReducer from './timersSlice';
import screenTimeReducer from './screenTimeSlice';
import persistenceReducer from './persistenceSlice';

export const store = configureStore({
  reducer: {
    timers: timersReducer,
    screenTime: screenTimeReducer,
    persistence: persistenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setLoading, updateLastSaved } from '../store/persistenceSlice';
import { saveDailyData, loadDailyData } from '../db/database';
import { getDailyStatus } from '../utils/calculations';

export const usePersistence = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: RootState) => state.timers.timers);
  const { earnedMinutes, usedMinutes } = useSelector((state: RootState) => state.screenTime);
  const { autoSave } = useSelector((state: RootState) => state.persistence);

  // Load data on app start
  useEffect(() => {
    const loadTodayData = async () => {
      dispatch(setLoading(true));
      try {
        const today = new Date().toDateString();
        const savedData = await loadDailyData(today);
        
        if (savedData) {
          // TODO: Load saved data into Redux store
          console.log('Loaded saved data:', savedData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTodayData();
  }, [dispatch]);

  // Auto-save data when state changes
  useEffect(() => {
    if (!autoSave) return;

    const saveData = async () => {
      try {
        const today = new Date().toDateString();
        const { status } = getDailyStatus(earnedMinutes, usedMinutes);
        
        const dailyData = {
          date: today,
          timers: {
            outdoor: timers.find(t => t.id === 'outdoor')?.totalTime || 0,
            exercise: timers.find(t => t.id === 'exercise')?.totalTime || 0,
            productive: timers.find(t => t.id === 'productive')?.totalTime || 0,
            sleep: timers.find(t => t.id === 'sleep')?.totalTime || 0,
          },
          screenTimeEarned: earnedMinutes,
          screenTimeUsed: usedMinutes,
          status
        };

        await saveDailyData(dailyData);
        dispatch(updateLastSaved());
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    // Debounce saves to avoid too frequent database writes
    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [timers, earnedMinutes, usedMinutes, autoSave, dispatch]);
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersistenceState {
  isLoading: boolean;
  lastSaved: string;
  autoSave: boolean;
}

const initialState: PersistenceState = {
  isLoading: false,
  lastSaved: '',
  autoSave: true,
};

export const persistenceSlice = createSlice({
  name: 'persistence',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateLastSaved: (state) => {
      state.lastSaved = new Date().toISOString();
    },
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave;
    },
  },
});

export const { setLoading, updateLastSaved, toggleAutoSave } = persistenceSlice.actions;
export default persistenceSlice.reducer;
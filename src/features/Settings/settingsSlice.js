import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    includeFile: true
  },
  reducers: {
    setIncludeFile: (state, action) => {
      state.includeFile = action.payload
    },
  }
});

export const { setIncludeFile } = settingsSlice.actions;

export const selectIncludeFile = state => state.settings.includeFile;
export const selectSettings = state => state.settings;

export default settingsSlice.reducer;

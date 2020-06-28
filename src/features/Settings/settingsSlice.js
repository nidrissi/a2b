import { createSlice } from '@reduxjs/toolkit';

const defaultInitialState = {
  includeFile: true
};

const persistentState = localStorage.getItem('settings');

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: persistentState ? JSON.parse(persistentState) : defaultInitialState,
  reducers: {
    setIncludeFile: (state, action) => {
      state.includeFile = action.payload
    },
  }
});
export default settingsSlice.reducer;

export const selectIncludeFile = state => state.settings.includeFile;
export const selectSettings = state => state.settings;

export const { setIncludeFile } = settingsSlice.actions;

export function saveSettings() {
  return (_dispatch, getState) => {
    const { settings } = getState();
    const json = JSON.stringify(settings);
    localStorage.setItem('settings', json);
  }
}

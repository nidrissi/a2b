import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const defaultInitialState: Settings = {
  mode: 'biblatex',
  includeAbstract: false,
  includeFile: true,
  filePrefix: false,
  includeWget: false,
  fileFolder: '~',
  includePrimaryCategory: false,
  includeVersion: false,
  sortBy: 'submittedDate',
  sortOrder: 'descending',
  maxResults: 10
};

const persistentState = localStorage.getItem('settings');

// in case I have introduced new settings since the last time the user
// has used the app, I still want to use defaultInitialState as fallback
const initialState: Settings =
  persistentState
    ? { ...defaultInitialState, ...JSON.parse(persistentState) }
    : defaultInitialState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveSettings(state, action) {
      const settings: Settings = action.payload;
      const json = JSON.stringify(settings);
      localStorage.setItem('settings', json);
      return settings;
    },
  }
});
export default settingsSlice.reducer;

export const selectSettings = (state: RootState) => state.settings;

export const { saveSettings } = settingsSlice.actions;

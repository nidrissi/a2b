import { createSlice } from '@reduxjs/toolkit';

const defaultInitialState = {
  includeFile: true,
  sortBy: 'submittedDate',
  sortOrder: 'descending',
};

const persistentState = localStorage.getItem('settings');

// in case I have introduced new settings since the last time the user
// has used the app, I still want to use defaultInitialState as fallback
const initialState = persistentState ? { ...defaultInitialState, ...JSON.parse(persistentState) } : defaultInitialState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setIncludeFile: (state, action) => {
      state.includeFile = action.payload
    },
    setSortBy : (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder : (state, action) => {
      state.sortOrder = action.payload;
    }
  }
});
export default settingsSlice.reducer;

export const selectIncludeFile = state => state.settings.includeFile;
export const selectSortBy = state => state.settings.sortBy;
export const selectSortOrder = state => state.settings.sortOrder;
export const selectSettings = state => state.settings; // for easier serialization

export const { setIncludeFile, setSortBy, setSortOrder } = settingsSlice.actions;

export function saveSettings() {
  return (_dispatch, getState) => {
    const { settings } = getState();
    const json = JSON.stringify(settings);
    localStorage.setItem('settings', json);
  }
}

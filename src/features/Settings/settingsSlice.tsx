import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';

const defaultInitialState: Settings = {
  mode: 'biblatex',
  includeAbstract: false,
  includeFile: true,
  filePrefix: true,
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
const initialState = persistentState ? { ...defaultInitialState, ...JSON.parse(persistentState) } : defaultInitialState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setMode(state, action) { state.mode = action.payload },
    setIncludeAbstract(state, action) { state.includeAbstract = action.payload },
    setIncludeFile(state, action) { state.includeFile = action.payload },
    setFilePrefix(state, action) { state.filePrefix = action.payload },
    setIncludeWget(state, action) { state.includeWget = action.payload },
    setFileFolder(state, action) { state.fileFolder = action.payload },
    setIncludePrimaryCategory(state, action) { state.includePrimaryCategory = action.payload },
    setIncludeVersion(state, action) { state.includeVersion = action.payload },
    setSortBy(state, action) { state.sortBy = action.payload },
    setSortOrder(state, action) { state.sortOrder = action.payload },
    setMaxResults(state, action) { state.maxResults = action.payload }
  }
});
export default settingsSlice.reducer;

export const selectMode = (state: RootState) => state.settings.mode;
export const selectIncludeAbstract = (state: RootState) => state.settings.includeAbstract;
export const selectIncludeFile = (state: RootState) => state.settings.includeFile;
export const selectFilePrefix = (state: RootState) => state.settings.filePrefix;
export const selectIncludeWget = (state: RootState) => state.settings.includeWget;
export const selectFileFolder = (state: RootState) => state.settings.fileFolder;
export const selectIncludePrimaryCategory = (state: RootState) => state.settings.includePrimaryCategory;
export const selectIncludeVersion = (state: RootState) => state.settings.includeVersion;

export const selectSortBy = (state: RootState) => state.settings.sortBy;
export const selectSortOrder = (state: RootState) => state.settings.sortOrder;
export const selectMaxResults = (state: RootState) => state.settings.maxResults;

export const {
  setMode,
  setIncludeAbstract,
  setIncludeFile,
  setFilePrefix,
  setIncludeWget,
  setFileFolder,
  setIncludePrimaryCategory,
  setIncludeVersion,
  setMaxResults,
  setSortBy,
  setSortOrder
} = settingsSlice.actions;

export function saveSettings() {
  return (_dispatch: AppDispatch, getState: () => RootState) => {
    const { settings } = getState();
    const json = JSON.stringify(settings);
    localStorage.setItem('settings', json);
  }
}

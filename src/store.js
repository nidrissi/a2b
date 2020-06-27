import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './features/Results/resultsSlice';
import searchFormReducer from './features/SearchForm/searchFormSlice';
import settingsReducer from './features/Settings/settingsSlice';

export default configureStore({
  reducer: {
    results: resultsReducer,
    searchForm: searchFormReducer,
    settings: settingsReducer,
  },
});

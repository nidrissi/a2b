import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from './features/SearchForm/searchFormSlice';
import resultsReducer from './features/Results/resultsSlice';

export default configureStore({
  reducer: {
    searchForm: searchFormReducer,
    results: resultsReducer,
  },
});

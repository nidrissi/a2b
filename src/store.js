import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from './features/search/searchFormSlice';
import resultsReducer from './features/search/resultsSlice';

export default configureStore({
  reducer: {
    searchForm: searchFormReducer,
    results: resultsReducer,
  },
});

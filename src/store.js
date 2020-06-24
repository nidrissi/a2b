import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from './features/search/searchFormSlice';

export default configureStore({
  reducer: {
    searchForm: searchFormReducer
  },
});

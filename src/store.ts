import { configureStore, combineReducers } from '@reduxjs/toolkit';
import resultsReducer from './features/Results/resultsSlice';
import searchFormReducer from './features/SearchForm/searchFormSlice';
import settingsReducer from './features/Settings/settingsSlice';

const rootReducer = combineReducers({
  results: resultsReducer,
  searchForm: searchFormReducer,
  settings: settingsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch
export default store;

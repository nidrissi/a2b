import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./features/Results/resultsSlice";
import searchFormReducer from "./features/SearchForm/searchFormSlice";
import settingsReducer from "./features/Settings/settingsSlice";

const store = configureStore({
  reducer: {
    results: resultsReducer,
    searchForm: searchFormReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState :{
    error: null,
    isLoading: false,
    data: ['salut']
  },
  reducers : {
    pushEntry : (state, action) => {
      state.data.push(action.payload)
    },
    clean : state => {
      state.data = []
    }
  }
});

export const { pushEntry, clean } = resultsSlice.actions;

export const selectResults = state => state.results.data;
export const selectIsLoading = state => state.results.isLoading;
export const selectError = state => state.results.error;

export default resultsSlice.reducer;

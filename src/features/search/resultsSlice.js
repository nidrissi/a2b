import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState : ['salut'],
  reducers : {
    pushEntry : (state, action) => {
      state.push(action.payload)
    },
    clean : state => {
      state = []
    }
  }
});

export const { pushEntry, clean } = resultsSlice.actions;

export const selectResults = state => state.results;

export default resultsSlice.reducer;

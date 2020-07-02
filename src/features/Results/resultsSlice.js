import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { arxivSearch } from '../../api/arxiv';

export const fetchEntries = createAsyncThunk(
  'results/fetchEntries',
  async (_, { getState, requestId }) => {
    const state = getState();
    const query = state.searchForm;
    const settings = state.settings;
    const { isLoading, currentRequestId } = state.results;
    if (!isLoading || requestId !== currentRequestId) {
      return
    } else {
      return await arxivSearch(query, settings)
    }
  }
);

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    entries: [],
    totalEntriesFound: null,
    isLoading: false,
    currentRequestId: null,
    error: null,
    errorShown: false,
  },
  reducers: {
    closeError: state => {
      state.errorShown = true;
    }
  },
  extraReducers: {
    [fetchEntries.pending]: (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchEntries.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        const { entries, totalEntriesFound } = action.payload;
        state.entries = entries;
        state.totalEntriesFound = totalEntriesFound;
        state.currentRequestId = null;
      }
    },
    [fetchEntries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.errorShown = false;
      state.currentRequestId = null;
    }
  }
});

export const { closeError } = resultsSlice.actions;

export const selectEntries = state => state.results.entries;
export const selectTotalEntriesFound = state => state.results.totalEntriesFound;
export const selectIsLoading = state => state.results.isLoading;
export const selectError = state => state.results.error;
export const selectErrorShown = state => state.results.errorShown;

export default resultsSlice.reducer;

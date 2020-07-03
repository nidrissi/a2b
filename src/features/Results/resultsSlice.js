import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const entriesAdapter = createEntityAdapter()

export const resultsSlice = createSlice({
  name: 'results',
  initialState: entriesAdapter.getInitialState({
    totalEntriesFound: null,
    isLoading: false,
    currentRequestId: null,
    error: null,
  }),
  reducers: {
    closeError(state) {
      state.error = null
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
        entriesAdapter.setAll(state, entries);
        state.totalEntriesFound = totalEntriesFound;
        state.currentRequestId = null;
      }
    },
    [fetchEntries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.currentRequestId = null;
    }
  }
});

export const { closeError } = resultsSlice.actions;

const entriesSelectors = entriesAdapter.getSelectors(state => state.results);

export const selectEntryIds = state => entriesSelectors.selectIds(state);
export const selectEntryById = id => state => entriesSelectors.selectById(state, id);
export const selectTotalEntriesFound = state => state.results.totalEntriesFound;
export const selectIsLoading = state => state.results.isLoading;
export const selectError = state => state.results.error;

export default resultsSlice.reducer;

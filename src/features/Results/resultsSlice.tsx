import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ArxivResult, arxivSearch } from '../../api/arxiv';
import { RootState } from '../../store';

/** An asynchronous "thunk" that fetches entries based on the request. */
export const fetchEntries = createAsyncThunk<
  ArxivResult | undefined,
  void,
  {
    state: {
      searchForm: SearchInput,
      settings: Settings,
      results: { isLoading: boolean, currentRequestId: string }
    }
  }
>('results/fetchEntries',
  async (_: void, { getState, requestId }) => {
    const state = getState();
    const query = state.searchForm;
    const settings = state.settings;
    const { isLoading, currentRequestId } = state.results;
    if (!isLoading || requestId !== currentRequestId) {
      return
    } else {
      return (await arxivSearch(query, settings)) as ArxivResult
    }
  });

const entriesAdapter = createEntityAdapter<Entry>()

export const resultsSlice = createSlice({
  name: 'results',
  initialState: entriesAdapter.getInitialState({
    totalEntriesFound: null,
    isLoading: false,
    currentRequestId: null,
    error: null,
  }),
  reducers: {
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: {
    [String(fetchEntries.pending)]: (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(fetchEntries.fulfilled)]: (state, action) => {
      const { requestId } = action.meta
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        const { entries, totalEntriesFound } = action.payload;
        entriesAdapter.setAll(state, entries);
        state.totalEntriesFound = totalEntriesFound;
        state.currentRequestId = null;
      }
    },
    [String(fetchEntries.rejected)]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.currentRequestId = null;
    }
  }
});

export const { clearError } = resultsSlice.actions;

const entriesSelectors = entriesAdapter.getSelectors((state: RootState) => state.results);

export const selectEntryIds = (state: RootState) => entriesSelectors.selectIds(state);
export const selectEntryById = (id: string) => (state: RootState) => entriesSelectors.selectById(state, id);
export const selectTotalEntriesFound = (state: RootState) => state.results.totalEntriesFound;
export const selectIsLoading = (state: RootState) => state.results.isLoading;
export const selectError = (state: RootState) => state.results.error;

export default resultsSlice.reducer;

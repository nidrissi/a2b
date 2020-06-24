import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    error: null,
    isLoading: false,
    entries: []
  },
  reducers: {
    getEntriesStart: state => { state.isLoading = true },
    getEntriesSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.entries = action.payload;
    },
    getEntriesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.entries = [];
    },
  }
});

const { getEntriesStart, getEntriesSuccess, getEntriesError } = resultsSlice.actions;

export const selectEntries = state => state.results.entries;
export const selectIsLoading = state => state.results.isLoading;
export const selectError = state => state.results.error;

export default resultsSlice.reducer;

const fakeEntries = [
  { id: 12345},
  { id : 123456}
]

export const fetchEntries = (id) => async dispatch => {
  try {
    dispatch(getEntriesStart());
    const entries = fakeEntries;
    dispatch(getEntriesSuccess(entries));
  } catch (err) {
    dispatch(getEntriesError(err.toString()))
  }
};

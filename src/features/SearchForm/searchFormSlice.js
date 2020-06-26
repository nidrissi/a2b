import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    ids: [],
    authors: [],
    titles: []
  },
  reducers: {
    setQuery: (state, action) => {
      const query = action.payload;
      state.ids = query.ids;
      state.authors = query.authors;
      state.titles = query.titles;
    }
  }
});

export const { setQuery } = searchFormSlice.actions;

export const selectIds = state => state.searchForm.ids;
export const selectAuthors = state => state.searchForm.authors;
export const selectTitles = state => state.searchForm.titles;

export default searchFormSlice.reducer;

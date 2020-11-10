import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: Query = {
  ids: [],
  authors: [],
  titles: []
};

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setQuery(state, action) {
      const query: Query = action.payload;
      state.ids = query.ids;
      state.authors = query.authors;
      state.titles = query.titles;
    }
  }
});

export const { setQuery } = searchFormSlice.actions;

export const selectIds = (state: RootState) => state.searchForm.ids;
export const selectAuthors = (state: RootState) => state.searchForm.authors;
export const selectTitles = (state: RootState) => state.searchForm.titles;

export default searchFormSlice.reducer;

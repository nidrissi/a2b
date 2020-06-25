import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    idList: '',
    author: ''
  },
  reducers: {
    setQuery: (state, action) => {
      const query = action.payload;
      state.idList = query.idList;
      state.author = query.author;
    }
  }
});

export const { setQuery } = searchFormSlice.actions;

export const selectIdList = state => state.searchForm.idList;
export const selectAuthor = state => state.searchForm.author;

export default searchFormSlice.reducer;

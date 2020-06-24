import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState : {
    author: ''
  },
  reducers : {
    setAuthor : (state, action) => { state.author = action.payload }
  }
});

export const { setAuthor } = searchFormSlice.actions;

export const selectAuthor = state => state.searchForm.author;

export default searchFormSlice.reducer;

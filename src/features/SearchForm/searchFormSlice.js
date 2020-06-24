import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState : {
    id: ''
  },
  reducers : {
    setQuery : (state, action) => {
      const query = action.payload;
      state.id = query.id;
    }
  }
});

export const { setQuery } = searchFormSlice.actions;

export const selectId = state => state.searchForm.id;

export default searchFormSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    idList: ''
  },
  reducers: {
    setQuery: (state, action) => {
      const query = action.payload;
      state.idList = query.idList;
    }
  }
});

export const { setQuery } = searchFormSlice.actions;

export const selectIdList = state => state.searchForm.idList;

export default searchFormSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState : {
    id: ''
  },
  reducers : {
    setId : (state, action) => { state.id = action.payload }
  }
});

export const { setId } = searchFormSlice.actions;

export const selectId = state => state.searchForm.id;

export default searchFormSlice.reducer;

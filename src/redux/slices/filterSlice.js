import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 'All',
  baseIngredient: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.category = action.payload
    },
    setBaseIngredient: (state, action) => {
      state.baseIngredient = action.payload
    },
  }
});

export const { setCurrentCategory, setBaseIngredient } = filterSlice.actions;
export default filterSlice.reducer;
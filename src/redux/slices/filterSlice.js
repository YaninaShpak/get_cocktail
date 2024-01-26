import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 'All',
  subcategory: null,
  baseIngredient: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.category = action.payload
    },
    setCurrentSubCategory: (state, action) => {
      state.subcategory = action.payload
    },
    setBaseIngredient: (state, action) => {
      state.baseIngredient = action.payload
    },
  }
});

export const { setCurrentCategory, setCurrentSubCategory, setBaseIngredient } = filterSlice.actions;
export default filterSlice.reducer;
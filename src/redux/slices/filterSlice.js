import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: JSON.parse(localStorage.getItem('category')) || 'All',
  subcategory: JSON.parse(localStorage.getItem('subcategory')),
  baseIngredient: JSON.parse(localStorage.getItem('baseIngredient')) || '',
  ingredientsOff: JSON.parse(localStorage.getItem('ingredientsOff')) || [],
  ingredientsOn: JSON.parse(localStorage.getItem('ingredientsOn')) || []
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
    setIngredientsOff: (state, action) => {
      state.ingredientsOff = Array.isArray(action.payload) ?  [] : [...state.ingredientsOff, action.payload];
      state.ingredientsOn = state.ingredientsOn.filter((el) => el !== action.payload)
    },
    setIngredientsOn: (state, action) => {
      state.ingredientsOn = Array.isArray(action.payload) ?  [] : [...state.ingredientsOn, action.payload];
      state.ingredientsOff = state.ingredientsOff.filter((el) => el !== action.payload)
    },
  }
});

export const { setCurrentCategory, setCurrentSubCategory, setBaseIngredient, setIngredientsOff, setIngredientsOn } = filterSlice.actions;
export default filterSlice.reducer;
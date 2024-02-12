import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCategory: JSON.parse(localStorage.getItem("currentCategory")) || "All",
  currentSubCategory: JSON.parse(localStorage.getItem("currentSubCategory")),
  baseIngredient: JSON.parse(localStorage.getItem("baseIngredient")) || "",
  ingredientsOff: JSON.parse(localStorage.getItem("ingredientsOff")) || [],
  ingredientsOn: JSON.parse(localStorage.getItem("ingredientsOn")) || [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentSubCategory: (state, action) => {
      state.currentSubCategory = action.payload;
    },
    setBaseIngredient: (state, action) => {
      state.baseIngredient = action.payload;
    },
    setIngredientsOff: (state, action) => {
      state.ingredientsOff = Array.isArray(action.payload)
        ? []
        : [...state.ingredientsOff, action.payload];
      state.ingredientsOn = state.ingredientsOn.filter(
        (el) => el !== action.payload
      );
    },
    setIngredientsOn: (state, action) => {
      state.ingredientsOn = Array.isArray(action.payload)
        ? []
        : [...state.ingredientsOn, action.payload];
      state.ingredientsOff = state.ingredientsOff.filter(
        (el) => el !== action.payload
      );
    },
  },
});

export const {
  setCurrentCategory,
  setCurrentSubCategory,
  setBaseIngredient,
  setIngredientsOff,
  setIngredientsOn,
} = filterSlice.actions;
export default filterSlice.reducer;

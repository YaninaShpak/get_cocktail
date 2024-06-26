import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCategory: JSON.parse(localStorage.getItem("currentCategory")) || "All",
  currentSubCategory: JSON.parse(localStorage.getItem("currentSubCategory")),
  baseIngredient: JSON.parse(localStorage.getItem("baseIngredient")) || "",
  includeIngredients: JSON.parse(localStorage.getItem("includeIngredients")) ||  [],
  excludeIngredients: JSON.parse(localStorage.getItem("excludeIngredients")) || [],
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
    setIncludeIngredients: (state, action) => {
      state.includeIngredients = action.payload;
    },
    setExcludeIngredients: (state, action) => {
      state.excludeIngredients = action.payload
    },
  },
});

export const {
  setCurrentCategory,
  setCurrentSubCategory,
  setBaseIngredient,
  setIncludeIngredients,
  setExcludeIngredients
} = filterSlice.actions;
export default filterSlice.reducer;

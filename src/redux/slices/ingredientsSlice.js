import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientsList: null
}

export const ingredientsSlice = createSlice({
  name: "ingredientsList",
  initialState,
  reducers: {
    setIngredientsList: (state, action) => {
      state.ingredientsList = action.payload
    }
  }
});

export const {setIngredientsList} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
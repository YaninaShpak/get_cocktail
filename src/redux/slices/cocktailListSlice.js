import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cocktailID: ''
};

export const cocktailListSlice = createSlice({
  name: 'cocktailList',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    setCocktailID: (state, action) => {
      state.cocktailID = action.payload
    }
  }
});

export const { setItems, setCocktailID } = cocktailListSlice.actions;
export default cocktailListSlice.reducer;
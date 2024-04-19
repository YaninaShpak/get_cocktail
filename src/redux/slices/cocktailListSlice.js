import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cocktailID: "",
  cocktailItem: "",
  randomNum: JSON.parse(localStorage.getItem("randomNum")) || 0
};

export const cocktailListSlice = createSlice({
  name: "cocktailList",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCocktailID: (state, action) => {
      state.cocktailID= action.payload;
    },
    setCocktailItem: (state, action) => {
      state.cocktailItem= action.payload;
    },
    setRandomNum: (state, action) => {
      state.randomNum= action.payload;
    },
  },
});

export const { setItems, setCocktailID, setCocktailItem, setRandomNum } = cocktailListSlice.actions;
export default cocktailListSlice.reducer;

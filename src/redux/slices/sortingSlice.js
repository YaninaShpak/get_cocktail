import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sorting: JSON.parse(localStorage.getItem("sorting")) || {
    nameItem: "popularity",
    nameSort: "",
  },
};

export const sortingSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export const { setSorting } = sortingSlice.actions;
export default sortingSlice.reducer;

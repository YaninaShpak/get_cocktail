import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: Number(JSON.parse(localStorage.getItem("currentPage"))) || 1,
  countItems: 100,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCountItems: (state, action) => {
      state.countItems = action.payload;
    },
  },
});

export const { setCurrentPage, setCountItems } = paginationSlice.actions;
export default paginationSlice.reducer;

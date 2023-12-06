import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import sortingSlice from "./slices/sortingSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortingSlice,
    search: searchSlice
  },
});
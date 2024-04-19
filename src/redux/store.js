import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import sortingSlice from "./slices/sortingSlice";
import searchSlice from "./slices/searchSlice";
import cocktailListSlice from "./slices/cocktailListSlice";
import paginationSlice from "./slices/paginationSlice";
import rangeSliderSlice from "./slices/rangeSliderSlice";
import ingredientsSlice from "./slices/ingredientsSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortingSlice,
    search: searchSlice,
    cocktailList: cocktailListSlice,
    pagination: paginationSlice,
    rangeSlider: rangeSliderSlice,
    ingredientsList: ingredientsSlice
  },
});

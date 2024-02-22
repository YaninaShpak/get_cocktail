import { batch } from "react-redux";

import {
  setCurrentCategory,
  setCurrentSubCategory,
  setBaseIngredient,
  setExcludeIngredients
} from "../slices/filterSlice";
import { setValueMin, setValueMax } from "../slices/rangeSliderSlice";

export const clearFiltersAndRange = () => (dispatch) => {
  batch(() => {
    dispatch(setCurrentCategory("All"));
    dispatch(setCurrentSubCategory(null));
    dispatch(setBaseIngredient(""));
    dispatch(setExcludeIngredients([]));
    dispatch(setValueMin(3));
    dispatch(setValueMax(100));
  });
};

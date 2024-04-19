import { batch } from "react-redux";

import {
  setCurrentCategory,
  setCurrentSubCategory,
  setBaseIngredient,
  setIncludeIngredients,
  setExcludeIngredients,
} from "../slices/filterSlice";
import { setValueMin, setValueMax } from "../slices/rangeSliderSlice";
import { setIngredientsList } from "../slices/ingredientsSlice";

export const clearFiltersAndRange = () => (dispatch) => {
  batch(() => {
    dispatch(setCurrentCategory("All"));
    dispatch(setCurrentSubCategory(null));
    dispatch(setBaseIngredient(""));
    dispatch(setIncludeIngredients([]));
    dispatch(setExcludeIngredients([]));
    dispatch(setValueMin(3));
    dispatch(setValueMax(100));
    dispatch(setIngredientsList(null))
  });
};

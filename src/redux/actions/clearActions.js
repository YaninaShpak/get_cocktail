import { batch } from "react-redux";

import { setCurrentCategory, setCurrentSubCategory, setBaseIngredient, setIngredientsOff, setIngredientsOn } from '../slices/filterSlice';
import { setValueMin, setValueMax } from '../slices/rangeSliderSlice';

export const clearFiltersAndRange = () => (dispatch) => {
  batch(() => {
    dispatch(setCurrentCategory('All'));
    dispatch(setCurrentSubCategory(null));
    dispatch(setBaseIngredient(''));
    dispatch(setIngredientsOff([]));
    dispatch(setIngredientsOn([]));
    dispatch(setValueMin(3));
    dispatch(setValueMax(100));
  });
};
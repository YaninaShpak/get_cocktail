import React from 'react';
import { useDispatch } from 'react-redux';

//styles
import styles from './ClearButton.module.scss';

//states
import { setCurrentCategory, setCurrentSubCategory, setBaseIngredient, setIngredientsOff, setIngredientsOn } from '../../../redux/slices/filterSlice';
import { setValueMin, setValueMax } from '../../../redux/slices/rangeSliderSlice';


const ClearButton = () => {
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(setCurrentCategory('All'));
    dispatch(setCurrentSubCategory(null));
    dispatch(setBaseIngredient(''));
    dispatch(setIngredientsOff([]));
    dispatch(setIngredientsOn([]));
    dispatch(setValueMin(3));
    dispatch(setValueMax(100));
  }

  return (
    <button 
      className={styles.button} 
      type="button"
      onClick={clear}
    >
      Clear
    </button>
  );
};

export default ClearButton;
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setIngredientsOff,
  setIngredientsOn,
} from "../../../redux/slices/filterSlice";
import { setCurrentPage } from "../../../redux/slices/paginationSlice";

import CheckboxList from "./CheckboxList/CheckboxList";

import styles from "./CheckboxFilter.module.scss";

import { ingredients } from "../../../data/ingredients";

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.filter);

  const excludeIngredients = useCallback((item) => {
    dispatch(setIngredientsOff(item));
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  const addIngredients = useCallback((item) => {
    dispatch(setIngredientsOn(item));
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.title}>Add/Exclude ingredients</h3>
      {currentCategory !== "Non alcoholic" && (
        <CheckboxList
          title="Alcohol"
          list={ingredients.alcohol}
          onClickExclude={excludeIngredients}
          onClickAdd={addIngredients}
        />
      )}
      <CheckboxList
        title="Non Alcohol"
        list={ingredients.nonAlcohol}
        onClickExclude={excludeIngredients}
        onClickAdd={addIngredients}
      />
    </div>
  );
};

export default CheckboxFilter;

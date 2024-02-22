import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { setExcludeIngredients } from "../../../redux/slices/filterSlice";

import CheckboxList from "./CheckboxList/CheckboxList";

import styles from "./CheckboxFilter.module.scss";

import { ingredients } from "../../../data/ingredients";

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const { currentCategory, excludeIngredients } = useSelector((state) => state.filter);

  const handleExcludeAllClick = () => {
    if (excludeIngredients.length === 0) {
      dispatch(setExcludeIngredients(ingredients.alcohol.concat(ingredients.nonAlcohol)));
    } else {
      dispatch(setExcludeIngredients([]));
    }
  };

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.title}>Add/Exclude ingredients</h3>
      <div className={styles.buttonWrapper} onClick={handleExcludeAllClick}>
        <div className={`${styles.checkbox} ${excludeIngredients.length !== 0 ? styles.hide : ''}`}>
          <span className="material-icons">done</span>
        </div>
        <button className={styles.button} type="button">
          Add/Exclude All
        </button>
      </div>

      {currentCategory !== "Non alcoholic" && (
        <CheckboxList title="Alcohol" list={ingredients.alcohol} />
      )}
      <CheckboxList title="Non Alcohol" list={ingredients.nonAlcohol} />
    </div>
  );
};

export default CheckboxFilter;

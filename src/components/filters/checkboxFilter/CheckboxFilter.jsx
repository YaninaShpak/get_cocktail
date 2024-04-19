import React from "react";
import { useSelector } from "react-redux";

import CheckboxList from "./CheckboxList/CheckboxList";

import styles from "./CheckboxFilter.module.scss";

import { ingredients } from "../../../data/ingredients";

const CheckboxFilter = () => {
  const { currentCategory } = useSelector((state) => state.filter);

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.title}>Add/Exclude ingredients</h3>
      {currentCategory !== "Non alcoholic" && (
        <CheckboxList title="Alcohol" list={ingredients.alcohol} />
      )}
      <CheckboxList title="Non Alcohol" list={ingredients.nonAlcohol} />
    </div>
  );
};

export default CheckboxFilter;

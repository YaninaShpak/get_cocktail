import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import CheckboxList from "./CheckboxList/CheckboxList";

import styles from "./CheckboxFilter.module.scss";

import { ingredients } from "../../../data/ingredients";

const CheckboxFilter = () => {
  const { currentCategory } = useSelector((state) => state.filter);
  const {ingredientsList} = useSelector((state) => state.ingredientsList);

  const [newIngredientsList, setNewIngredientsList] = useState({
    alcohol: [],
    nonAlcohol: []
  });
  
  useEffect(() => {
    const updatedAlcohol = ingredients.alcohol.filter((el) => ingredientsList?.some((item) => item.toLowerCase().includes(el.toLowerCase())));
    const updatedNonAlcohol = ingredients.nonAlcohol.filter((el) => ingredientsList?.some((item) => item.toLowerCase().includes(el.toLowerCase())));
    
    setNewIngredientsList({
      ...newIngredientsList,
      alcohol: updatedAlcohol,
      nonAlcohol: updatedNonAlcohol
    });

    console.log(newIngredientsList)
  }, [ingredientsList]);

  const isItems = (array) => {
    if (array.length > 0) {
      return array;
    } else {
      return null
    }
  }
  
  console.log(ingredientsList)

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.title}>Add/Exclude ingredients</h3>
      {currentCategory !== "Non alcoholic" && (
        <CheckboxList title="Alcohol" list={isItems(newIngredientsList.alcohol) || ingredients.alcohol} />
      )}
      <CheckboxList title="Non Alcohol" list={isItems(newIngredientsList.nonAlcohol) || ingredients.nonAlcohol} />
    </div>
  );
};

export default CheckboxFilter;

import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import RandomCocktailButton from "../buttons/randomCocktailButton/RandomCocktailButton";

import saveToLocalStorage from "../../utils/saveToLocalStorage";

import style from "./Header.module.scss";

const Header = () => {
  const {
    currentCategory,
    currentSubCategory,
    baseIngredient,
    excludeIngredients
  } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sort);
  const { currentPage } = useSelector((state) => state.pagination);

  const saveFiltersToLocalStorage = () => {
    saveToLocalStorage("currentCategory", currentCategory);
    saveToLocalStorage("currentSubCategory", currentSubCategory);
    saveToLocalStorage("baseIngredient", baseIngredient);
    saveToLocalStorage("excludeIngredients", excludeIngredients);
    saveToLocalStorage("currentPage", currentPage);
    saveToLocalStorage("sorting", sorting);
  }
  
  return (
    <header className={style.mainHeader}>
      <div className="container">
        <div className={style.mainHeader__wrapper}>
          <p className={style.mainHeader__title}>
            <Link className="link" to="/">
              Let's get cocktail!
            </Link>
          </p>
          <RandomCocktailButton onClick={saveFiltersToLocalStorage} />
        </div>
      </div>
    </header>
  );
};

export default Header;

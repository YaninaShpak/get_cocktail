import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setRandomNum } from "../../../redux/slices/cocktailListSlice";

import getRandomIntInclusive from "../../../utils/getRandomNum";

import styles from "./RandomCocktailButton.module.scss";

const RandomCocktailButton = () => {
  const dispatch = useDispatch();
   
  return (
    <Link
      to="random-cocktail/random/:title"
      className={`${styles.button} actionsWrapper__button`}
      onClick={() => dispatch(setRandomNum(getRandomIntInclusive(0, 99)))}
    >
      Random cocktail
    </Link>
  );
};

export default RandomCocktailButton;
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCocktailID } from "../../../redux/slices/cocktailListSlice";

//styles
import styles from "./RandomCocktailButton.module.scss";

const RandomCocktailButton = () => {
  const dispatch = useDispatch();

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleClickRandomBtn = () => {
    let randomNum = getRandomIntInclusive(0, 99)
    dispatch(setCocktailID(randomNum))
  }
 
  return (
    <Link
      to={`random-cocktail/random`}
      className={styles.button}
      onClick={handleClickRandomBtn}
    >
      Random cocktail
    </Link>
  );
};

export default RandomCocktailButton;
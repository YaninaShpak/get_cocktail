import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from 'react-redux';

import { setCocktailID } from "../../../redux/slices/cocktailListSlice";

//styles
import styles from "./RandomCocktailButton.module.scss";

const RandomCocktailButton = () => {
  const dispatch = useDispatch();
  const {items} = useSelector((state) => state.cocktailList);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomID = items[getRandomIntInclusive(0, 99)]?.id;
 
  return (
    <Link
      to={`random-cocktail/${randomID}`}
      className={styles.button}
      onClick={() => dispatch(setCocktailID(randomID))}
    >
      Random cocktail
    </Link>
  );
};

export default RandomCocktailButton;
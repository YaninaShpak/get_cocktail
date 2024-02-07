import React from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./RandomCocktailButton.module.scss";

const RandomCocktailButton = ({onClick}) => {
  
  return (
    <Link
      to={`random-cocktail/random`}
      className={styles.button}
      onClick={onClick}
    >
      Random cocktail
    </Link>
  );
};

export default RandomCocktailButton;
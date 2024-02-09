import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./RandomCocktailButton.module.scss";

const RandomCocktailButton = ({onClick}) => {
  
  return (
    <Link
      to="random-cocktail/random/:title"
      className={styles.button}
      onClick={onClick}
    >
      Random cocktail
    </Link>
  );
};

RandomCocktailButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default memo(RandomCocktailButton);
import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { useDispatch } from "react-redux";
import { setRandomNum } from "../../../redux/slices/cocktailListSlice";

import getRandomIntInclusive from "../../../utils/getRandomNum";

import styles from "./RandomCocktailButton.module.scss";

const RandomCocktailButton = ({ onClick }) => {
  const dispatch = useDispatch();
  
  return (
    <Link
      to="random-cocktail/random/:title"
      className={`${styles.button} actionsWrapper__button`}
      onClick={() => {
        // onClick();
        dispatch(setRandomNum(getRandomIntInclusive(0, 99)));
      }}
    >
      Random cocktail
    </Link>
  );
};

RandomCocktailButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default memo(RandomCocktailButton);
import React from "react";
import { useDispatch } from "react-redux";

//states
import { clearFiltersAndRange } from "../../../redux/actions/clearActions";

import styles from "./ClearButton.module.scss";

const ClearButton = () => {
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearFiltersAndRange());

    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  };

  return (
    <button className={styles.button} type="button" onClick={clear}>
      Clear
    </button>
  );
};

export default ClearButton;

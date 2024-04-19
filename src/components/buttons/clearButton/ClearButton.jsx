import React from "react";

import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/slices/paginationSlice";
import { clearFiltersAndRange } from "../../../redux/actions/clearActions";

import styles from "./ClearButton.module.scss";

const ClearButton = () => {
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearFiltersAndRange());
    dispatch(setCurrentPage(1));

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

import React, { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentSubCategory } from "../../../redux/slices/filterSlice";

import styles from "./SubcategoriesFilter.module.scss";

const SubcategoriesFilter = () => {
  const subcategories = ["low alcohol", "strong"];

  const dispatch = useDispatch();
  const { currentSubCategory } = useSelector((state) => state.filter);

  const handleItemClick = useCallback((item) => {
    dispatch(setCurrentSubCategory(item));
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Strength</h3>
      <ul className={`${styles.list} list-reset`}>
        {subcategories.map((item) => (
          <li key={item}>
            <button
              className={`${styles.listItem} ${
                item === currentSubCategory ? styles.current : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoriesFilter;

import { memo, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentCategory,
  setCurrentSubCategory,
  setBaseIngredient
} from "../../../redux/slices/filterSlice";
import { setSorting } from "../../../redux/slices/sortingSlice";
import { setCurrentPage } from "../../../redux/slices/paginationSlice";

import styles from "./CategoriesFilter.module.scss";

import { categories } from "../../../data/categories";

const CategoriesFilter = memo(() => {
  const dispatch = useDispatch();

  const { currentCategory } = useSelector((state) => state.filter);

  const onChangeCategory = useCallback(
    (category) => {
      dispatch(setCurrentCategory(category));
      if (category === "Non alcoholic") {
        dispatch(setSorting({ nameItem: "popularity", nameSort: "" }));
        dispatch(setCurrentSubCategory(null));
      }
      dispatch(setBaseIngredient(""));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  return (
    <nav className="categories">
      <ul className={`${styles.categoriesList} list-reset`}>
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`${styles.categoriesList__item} ${
                currentCategory === category ? styles.current : ""
              }`}
              onClick={() => onChangeCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default CategoriesFilter;

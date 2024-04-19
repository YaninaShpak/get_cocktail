import { useState } from "react";

import { useSelector } from "react-redux";

//components
import CategoriesFilter from "./categoriesFilter/CategoriesFilter";
import RadioFilter from "./radioFilter/RadioFilter";
import RangeSlider from "./rangeSlider/RangeSlider";
import SubcategoriesFilter from "./subcategoriesFilter/SubcategoriesFilter";
import CheckboxFilter from "./checkboxFilter/CheckboxFilter";
import ClearButton from "../buttons/clearButton/ClearButton";

import styles from "./Filters.module.scss";

const Filters = () => {
  const { currentCategory } = useSelector((state) => state.filter);
  const isAlcoholic = currentCategory === "Alcoholic";
  const [showFilters, setshowFilters] = useState(false);
  
  return (
    <section className={`${styles.filters} contentContainer__filters`}>
      <div className={styles.filters__titleWrapper}>
        <h2 onClick={() => {
          setshowFilters(!showFilters)
        }} className={`title ${styles.filters__title}`}>Filters</h2>
      </div>
      <div className={`${styles.filters__wrapper} ${showFilters ? styles.show : ''}`}>
        <CategoriesFilter />
        <RadioFilter />
        {isAlcoholic && (
          <>
            <RangeSlider />
            <SubcategoriesFilter />
          </>
        )}
        <CheckboxFilter />
        <ClearButton />
      </div>
    </section>
  );
};

export default Filters;

import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setBaseIngredient } from "../../redux/slices/filterSlice";

//styles
import styles from "./RadioFilter.module.scss";

const options = ["Rum", "Vodka", "Gin", "Tequila"];

const RadioFilter = () => {
  const valueTitle = useSelector((state) => state.filter.baseIngredient);
  const dispatch = useDispatch();

  const [dropdownList, setDropdownList] = useState(false);
  const [searchOption, setSearchOption] = useState("");
  

  const onChangeMainIngredient = (e) => {
    setSearchOption(e.target.value);
  };

  const onChangeRadioButton = (el) => {
    dispatch(setBaseIngredient(el));
    setSearchOption('');
  };

  const showDropdownList = () => {
    setDropdownList(!dropdownList);
    setSearchOption('');
  };

  const renderOptionsList = () => {
    return searchOption
      ? options.filter((el) => el.toLowerCase().includes(searchOption.toLowerCase()))
      : options;
  };

  return (
    <div
      className={`${styles.dropdown} ${
        dropdownList ? styles.show : ""
      } filters__dropdown`}
    >
      <div className={styles.dropdown__container} onClick={showDropdownList}>
        <p className={styles.dropdown__title}>
          {valueTitle ? valueTitle : 'Choose base ingredient'}
        </p>
        <div className={styles.dropdownBtn} >
          <span className={`material-icons ${styles.dropdownBtn__icon}`}>
            expand_more
          </span>
        </div>
      </div>
      <ul className={`${styles.options} list-reset ${styles.dropdown__list}`}>
        <li key='search-input'>
          <label className={styles.dropdown__search}>
            <input
              className={`${styles.dropdown__searchInput} ${styles.dropdown__input}`}
              type="text"
              value={searchOption}
              onChange={onChangeMainIngredient}
            />
          </label>
        </li>
        {renderOptionsList().map((el) => (
          <li key={el.toLowerCase()} className={styles.options__item}>
            <label className={styles.options__label}>
              <input
                className="visually-hidden"
                onChange={() => onChangeRadioButton(el)}
                value={el}
                type="radio"
                name="ingredient"
                id={el.toLowerCase()}
              />
              <div className={`options__radioIcon ${styles.radioIcon}`}></div>
              {el}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RadioFilter;

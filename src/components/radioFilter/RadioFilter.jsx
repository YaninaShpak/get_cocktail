import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setBaseIngredient } from "../../redux/slices/filterSlice";
import { setCurrentPage } from "../../redux/slices/paginationSlice";

//styles
import styles from "./RadioFilter.module.scss";

const alcoOptions = ['Champagne', 'Cognac', 'Gin', 'Jägermeister', 'Liqueur', 'Rum', 'Tequila', 'Vermouth', 'Vodka', 'Whiskey', 'Wine'];
const nonAlcoOptions = ["Apple", "Banana", "Chocolate", "Coffee", "Ginger", "Juice", "Mango", "Milk", "Orange", "Soda water", "Tea", "Yoghurt"];

const RadioFilter = () => {
  const valueTitle = useSelector((state) => state.filter.baseIngredient);
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.filter);

  const [dropdownList, setDropdownList] = useState(false); //показать список ингредиентов
  const [searchOption, setSearchOption] = useState(""); //найти ингредиент по вводу текста

  const [optionsList, setOptionsList] = useState([]);//список ингредиентов
  const [allList, setAllList] = useState(false);//показать весь список
  
  const onChangeBaseIngredient = (e) => {
    setSearchOption(e.target.value);
  };

  const onChangeRadioButton = (el) => {
    dispatch(setBaseIngredient(el));
    setSearchOption("");
    dispatch(setCurrentPage(1))
  };

  const showDropdownList = () => {
    setDropdownList(!dropdownList);
    setSearchOption("");
  };

  const createOptionList = useCallback(() => {
    let options;

    if (category === 'Alcoholic') {
      options = alcoOptions;
    } else if (category === 'Non alcoholic') {
      options = nonAlcoOptions;
    } else {
      options = alcoOptions.concat(nonAlcoOptions);
    }

    if (searchOption) {
      return options.filter((el) => el.toLowerCase().includes(searchOption.toLowerCase()))
    } else {
      if (!allList) {
        return options.slice(0, 6);
      } else {
        return options;
      }
    }
  }, [category, allList, searchOption]);

  useEffect(() => {
    setOptionsList(createOptionList)
  }, [createOptionList]);

  return (
    <div className={`${styles.dropdown} ${dropdownList ? styles.show : ""} filters__dropdown`}>
      <div className={styles.dropdown__container} onClick={showDropdownList}>
        <p className={styles.dropdown__title}>
          {valueTitle ? valueTitle : "Choose base ingredient"}
        </p>
        <div className={styles.dropdownBtn}>
          <span className={`material-icons ${styles.dropdownBtn__icon}`}>
            expand_more
          </span>
        </div>
      </div>
      {dropdownList && 
      <div className={styles.dropdown__listWrapper}>
        <label className={styles.dropdown__search}>
          <input
            className={`${styles.dropdown__searchInput} ${styles.dropdown__input}`}
            type="text"
            value={searchOption}
            onChange={onChangeBaseIngredient}
          />
            <span className={`${styles.dropdown__searchIcon} material-icons`}>
              search
            </span>
        </label>
        <ul className={`${styles.options} list-reset ${styles.dropdown__list}`}>
          {optionsList.map((el) => (
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
        {!allList && <button className={styles.dropdown__button} onClick={() => setAllList(true)}>Show all</button>}
      </div>}
    </div>
  );
};

export default RadioFilter;

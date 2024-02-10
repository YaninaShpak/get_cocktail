import React, { useCallback, useMemo, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setBaseIngredient } from "../../../redux/slices/filterSlice";
import { setCurrentPage } from "../../../redux/slices/paginationSlice";

import CancelButton from "../../buttons/cancelButton/CancelButton";

import styles from "./RadioFilter.module.scss";

import { alcoOptions, nonAlcoOptions } from "../../../data/options";

const RadioFilter = () => {
  const [isChecked, setIsChecked] = useState({}); //для внешнего вида, показать, что выбран ингредиент
  const [dropdownList, setDropdownList] = useState(false); //показать список ингредиентов
  const [searchOption, setSearchOption] = useState(""); //найти ингредиент по вводу текста

  const dispatch = useDispatch();
  const { baseIngredient } = useSelector((state) => state.filter);
  const { currentCategory } = useSelector((state) => state.filter);

  //открыть выпадающий список
  const showDropdownList = () => {
    setDropdownList(!dropdownList);
    setSearchOption("");
  };

  //создать список ингредиентов на основе уловий
  const createOptionList = useCallback(() => {
    let options = [...alcoOptions, ...nonAlcoOptions].sort();

    if (currentCategory === "Alcoholic") {
      options = alcoOptions;
    } else if (currentCategory === "Non alcoholic") {
      options = nonAlcoOptions;
    }

    return searchOption
      ? options.filter((el) =>
          el.toLowerCase().includes(searchOption.toLowerCase())
        )
      : options;
  }, [currentCategory, searchOption]);

  const optionsList = useMemo(() => createOptionList(), [createOptionList]); //список ингредиентов

  //ввод текста в поле поиска ингредиента
  const onChangeBaseIngredient = (e) => {
    setSearchOption(e.target.value);
  };

  //клик по ингредиенту из списка
  const onChangeRadioButton = (el) => {
    setIsChecked({ [el]: true });

    dispatch(setBaseIngredient(el));
    setSearchOption("");
    dispatch(setCurrentPage(1));
  };

  const cancel = () => {
    dispatch(setBaseIngredient(""));
    setIsChecked({});
  };

  return (
    <div
      className={`${styles.dropdown} ${
        dropdownList ? styles.show : ""
      } filters__dropdown`}
    >
      <div className={styles.dropdown__container} onClick={showDropdownList}>
        <p className={styles.dropdown__title}>
          {baseIngredient ? baseIngredient : "Choose base ingredient"}
        </p>
        <div className={styles.dropdownBtn}>
          <span className={`material-icons ${styles.dropdownBtn__icon}`}>
            expand_more
          </span>
        </div>
      </div>
      {dropdownList && (
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
          <ul
            className={`${styles.options} list-reset ${styles.dropdown__list}`}
          >
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
                    checked={isChecked[el] ? true : false}
                  />
                  <div
                    className={`options__radioIcon ${styles.radioIcon}`}
                  ></div>
                  {el}
                </label>
              </li>
            ))}
          </ul>
          <CancelButton onClick={cancel} />
        </div>
      )}
    </div>
  );
};

export default RadioFilter;

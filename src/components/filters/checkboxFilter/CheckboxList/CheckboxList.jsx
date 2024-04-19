import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIncludeIngredients,
  setExcludeIngredients,
} from "../../../../redux/slices/filterSlice";
import { setCurrentPage } from "../../../../redux/slices/paginationSlice";

import ControlButton from "../../../buttons/controlButton/ControlButton";

import styles from "./CheckboxList.module.scss";

const CheckboxList = ({ title, list }) => {
  const dispatch = useDispatch();
  const { includeIngredients, excludeIngredients } = useSelector(
    (state) => state.filter
  );

  const createArray = (inArr, exArr, inFunc, exFunc, item) => {
    const findInItem = inArr.find((el) => el === item);
    const findExItem = exArr.find((el) => el === item);

    if (findInItem) {
      dispatch(inFunc(inArr.filter((el) => el !== item)));
    } else {
      dispatch(inFunc([...inArr, item]));
    }

    if (findExItem) {
      dispatch(exFunc(exArr.filter((el) => el !== item)));
    }

    dispatch(setCurrentPage(1));
  };

  const handleIncludeClick = (item) => {
    createArray(
      includeIngredients,
      excludeIngredients,
      setIncludeIngredients,
      setExcludeIngredients,
      item
    );
  };

  const handleExcludeClick = (item) => {
    createArray(
      excludeIngredients,
      includeIngredients,
      setExcludeIngredients,
      setIncludeIngredients,
      item
    );
  };

  return (
    <div className={styles.root}>
      <h4 className={styles.title}>{title}</h4>
      <ul className={`${styles.list} ${styles.list__alcohol} list-reset`}>
        {list.map((item, i) => (
          <li className={styles.listItem} key={item}>
            <div className={styles.label}>
              {item}
              <ControlButton
                ariaLabel="Include"
                item={item}
                handleClick={handleIncludeClick}
                icon="add"
                check={includeIngredients.find((el) => el === item)}
              />
              <ControlButton
                ariaLabel="Exclude"
                item={item}
                handleClick={handleExcludeClick}
                icon="remove"
                check={excludeIngredients.find((el) => el === item)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxList;

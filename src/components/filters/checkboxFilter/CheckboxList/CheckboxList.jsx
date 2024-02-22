import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExcludeIngredients } from "../../../../redux/slices/filterSlice";

import styles from "./CheckboxList.module.scss";

const CheckboxList = ({ title, list }) => {
  const dispatch = useDispatch();
  const {excludeIngredients} = useSelector((state) => state.filter);

  const handleChange = (item) => {
    if (excludeIngredients.includes(item)) {
      dispatch(setExcludeIngredients(excludeIngredients.filter((el) => el !== item)));
    } else {
      dispatch(setExcludeIngredients([...excludeIngredients, item]));
    }
  };

  return (
    <div className={styles.root}>
      <h4 className={styles.title}>{title}</h4>
      <ul className={`${styles.list} ${styles.list__alcohol} list-reset`}>
        {list.map((item, i) => (
          <li className={styles.listItem} key={item}>
            <label className={styles.label}>
              <input
                value={item}
                type="checkbox"
                name={item}
                onChange={() =>  handleChange(item)}
                checked={excludeIngredients.includes(item) ? false : true}
              />
              <div className={`${styles.checkbox} ${styles.hide}`}>
                <span className="material-icons">done</span>
              </div>
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxList;

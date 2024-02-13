import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./CheckboxList.module.scss";

const CheckboxList = ({ title, list, onClickExclude, onClickAdd }) => {
  const {ingredientsOff} = useSelector((state) => state.filter);
  const [excludedItems, setExcludedItems] = useState({});

  //чтобы сохранялось зачеркивание, если есть исключенные ингредиенты в ЛС
  useEffect(() => {
    const excludedItemsFromLS = ingredientsOff || [];
    const excludedItemsState = excludedItemsFromLS.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    setExcludedItems(excludedItemsState);
  }, [ingredientsOff]);

  const handleExcludeClick = (item) => {
    onClickExclude(item);
    setExcludedItems(prev => {
      return { ...prev, [item]: true }
    });
  };

  const handleAddClick = (item) => {
    onClickAdd(item);
    setExcludedItems(prev => {
      return { ...prev, [item]: false }
    });
  };

  return (
    <div className={styles.root}>
      <h4 className={styles.title}>{title}</h4>
      <ul className={`${styles.list} ${styles.list__alcohol} list-reset`}>
        {list.map((item, i) => (
          <li 
          className={`${styles.listItem} ${excludedItems[item] ? styles.listItem__exclude : ''}`} 
          key={item}>
            <button
              className={`${styles.button} ${styles.button__minus}`}
              type="button"
              aria-label={`Exclude ${item}`}
              onClick={() => { 
                handleExcludeClick(item)
              }}
            >
              -
            </button>
            {item}
            <button
              className={`${styles.button} ${styles.button__plus}`}
              type="button"
              aria-label={`Add ${item}`}
              onClick={() => handleAddClick(item)}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxList;

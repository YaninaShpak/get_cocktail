import React, { useState } from "react";

//styles
import styles from "./CheckboxList.module.scss";

const CheckboxList = ({ title, list, onClickExclude, onClickAdd }) => {
  const [excludedItems, setExcludedItems] = useState(reducer() || {});

  function reducer() {
    if (JSON.parse(localStorage.getItem('ingredientsOff'))) {
      const arr = JSON.parse(localStorage.getItem('ingredientsOff'));
      return arr.reduce((acc, cur) => {
        if(!acc[cur]) {
          acc[cur] = true;
        }
        
        return acc;
      }, {});
    }
  }

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

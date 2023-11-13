import React, { useState } from 'react';

//styles
import styles from './RadioBtnFilter.module.scss';

const options = ['Rum', 'Vodka', 'Gin', 'Tequila'];

const RadioBtnFilter = () => {
  const [dropdownList, setDropdownList] = useState(false);

  return (
    <div
      onClick={() => setDropdownList(!dropdownList)}
      className={`${styles.dropdown} ${dropdownList ? styles.show : ''} ${styles.filters__dropdown}`}>
      <div className={styles.dropdown__wrapper }>
        <label className={styles.dropdown__title}>
          <input
            className={styles.dropdown__input }
            id="main-ingredient"
            type="text"
            placeholder=""
            readOnly />
          <span className={`material-icons ${styles.dropdown__icon}`}>
            expand_more
          </span>
        </label>
        <ul className={`${styles.options} list-reset ${styles.dropdown__list}`}>
          {options.map((option) => (
            <li
              key={option.toLowerCase()}
              className={styles.options__item}>
              <label>
                <input
                  onChange=""
                  value={option}
                  type="radio"
                  name="ingredient"
                  id={option.toLowerCase()} />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RadioBtnFilter;
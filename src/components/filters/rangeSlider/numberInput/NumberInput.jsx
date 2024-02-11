import React from 'react';

import styles from './NumberInput.module.scss';

const NumberInput = ({title, value, min, max, onChange}) => {
  return (
    <div className={styles.field}>
          <span>{title}</span>
          <input
            type="number"
            className="inputMin"
            value={value}
            min={min}
            max={max}
            onChange={onChange}
          />
        </div>
  );
};

export default NumberInput;
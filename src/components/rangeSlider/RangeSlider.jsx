import React, { useState, useCallback } from 'react';

import debounce from 'lodash.debounce';

import styles from './RangeSlider.module.scss';

const RangeSlider = () => {
  //values for range
  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(100);

  //values for input namber
  const [valueNumMin, setValueNumMin] = useState(0);
  const [valueNumMax, setValueNumMax] = useState(100);

  //percents
  const [percentMin, setPercentMin] = useState(0);//left
  const [percentMax, setPercentMax] = useState(100);//right

  const rangeStep = 2;
  const max = 100;

  //change progress bar
  const handleRangeMin = (event) => {
    let newValue = parseInt(event.target.value);

    if (valueMax - newValue < rangeStep) {
      newValue =valueMax - rangeStep;
    } 
    setValueMin(newValue);
    setValueNumMin(newValue);
    setPercentMin((newValue / max) * 100);
  };

  const handleRangeMax = (event) => {
    let newValue = parseInt(event.target.value);

    if (newValue - valueMin < rangeStep) {
      newValue = valueMin + rangeStep;
    } 
    setValueMax(newValue);
    setValueNumMax(newValue);
    setPercentMax((newValue / max) * 100);
  };

  //change input number
  const debouncedHandleNumberMinChange = useCallback(
    debounce((newValue) => {
      if (newValue < valueMax) {
        setValueMin(newValue);
        setPercentMin((newValue / 100) * 100);
      }
    }, 800),
    []
  );

  const debouncedHandleNumberMaxChange = useCallback(
    debounce((newValue) => {
      if (newValue > valueMin) {
        setValueMax(newValue);
        setPercentMax((newValue / 100) * 100);
      }
    }, 800),
    []
  );

  const handleNumberMinChange = (e) => {
    let newValue = parseInt(e.target.value);
    if (newValue <= 100) {
      if (!isNaN(newValue)) {
        setValueNumMin(newValue);
        debouncedHandleNumberMinChange(newValue);
      } else {
        setValueNumMin('');
      }
    }
  };

  const handleNumberMaxChange = (e) => {
    let newValue = parseInt(e.target.value);

    if (newValue <=100) {
      if (!isNaN(newValue)) {
        setValueNumMax(newValue);
        debouncedHandleNumberMaxChange(newValue);
      } else {
        setValueNumMax('');
      }
    }
  };

  return (
    <div>
      <div className={styles.priceInput}>
      <div className={styles.field}>
        <span>Min</span>
        <input 
          type="number" 
          className="inputMin"
          value={valueNumMin}
          onChange={handleNumberMinChange}
          />
      </div>
      <div className="separator">-</div>
      <div className={styles.field}>
        <span>Max</span>
        <input 
          type="number" 
          className="inputMax"
          value={valueNumMax}
          onChange={handleNumberMaxChange}
          />
      </div>
    </div>
      <div className={styles.slider}>
        <div className={styles.progress} style={{ left: `${percentMin}%`, right:  `${100 - percentMax}%`}}></div>
      </div>
      <div className={styles.rangeInput}>
        <input
            className={styles.rangeInput__min}
            type="range"
            min="0"
            max="100"
            value={valueMin}
            onInput={handleRangeMin}
          />
        <input
          className={styles.rangeInput__max}
          type="range"
          min="0"
          max="100"
          value={valueMax}
          onInput={handleRangeMax}
        />
      </div>
    </div>
    
  );
}

export default RangeSlider;
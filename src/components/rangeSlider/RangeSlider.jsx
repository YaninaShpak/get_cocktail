import React, { useState } from 'react';

import styles from './RangeSlider.module.scss';

const RangeSlider = () => {
  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(100);
  const [percentMin, setPercentMin] = useState(0);//left
  const [percentMax, setPercentMax] = useState(100);//right

  const handleRangeMin = (event) => {
    setValueMin(parseInt(event.target.value));

    if (valueMax - valueMin < 10) {
      setValueMin(valueMax - 10);
    } else {
      setPercentMin((valueMin / event.target.max) * 100);
    }
  };

  const handleRangeMax = (event) => {
    setValueMax(parseInt(event.target.value));

    if (valueMax - valueMin < 10) {
      setValueMax(valueMin + 10);
    } else {
      setPercentMax((valueMax / event.target.max) * 100);
    }
  };

  const handleNumberMinChange = (event) => {
    setValueMin(event.target.value);
    setPercentMin((valueMin / event.target.max) * 100);
  };

  const handleNumberMaxChange = (event) => {
    setValueMax(parseInt(event.target.value));
    setPercentMax((valueMax / event.target.max) * 100);
    console.log(valueMax, percentMax)
  }

  return (
    <div>
      <div className={styles.priceInput}>
      <div className={styles.field}>
        <span>Min</span>
        <input 
          type="number" 
          className="inputMin"
          value={valueMin}
          onChange={handleNumberMinChange}
          />
      </div>
      <div className="separator">-</div>
      <div className={styles.field}>
        <span>Max</span>
        <input 
          type="number" 
          className="inputMax"
          value={valueMax}
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
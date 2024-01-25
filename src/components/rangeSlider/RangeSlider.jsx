import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {setValueMin, setValueMax} from  '../../redux/slices/rangeSliderSlice';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

import debounce from 'lodash.debounce';

import styles from './RangeSlider.module.scss';

const RangeSlider = () => {
  //values for range
  const {valueMin} = useSelector((state) => state.rangeSlider);
  const {valueMax} = useSelector((state) => state.rangeSlider);
  const dispatch = useDispatch();

  //values for input namber
  const [valueNumMin, setValueNumMin] = useState(3);
  const [valueNumMax, setValueNumMax] = useState(100);

  //percents
  const [percentMin, setPercentMin] = useState(0);//left
  const [percentMax, setPercentMax] = useState(100);//right

  const rangeStep = 2;
  const max = 100;

  //change progress bar
  const debonceHandleRangeMin = useCallback(
    debounce((x) => {
      dispatch(setValueMin(x));
      dispatch(setCurrentPage(1));
    }, 800), []
  );

  const debonceHandleRangeMax = useCallback(
    debounce((x) => {
      dispatch(setValueMax(x));
      dispatch(setCurrentPage(1));
    }, 800), []
  );

  const handleRangeMin = (event) => {
    let newValue = parseInt(event.target.value);

    if (valueMax - newValue < rangeStep) {
      newValue =valueMax - rangeStep;
    } 
    debonceHandleRangeMin(newValue);
    setValueNumMin(newValue);
    setPercentMin((newValue / max) * 100);
  };

  const handleRangeMax = (event) => {
    let newValue = parseInt(event.target.value);

    if (newValue - valueMin < rangeStep) {
      newValue = valueMin + rangeStep;
    } 
    debonceHandleRangeMax(newValue);
    setValueNumMax(newValue);
    setPercentMax((newValue / max) * 100);
  };

  //change input number
  const debouncedHandleNumberMinChange = useCallback(
    debounce((newValue) => {
      if (newValue < valueMax) {
        dispatch(setValueMin(newValue));
        dispatch(setCurrentPage(1));
        setPercentMin((newValue / 100) * 100);
      }
    }, 500),
    []
  );

  const debouncedHandleNumberMaxChange = useCallback(
    debounce((newValue) => {
      if (newValue > valueMin) {
        dispatch(setValueMax(newValue));
        dispatch(setCurrentPage(1))
        setPercentMax((newValue / 100) * 100);
      }
    }, 500),
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
            min="3"
            max="100"
            value={valueNumMin}
            onInput={handleRangeMin}
          />
        <input
          className={styles.rangeInput__max}
          type="range"
          min="0"
          max="100"
          value={valueNumMax}
          onInput={handleRangeMax}
        />
      </div>
    </div>
    
  );
}

export default RangeSlider;
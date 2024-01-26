import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setValueMin,
  setValueMax,
} from "../../../redux/slices/rangeSliderSlice";
import { setCurrentPage } from "../../../redux/slices/paginationSlice";

import debounce from "lodash.debounce";

import styles from "./RangeSlider.module.scss";

const RangeSlider = () => {
  //values for range
  const { valueMin } = useSelector((state) => state.rangeSlider);
  const { valueMax } = useSelector((state) => state.rangeSlider);
  const { subcategory } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  //values for input namber
  const [valueNumMin, setValueNumMin] = useState(3);
  const [valueNumMax, setValueNumMax] = useState(100);

  //percents
  const [percentMin, setPercentMin] = useState(0); //left
  const [percentMax, setPercentMax] = useState(100); //right

  const calculatePercent = (value, min, max) => ((value - min) / (max - min)) * 100;

  const rangeStep = 2;
  let min = 3;
  const max = useRef(100);

  useEffect(() => {
    if (subcategory === "low alcohol") {
      max.current = 20;

      setValueNumMin(3);
      setValueNumMax(20);
      
      dispatch(setValueMin(3));
      dispatch(setValueMax(20));
      
      setPercentMin(0);
      setPercentMax(100);
    } else {
      max.current = 100;

      setValueNumMin(3);
      setValueNumMax(100);

      dispatch(setValueMin(3));
      dispatch(setValueMax(100));

      setPercentMin(0);
      setPercentMax(100);
    }
  }, [subcategory]);

  //change progress bar
  const debonceHandleRangeMin = useCallback(
    debounce((x) => {
      dispatch(setValueMin(x));
      dispatch(setCurrentPage(1));
    }, 800),
    []
  );

  const debonceHandleRangeMax = useCallback(
    debounce((x) => {
      dispatch(setValueMax(x));
      dispatch(setCurrentPage(1));
    }, 800),
    []
  );

  const handleRangeMin = (event) => {
    let newValue = parseInt(event.target.value);

    if (valueMax - newValue < rangeStep) {
      newValue = valueMax - rangeStep;
    }
    debonceHandleRangeMin(newValue);
    setValueNumMin(newValue);
    setPercentMin(calculatePercent(newValue, min, max.current));
  };

  const handleRangeMax = (event) => {
    let newValue = parseInt(event.target.value);

    if (newValue - valueMin < rangeStep) {
      newValue = valueMin + rangeStep;
    }
    debonceHandleRangeMax(newValue);
    setValueNumMax(newValue);
    setPercentMax(calculatePercent(newValue, min, max.current));
  };

  //change input number
  const debouncedHandleNumberMinChange = useCallback(
    debounce((newValue) => {
      if (newValue < valueMax) {
        dispatch(setValueMin(newValue));
        dispatch(setCurrentPage(1));
        setPercentMin(calculatePercent(newValue, min, max.current));
      }
    }, 500),
    []
  );

  const debouncedHandleNumberMaxChange = useCallback(
    debounce((newValue) => {
      if (newValue > valueMin) {
        dispatch(setValueMax(newValue));
        dispatch(setCurrentPage(1));
        setPercentMax(calculatePercent(newValue, min, max.current));
      }
    }, 500),
    []
  );

  const handleNumberMinChange = (e) => {
    let newValue = parseInt(e.target.value);
    if (newValue <= max.current) {
      if (!isNaN(newValue)) {
        setValueNumMin(newValue);
        debouncedHandleNumberMinChange(newValue);
      } else {
        setValueNumMin("");
      }
    }
  };

  const handleNumberMaxChange = (e) => {
    let newValue = parseInt(e.target.value);

    if (newValue <= max.current) {
      if (!isNaN(newValue)) {
        setValueNumMax(newValue);
        debouncedHandleNumberMaxChange(newValue);
      } else {
        setValueNumMax("");
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
        <div
          className={styles.progress}
          style={{ 
            left: `${percentMin}%`, 
            right: `${100 - percentMax}%` }}></div>
      </div>
      <div className={styles.rangeInput}>
        <input
          className={styles.rangeInput__min}
          type="range"
          min={min}
          max={max.current}
          value={valueNumMin}
          onInput={handleRangeMin}
        />
        <input
          className={styles.rangeInput__max}
          type="range"
          min={min}
          max={max.current}
          value={valueNumMax}
          onInput={handleRangeMax}
        />
      </div>
    </div>
  );
};

export default RangeSlider;

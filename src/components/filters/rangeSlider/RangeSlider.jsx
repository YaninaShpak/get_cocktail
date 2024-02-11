import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import debounce from "lodash.debounce";

import {
  setValueMin,
  setValueMax,
} from "../../../redux/slices/rangeSliderSlice";
import { setCurrentPage } from "../../../redux/slices/paginationSlice";

//components
import NumberInput from "./numberInput/NumberInput";
import RangeInput from "./rangeInput/RangeInput";

import styles from "./RangeSlider.module.scss";

const RangeSlider = () => {
  const dispatch = useDispatch();
  //values for api
  const { valueMin, valueMax } = useSelector((state) => state.rangeSlider);
  const { currentSubCategory } = useSelector((state) => state.filter);

  //values for input number
  const [valueNumMin, setValueNumMin] = useState(3);
  const [valueNumMax, setValueNumMax] = useState(100);

  //values for range input
  const [valueRangeMin, setValueRangeMin] = useState(3);
  const [valueRangeMax, setValueRangeMax] = useState(100);

  //percents
  const [percentMin, setPercentMin] = useState(0); //left
  const [percentMax, setPercentMax] = useState(100); //right

  const calculatePercent = (value, min, max) =>
    ((value - min) / (max - min)) * 100;

  const rangeStep = 2;
  const min = useRef(3);
  const max = useRef(100);

  //изменение начальныго и конечного значения в зав-ти от выбранной подкатегории
  useEffect(() => {
    const newMax = currentSubCategory === "low alcohol" ? 20 : 100;

    max.current = newMax;

    setValueNumMin(3);
    setValueNumMax(newMax);

    setValueRangeMin(3);
    setValueRangeMax(newMax);

    dispatch(setValueMin(3));
    dispatch(setValueMax(newMax));

    setPercentMin(0);
    setPercentMax(100);
  }, [currentSubCategory, dispatch]);

  //значение инпута при передвижении прогресс бара кладем в дебонс,
  //чтобы не нагружать сервер запросами
  const debounceHandleRangeMin = useCallback(
    debounce((x) => {
      dispatch(setValueMin(x));
    }, 800),
    [dispatch, setValueMin]
  );

  const debounceHandleRangeMax = useCallback(
    debounce((x) => {
      dispatch(setValueMax(x));
    }, 800),
    [dispatch, setValueMax]
  );

  //change progress bar
  const handleRangeMin = (event) => {
    let newValue = parseInt(event.target.value);

    if (valueMax - newValue < rangeStep) {
      newValue = valueMax - rangeStep;
    }
    debounceHandleRangeMin(newValue);
    setValueNumMin(newValue);
    setValueRangeMin(newValue);
    setPercentMin(calculatePercent(newValue, min.current, max.current));
    dispatch(setCurrentPage(1));
  };

  const handleRangeMax = (event) => {
    let newValue = parseInt(event.target.value);

    if (newValue - valueMin < rangeStep) {
      newValue = valueMin + rangeStep;
    }
    debounceHandleRangeMax(newValue);
    setValueNumMax(newValue);
    setValueRangeMax(newValue);
    setPercentMax(calculatePercent(newValue, min.current, max.current));
    dispatch(setCurrentPage(1));
  };

  //change input number
  const debouncedHandleNumberMinChange = useCallback(
    debounce((newValue) => {
      if (newValue < valueMax) {
        dispatch(setValueMin(newValue));
        setValueRangeMin(newValue);
        setPercentMin(calculatePercent(newValue, min.current, max.current));
      }
    }, 600),
    []
  );

  const debouncedHandleNumberMaxChange = useCallback(
    debounce((newValue) => {
      if (newValue > valueMin) {
        dispatch(setValueMax(newValue));
        setValueRangeMax(newValue);
        setPercentMax(calculatePercent(newValue, min.current, max.current));
      }
    }, 600),
    []
  );

  const handleNumberMinChange = (e) => {
    let newValue = parseInt(e.target.value);
    if (newValue <= max.current) {
      if (!isNaN(newValue)) {
        setValueNumMin(newValue);
        debouncedHandleNumberMinChange(newValue);
        dispatch(setCurrentPage(1));
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
        dispatch(setCurrentPage(1));
      } else {
        setValueNumMax("");
      }
    }
  };

  return (
    <div>
      <div className={styles.numberInput}>
        <NumberInput
          title="Min"
          value={valueNumMin}
          min={min.current}
          max={90}
          onChange={handleNumberMinChange}
        />
        <div className="separator">-</div>
        <NumberInput
          title="Max"
          value={valueNumMax}
          min={5}
          max={max.current}
          onChange={handleNumberMaxChange}
        />
      </div>
      <div className={styles.slider}>
        <div
          className={styles.progress}
          style={{
            left: `${percentMin}%`,
            right: `${100 - percentMax}%`,
          }}
        ></div>
      </div>
      <div className={styles.rangeInput}>
        <RangeInput
          min={min.current}
          max={max.current}
          value={valueRangeMin}
          onInput={handleRangeMin}
        />
        <RangeInput
          min={min.current}
          max={max.current}
          value={valueRangeMax}
          onInput={handleRangeMax}
        />
      </div>
    </div>
  );
};

export default RangeSlider;

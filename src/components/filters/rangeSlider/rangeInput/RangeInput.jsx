import React from 'react';

const RangeInput = ({min, max, value, onInput}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onInput={onInput}
    />
  );
};

export default RangeInput;
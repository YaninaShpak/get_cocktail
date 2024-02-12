import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueMin: 3,
  valueMax: 100,
};

export const rangeSliderSlice = createSlice({
  name: "rangeSlider",
  initialState,
  reducers: {
    setValueMin: (state, action) => {
      state.valueMin = action.payload;
    },
    setValueMax: (state, action) => {
      state.valueMax = action.payload;
    },
  },
});

export const { setValueMin, setValueMax } = rangeSliderSlice.actions;
export default rangeSliderSlice.reducer;

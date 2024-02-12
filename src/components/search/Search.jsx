import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/slices/searchSlice";
import { setCurrentPage } from "../../redux/slices/paginationSlice";

import debounce from "lodash.debounce";

import ClearIcon from "../icons/clearIcon/ClearIcon";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const inputRef = useRef();

  const updatedSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      dispatch(setCurrentPage(1));
    }, 800),
    []
  );

  const onChangeSearch = ({ target: { value } }) => {
    setValue(value);
    updatedSearchValue(value);
  };

  const clearSearch = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        onChange={onChangeSearch}
        value={value}
        className={styles.input}
        id="search"
        type="text"
        placeholder="Search"
      />
      {value && <ClearIcon onClick={clearSearch} />}
    </div>
  );
};

export default Search;

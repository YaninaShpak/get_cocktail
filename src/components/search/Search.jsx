import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchValue } from "../../redux/slices/searchSlice";
import { setCurrentPage } from "../../redux/slices/paginationSlice";

import debounce from "lodash.debounce";

import ClearIcon from "../icons/clearIcon/ClearIcon";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const {searchValue} = useSelector((state) => state.search);
  const [value, setValue] = useState("");

  const inputRef = useRef();

  const updatedSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str.trim()));
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
        value={value ? value : searchValue}
        className={styles.input}
        id="search"
        type="text"
        placeholder="Search"
      />
      {(value || searchValue) && <ClearIcon onClick={clearSearch} />}
    </div>
  );
};

export default Search;

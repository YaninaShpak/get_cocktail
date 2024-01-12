import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/searchSlice';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

//styles
import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();

  const clearSearch = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  const updatedSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      dispatch(setCurrentPage(1))
    }, 800), []);

  const onChangeSearch = (e) => {
    setValue(e.target.value);
    updatedSearchValue(e.target.value);
  }

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        onChange={onChangeSearch}
        value={value}
        className={styles.input}
        id="search"
        type="text"
        placeholder='Search'
      />
      {value &&
        <svg
          className={styles.iconClear} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
          onClick={clearSearch}
        >
          <path d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"></path>
        </svg>
      }
    </div>
  );
};

export default Search;
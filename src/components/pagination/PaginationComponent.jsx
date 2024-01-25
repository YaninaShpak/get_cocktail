import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/paginationSlice';

//styles
import styles from './PaginationComponent.module.scss';

const PaginationComponent = () => {
  const {currentPage} = useSelector((state) => state.pagination);
  const {countItems} = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  const itemsPerPage = 9;
  const totalItems = countItems;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.wrapper}>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`${styles.root} ${page === currentPage ? styles.current : null}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationComponent;
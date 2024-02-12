import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentPage } from "../../redux/slices/paginationSlice";

import styles from "./PaginationComponent.module.scss";

const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { currentPage, countItems } = useSelector((state) => state.pagination);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(countItems / itemsPerPage);

  const pages = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      // Всегда добавляем первую и последнюю страницу
      if (i === 1 || i === totalPages) {
        pages.push(i);
      } 
      // Добавляем 1 страницу перед и после текущей страницы
      else if (i >= currentPage - 1 && i <= currentPage + 1) {
        pages.push(i);
      } 
      // Добавляем многоточие вместо группы страниц
      else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    // Удаление повторяющихся многоточий
    return pages.filter((page, index, self) => page !== '...' || self[index - 1] !== '...');

    }, [totalPages, currentPage]
  );

  const handleClick = (page) => {
    if (page !== '...') {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className={styles.wrapper}>
      {pages.map((page, i) => (
        <button
          key={i}
          onClick={() => handleClick(page)}
          className={`${styles.root} ${
            page === currentPage ? styles.current : null
          }`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationComponent;

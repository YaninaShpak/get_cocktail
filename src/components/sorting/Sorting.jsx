import React, { useEffect, useMemo, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setSorting } from "../../redux/slices/sortingSlice";

import styles from "./Sorting.module.scss";

import { sortList } from "../../data/sortList";

const Sorting = () => {
  const dispatch = useDispatch();
  const { sorting } = useSelector((state) => state.sort);
  const { currentCategory } = useSelector((state) => state.filter);

  const [showSort, setShowSort] = useState(false);

  const sortRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSort(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSort(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [])

  const changeSortList = useMemo(() => {
    return currentCategory === "Non alcoholic"
        ? sortList.filter((el) => !el.nameItem.includes("strength"))
        : sortList;
  }, [currentCategory]);

  const toggleShowSort = () => setShowSort(!showSort);
  const handleSortItemClick = (item) => {
    dispatch(setSorting(item));
    setShowSort(false);
  };

  return (
    <div ref={sortRef} className={styles.sorting}>
      <h2 className={`title ${styles.sorting__title}`}>
        Sort by&nbsp;
        <span onClick={toggleShowSort}>{sorting.nameItem}</span>
      </h2>
      <ul className={`${styles.sortingList} list-reset`}>
        {showSort &&
          changeSortList.map((item) => (
            <li
              key={item.nameItem}
              className={`${styles.sortingList__item} ${
                sorting.nameItem === item.nameItem ? styles.current : ""
              }`}
              onClick={() => handleSortItemClick(item)}
            >
              {item.nameItem}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sorting;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSorting } from '../../redux/slices/sortingSlice';

//styles
import styles from './Sorting.module.scss';

const sortList = [
  { nameItem: 'popularity', nameSort: '' },
  { nameItem: 'alphabet', nameSort: 'title' },
  { nameItem: 'strength (stronger)', nameSort: 'totalStrength', order: 'desc' },
  { nameItem: 'strength (weak)', nameSort: 'totalStrength', order: 'asc'}
];

const Sorting = () => {
  const sort = useSelector((state) => state.sort.sorting);
  const { category } = useSelector((state) => state.filter); 
  const dispatch = useDispatch();

  const [showSort, setShowSort] = useState(false);

  const sortRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setShowSort(false);
      }
    }

    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    }
  }, []);

  const changeSortList = useCallback(() => {
    let newSortList;
    
    if (category === 'Non alcoholic') {
      newSortList = sortList.filter((el) => !el.nameItem.includes('strength'));
    } else {
      newSortList = sortList;
    }

    return newSortList;
  }, [category]);

  return (
    <div
      ref={sortRef}
      className={styles.sorting}
    >
      <h2 className={`title ${styles.sorting__title}`}>Sort by&nbsp;
        <span onClick={() => setShowSort(!showSort)}>{ sort.nameItem}</span>
      </h2>
      <ul className={`${styles.sortingList} list-reset`}>
          {showSort && changeSortList().map((item) => (
            <li
              key={item.nameItem}
              className={`${styles.sortingList__item} ${sort.nameItem === item.nameItem ? styles.current : ''}`}
              onClick={() => {
                dispatch(setSorting(item))
                setShowSort(false)
              }}
            >
                {item.nameItem}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Sorting;
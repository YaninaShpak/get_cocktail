import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSubCategory } from '../../../redux/slices/filterSlice';

//styles
import styles from './SubcategoriesFilter.module.scss';



const SubcategoriesFilter = () => {
  const subcategories = ['low alcohol', 'strong'];
  const {currentSubCategory} = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Strength</h3>
      <ul className={`${styles.list} list-reset`}>
        {subcategories.map((item) => 
        <li 
          className={`${styles.listItem} ${item === currentSubCategory ? styles.current : ''}`}
          key={item}
          onClick={() => dispatch(setCurrentSubCategory(item))}
        >
          {item}
        </li>)}
      </ul>
    </div>
  );
};

export default SubcategoriesFilter;
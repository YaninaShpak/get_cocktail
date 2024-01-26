import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSubCategory } from '../../../redux/slices/filterSlice';

//styles
import styles from './SubcategoriesFilter.module.scss';



const SubcategoriesFilter = () => {
  const subcategories = ['low alcohol', 'strong'];
  const {subcategory} = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Strength</h3>
      <ul className={`${styles.list} list-reset`}>
        {subcategories.map((item) => 
        <li 
          className={`${styles.listItem} ${item === subcategory ? styles.current : ''}`}
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
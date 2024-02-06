import { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentCategory } from '../../../redux/slices/filterSlice';
import { setSorting } from '../../../redux/slices/sortingSlice';
import { setCurrentPage } from '../../../redux/slices/paginationSlice';

//styles
import styles from './CategoriesFilter.module.scss';


const categories = ['All', 'Alcoholic', 'Non alcoholic'];

const CategoriesFilter = memo(() => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.filter.category);

  const onChangeCategory = useCallback((category) => {
    console.log('ok')
    dispatch(setCurrentCategory(category));
    category === 'Non alcoholic' && dispatch(setSorting({ nameItem: 'popularity', nameSort: '' }));
    dispatch(setCurrentPage(1))
  }, []);

  return (
    <div className='categories'>
      <ul className={`${styles.categoriesList} list-reset`}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`${styles.categoriesList__item} ${currentCategory === category ? styles.current : '' }`}
            onClick={() => onChangeCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CategoriesFilter;
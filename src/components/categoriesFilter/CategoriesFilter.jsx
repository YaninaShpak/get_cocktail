import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCategory } from '../../redux/slices/filterSlice';

//styles
import styles from './CategoriesFilter.module.scss';

const categories = ['All', 'Alcoholic', 'Non alcoholic'];

const CategoriesFilter = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.filter.category);

  return (
    <div className='categories'>
      <ul className={`${styles.categoriesList} list-reset`}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`${styles.categoriesList__item} ${currentCategory === category ? styles.current : '' }`}
            onClick={() => dispatch(setCurrentCategory(category))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesFilter;
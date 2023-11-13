//styles
import styles from './CategoriesFilter.module.scss';

const categories = ['All', 'Alcoholic', 'Non-alcoholic'];

const CategoriesFilter = () => {
  return (
    <div className='categories'>
      <ul className={`${styles.categoriesList} list-reset`}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={styles.categoriesList__item}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesFilter;
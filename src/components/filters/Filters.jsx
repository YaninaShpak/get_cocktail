//styles
import styles from './Filters.module.scss';

//components
import CategoriesFilter from '../categoriesFilter/CategoriesFilter';
import RadioFilter from '../radioFilter/RadioFilter';

const Filters = () => {
  return (
    <section className={`${styles.filters} content-container__filters`}>
      <div className={styles.filters__titleWrapper}>
        <h2 className={`title ${styles.filters__title}`}>Filters</h2>
      </div>
      <div className={styles.filters__wrapper}>
        <CategoriesFilter />
        <RadioFilter />
      </div>
    </section>
  );
};

export default Filters;
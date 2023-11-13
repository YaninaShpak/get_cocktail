//styles
import styles from './Filters.module.scss';

//components
import CategoriesFilter from '../categoriesFilter/CategoriesFilter';
import RadioBtnFilter from '../radiobtnFilter/RadioBtnFilter';

const Filters = () => {
  return (
    <section className={`${styles.filters} content-container__filters`}>
      <h2 className={`title ${styles.filters__title}`}>Filters</h2>
      <CategoriesFilter />
      <RadioBtnFilter />
    </section>
  );
};

export default Filters;
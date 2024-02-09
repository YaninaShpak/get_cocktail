import { useSelector } from 'react-redux';

//styles
import styles from './Filters.module.scss';

//components
import CategoriesFilter from './categoriesFilter/CategoriesFilter';
import RadioFilter from './radioFilter/RadioFilter';
import RangeSlider from './rangeSlider/RangeSlider';
import SubcategoriesFilter from './subcategoriesFilter/SubcategoriesFilter';
import CheckboxFilter from './checkboxFilter/CheckboxFilter';
import ClearButton from '../buttons/clearButton/ClearButton';

const Filters = () => {
  const { currentCategory } = useSelector((state) => state.filter);
  return (
    <section className={`${styles.filters} content-container__filters`}>
      <div className={styles.filters__titleWrapper}>
        <h2 className={`title ${styles.filters__title}`}>Filters</h2>
      </div>
      <div className={styles.filters__wrapper}>
        <CategoriesFilter />
        <RadioFilter />
        {currentCategory === 'Alcoholic' && <RangeSlider/>}
        {currentCategory === 'Alcoholic' && <SubcategoriesFilter/>}
        <CheckboxFilter/>
        <ClearButton/>
      </div>
    </section>
  );
};

export default Filters;
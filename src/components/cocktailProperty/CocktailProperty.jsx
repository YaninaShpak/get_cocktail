import React from 'react';

//styles
import styles from './CocktailProperty.module.scss';

const CocktailProperty = ({title, desc}) => {
  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default CocktailProperty;
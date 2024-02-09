import React from 'react';

import styles from './CocktailProperty.module.scss';

const CocktailProperty = ({title, desc}) => {
  return (
    <div className={styles.root}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default CocktailProperty;
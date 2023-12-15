import React from 'react';

//components
import CocktailProperty from '../cocktailProperty/CocktailProperty';

//styles
import styles from './CocktailCard.module.scss';

const CocktailCard = ({item}) => {
    return (
        <div className={styles.root}>
        <div className={styles.root__info}>
          <h1>{item.Title}</h1>
          <div className={styles.root__ingredients}>
            <h2>Ingredients</h2>
            <ul className={`${styles.ingredientsList} list-reset`}>
            {item.Ingredients?.map((el, i) => 
              <li className={styles.ingredientsList__item} key={item.id + i}>
                <p className={styles.ingredientsList__name}>{el}</p>
                <p className={styles.ingredientsList__amount}>{item.Measures[i]}</p>
              </li>
            )}
            </ul>
          </div>
          <div className={styles.root__instruction}>
            <h2>Instructions</h2>
            <p>{item.Instructions}</p>
          </div>
          <CocktailProperty title="Alcoholic" desc={item.Alcoholic} />
          <CocktailProperty title="Category" desc={item.Category} />
          <CocktailProperty title="Glass" desc={item.Glass} />
          {item.totalStrength &&
            <CocktailProperty title="TotalStrength" desc={item.totalStrength} />
          }
        </div>
        <div className={styles.root__img}>
          <img src={item.Img} alt={item.Title} />
        </div>
        
      </div>
    );
};

export default CocktailCard;
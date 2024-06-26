import React from "react";

import CocktailProperty from "../cocktailProperty/CocktailProperty";
import BackButton from "../buttons/backButton/BackButton";

import styles from "./CocktailCard.module.scss";

const CocktailCard = ({ item }) => {
  const {
    Title,
    Ingredients,
    Instructions,
    Alcoholic,
    Category,
    Glass,
    totalStrength,
    Img,
    id,
    Measures,
  } = item;
  return (
    <div className={styles.root}>
      <div className={styles.root__info}>
        <h2>{Title}</h2>
        <div className={styles.root__ingredients}>
          <h3 className={styles.root__subTitle}>Ingredients</h3>
          <ul className={`${styles.ingredientsList} list-reset`}>
            {Ingredients?.map((el, i) => (
              <li className={styles.ingredientsList__item} key={`${id}-${i}`}>
                <p className={styles.ingredientsList__name}>{el}</p>
                <p className={styles.ingredientsList__amount}>{Measures?.[i]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.root__instruction}>
          <h3 className={styles.root__subTitle}>Instructions</h3>
          <p>{Instructions}</p>
        </div>
        <CocktailProperty title="Alcoholic" desc={Alcoholic} />
        <CocktailProperty title="Category" desc={Category} />
        <CocktailProperty title="Glass" desc={Glass} />
        {totalStrength && (
          <CocktailProperty title="Total Strength" desc={totalStrength} />
        )}
      </div>
      <div className={styles.root__img}>
        <img src={Img} alt={Title} />
      </div>
      <BackButton to="/" />
    </div>
  );
};

export default CocktailCard;

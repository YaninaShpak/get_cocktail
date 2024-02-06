import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIngredientsOff, setIngredientsOn } from '../../../redux/slices/filterSlice';
import { setCurrentPage } from '../../../redux/slices/paginationSlice';

//styles
import styles from './CheckboxFilter.module.scss';
import CheckboxList from './CheckboxList/CheckboxList';

const ingredients = {
  alcohol: [
    "Amaretto",
    "Angostura Bitters",
    "Aperol",
    "Schnapps",
    "Brandy",
    "Cider",
    "Applejack",
    "Baileys irish cream",
    "Banana Liqueur",
    "Benedictine",
    "Bitters",
    "Blended whiskey",
    "Curacao",
    "Bourbon",
    "Campari",
    "Champagne",
    "Coconut liqueur",
    "Cognac",
    "Cointreau",
    "Liqueur",
    "Dark rum",
    "Gin", 
    "Ginger ale", 
    "Ginger beer",
    "Jägermeister", 
    "Kahlua",
    "Kirschwasser",
    "Lager",
    "Light rum",  
    "Malibu rum",
    "Prosecco",
    "Rum",
    "Scotch",
    "Sherry",
    "Tequila",
    "Tonic water",
    "Vermouth",
    "Vodka",
    "Whiskey",
    "White Wine",
    "Red Wine",
  ], 
  nonAlcohol: [
    "7-Up",
    "Almond flavoring",
    "Anise",
    "Apple juice",
    "Soda",
    "Coca-Cola",
    "Coffee",
    "Cranberry Juice", 
    "Cream",
    "Egg White",
    "Lemon Juice", 
    "Lime Juice", 
    "Fruit juice",
    "Grapefruit juice",
    "Grenadine",
    "Hot chocolate",
    "Lemonade",
    "Milk",
    "Orange Juice",
    "Peach nectar",
    "Pineapple Juice",
    "Schweppes",
    "Sprite",
    "Tea",
    "Ice-cream",
  ]
};

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.filter);

  const excludeIngredients = (item) => {
    dispatch(setIngredientsOff(item));

    dispatch(setCurrentPage(1));
  }

  const addIngredients = (item) => {
    dispatch(setIngredientsOn(item));
    dispatch(setCurrentPage(1));
  }
  
  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.title}>Add/Exclude ingredients</h3>
      {category !== 'Non alcoholic' && <CheckboxList 
        title="Alcohol"
        list={ingredients.alcohol}
        onClickExclude={excludeIngredients}
        onClickAdd={addIngredients}
      />}
      <CheckboxList 
        title="Non Alcohol"
        list={ingredients.nonAlcohol}
        onClickExclude={excludeIngredients}
        onClickAdd={addIngredients}
      />
    </div>
  );
};

export default CheckboxFilter;
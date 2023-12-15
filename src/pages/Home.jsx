import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//components
import CocktailCardMini from "../components/cocktailCardMini/CocktailCardMini";
import Filters from "../components/filters/Filters";
import SkeletonCocktailCardMini from "../components/cocktailCardMini/SkeletonCocktailCardMini";
import Sorting from "../components/sorting/Sorting";
import Search from "../components/search/Search";
import RandomCocktailButton from "../components/buttons/RandomCocktailButton/RandomCocktailButton";

//states
import { setItems } from '../redux/slices/cocktailListSlice';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { items } = useSelector((state) => state.cocktailList)
  const { category, baseIngredient } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sort);
  const searchValue = useSelector((state) => state.search.searchValue);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://64f762d19d775408495385e6.mockapi.io/items?sortBy=${sorting.nameSort}&order=${sorting.order ? sorting.order : ''}`)
      .then(({ data }) =>
        category !== "All"
          ? data.filter(
              (el) => el.Alcoholic.toLowerCase() === category.toLowerCase()
            )
          : data
      )
      .then((data) => {
        return (
          data.filter((item) =>
            item.Ingredients.some((el) =>
              el.toLowerCase().includes(baseIngredient.toLowerCase())
            )
          ) ?? data
        );
      })
      .then((data) => data.filter((el) => el.Title.toLowerCase().includes(searchValue.toLowerCase())))
      .then((data) => {
        dispatch(setItems(data));
        setIsLoading(false);
      });
    
  }, [category, baseIngredient, sorting, searchValue]);

  const skeletons = Array.from({length: 3}, (_, index) => (<SkeletonCocktailCardMini key={index} />));

  const isItems = () => {
    if (isLoading) {
      return skeletons;
    } else {
      if (items.length === 0) {
        return "Nothing found";
      } else {
        return items.map((el) => (
          <CocktailCardMini
            key={el.id}
            link={el.id}
            title={el.Title}
            imgUrl={el.Img}
            strength={el.totalStrength}
          />
        ));
      }
    }
  };
  return (
    <div className="container content-container">
      <h1 className="visually-hidden">Cocktail choice</h1>
        <Filters />
        <div className="actions-wrapper content-container__actions">
          <Search/>
          <Sorting/>
          <RandomCocktailButton/>
        </div>
        <section className="cocktails content-container__cocktails">
          <h2 className="visually-hidden">Cocktails list</h2>
          <ul className="cocktails-list list-reset cocktails__list">
            {isItems()}
          </ul>
        </section>
    </div>
  );
};

export default Home;
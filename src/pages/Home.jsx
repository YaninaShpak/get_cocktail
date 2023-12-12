import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import Filters from "../components/filters/Filters";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";
import Sorting from "../components/sorting/Sorting";
import Search from "../components/search/Search";
import RandomCocktailButton from "../components/buttons/RandomCocktailButton/RandomCocktailButton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { category, baseIngredient } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sort);
  const searchValue = useSelector((state) => state.search.searchValue);

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
        setItems(data);
        setIsLoading(false);
      });
    
  }, [category, baseIngredient, sorting, searchValue]);

  const skeletons = [...Array(3)].map((_, index) => (
    <SkeletonCocktailCard key={index} />
  ));

  const isItems = () => {
    if (isLoading) {
      return skeletons;
    } else {
      if (items.length === 0) {
        return "Nothing found";
      } else {
        return items.map((el) => (
          <CocktailCard
            key={el.id}
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
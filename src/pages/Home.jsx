import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../redux/slices/cocktailListSlice";
import { setCountItems } from "../redux/slices/paginationSlice";

import axios from "axios";

//components
import CocktailCardMini from "../components/cocktailCardMini/CocktailCardMini";
import Filters from "../components/filters/Filters";
import SkeletonCocktailCardMini from "../components/cocktailCardMini/SkeletonCocktailCardMini";
import Sorting from "../components/sorting/Sorting";
import Search from "../components/search/Search";
import RandomCocktailButton from "../components/buttons/randomCocktailButton/RandomCocktailButton";
import PaginationComponent from "../components/pagination/PaginationComponent";

import {
  filterCategory,
  filterBaseIngredient,
  search,
  filterSubCategory,
  filterTotalStrength,
  filterExcludeIngredients
} from "../utils/filters";

import saveToLocalStorage from "../utils/saveToLocalStorage";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { items } = useSelector((state) => state.cocktailList);
  const {
    currentCategory,
    currentSubCategory,
    baseIngredient,
    excludeIngredients
  } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sort);
  const { searchValue } = useSelector((state) => state.search);
  const { currentPage } = useSelector((state) => state.pagination);
  const { valueMin, valueMax } = useSelector((state) => state.rangeSlider);

  const dispatch = useDispatch();

  const saveFiltersToLocalStorage = () => {
    saveToLocalStorage("currentCategory", currentCategory);
    saveToLocalStorage("currentSubCategory", currentSubCategory);
    saveToLocalStorage("baseIngredient", baseIngredient);
    saveToLocalStorage("excludeIngredients", excludeIngredients);
    saveToLocalStorage("currentPage", currentPage);
    saveToLocalStorage("sorting", sorting);
  }

  const getCocktails = async () => {
    try {
      const response = await axios
        .get(
          `https://64f762d19d775408495385e6.mockapi.io/cocktails?&sortBy=${
            sorting.nameSort
          }&order=${sorting.order ? sorting.order : ""}`
        )
        .then(({ data }) => filterCategory(currentCategory, "All", data))
        .then((data) => filterBaseIngredient(baseIngredient, data))
        .then((data) => search(searchValue, data))
        .then((data) => filterSubCategory(currentSubCategory, data))
        .then((data) => filterExcludeIngredients(excludeIngredients, data))
        .then((data) =>
          filterTotalStrength(currentCategory, valueMin, valueMax, data)
        );

      dispatch(setCountItems(response.length));
      const page = response.slice(currentPage * 9 - 9, currentPage * 9);
      dispatch(setItems(page));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCocktails();
  }, [
    currentCategory,
    baseIngredient,
    sorting,
    searchValue,
    currentPage,
    valueMin,
    valueMax,
    currentSubCategory,
    excludeIngredients
  ]);

  const skeletons = Array.from({ length: 3 }, (_, index) => (
    <SkeletonCocktailCardMini key={index} />
  ));

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
            onClick={saveFiltersToLocalStorage}
          />
        ));
      }
    }
  };
  return (
    <div className="container contentContainer">
      <h1 className="visually-hidden">Cocktail choice</h1>
      <Filters />
      <section className="actionsWrapper contentContainer__actions">
        <Sorting />
        <Search />
      </section>
      <section className="cocktails contentContainer__cocktails">
        <h2 className="visually-hidden">Cocktails list</h2>
        <ul className="cocktailsList list-reset cocktails__list">
          {isItems()}
        </ul>
        <PaginationComponent />
      </section>
    </div>
  );
};

export default Home;

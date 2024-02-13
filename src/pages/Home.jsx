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
import RandomCocktailButton from "../components/buttons/RandomCocktailButton/RandomCocktailButton";
import PaginationComponent from "../components/pagination/PaginationComponent";

import {
  filterCategory,
  filterBaseIngredient,
  filterIncludeIngredients,
  filterExcludeIngredients,
  search,
  filterSubCategory,
  filterTotalStrength
} from "../utils/filters";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { items } = useSelector((state) => state.cocktailList);
  const {
    currentCategory,
    currentSubCategory,
    baseIngredient,
    ingredientsOff,
    ingredientsOn,
  } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sort);
  const { searchValue } = useSelector((state) => state.search);
  const { currentPage } = useSelector((state) => state.pagination);
  const { valueMin, valueMax } = useSelector((state) => state.rangeSlider);

  const dispatch = useDispatch();

  function saveFiltersToLocalStorage() {
    localStorage.setItem("currentCategory", JSON.stringify(currentCategory));
    localStorage.setItem(
      "currentSubCategory",
      JSON.stringify(currentSubCategory)
    );
    localStorage.setItem("baseIngredient", JSON.stringify(baseIngredient));
    localStorage.setItem("ingredientsOff", JSON.stringify(ingredientsOff));
    localStorage.setItem("ingredientsOn", JSON.stringify(ingredientsOn));
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
    localStorage.setItem("sorting", JSON.stringify(sorting));
  }

  const getCocktails = async () => {
    try {
      const res = await axios
        .get(
          `https://64f762d19d775408495385e6.mockapi.io/cocktails?&sortBy=${
            sorting.nameSort
          }&order=${sorting.order ? sorting.order : ""}`
        )
        .then(({ data }) => filterCategory(currentCategory, "All", data))
        .then((data) => filterBaseIngredient(baseIngredient, data))
        .then((data) => filterIncludeIngredients(ingredientsOn, data))
        .then((data) => filterExcludeIngredients(ingredientsOff, data))
        .then((data) => search(searchValue, data))
        .then((data) => filterSubCategory(currentSubCategory, data))
        .then((data) => filterTotalStrength(currentCategory, valueMin, valueMax, data)
        );

      dispatch(setCountItems(res.length));
      const page = res.slice(currentPage * 9 - 9, currentPage * 9);
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
    ingredientsOff,
    ingredientsOn,
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
    <div className="container content-container">
      <h1 className="visually-hidden">Cocktail choice</h1>
      <Filters />
      <div className="actions-wrapper content-container__actions">
        <Search />
        <Sorting />
        <RandomCocktailButton onClick={saveFiltersToLocalStorage} />
      </div>
      <section className="cocktails content-container__cocktails">
        <h2 className="visually-hidden">Cocktails list</h2>
        <ul className="cocktails-list list-reset cocktails__list">
          {isItems()}
        </ul>
        <PaginationComponent />
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//components
import CocktailCardMini from "../components/cocktailCardMini/CocktailCardMini";
import Filters from "../components/filters/Filters";
import SkeletonCocktailCardMini from "../components/cocktailCardMini/SkeletonCocktailCardMini";
import Sorting from "../components/sorting/Sorting";
import Search from "../components/search/Search";
import RandomCocktailButton from "../components/buttons/RandomCocktailButton/RandomCocktailButton";
import PaginationComponent from "../components/pagination/PaginationComponent";

//states
import { setItems } from "../redux/slices/cocktailListSlice";
import { setCountItems } from "../redux/slices/paginationSlice";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { items } = useSelector((state) => state.cocktailList);
  const {
    category,
    subcategory,
    baseIngredient,
    ingredientsOff,
    ingredientsOn,
  } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sort);
  const { searchValue } = useSelector((state) => state.search);
  const { currentPage } = useSelector((state) => state.pagination);
  const { valueMin, valueMax } = useSelector((state) => state.rangeSlider);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("category", JSON.stringify(category));
      localStorage.setItem("subcategory", JSON.stringify(subcategory));
      localStorage.setItem("baseIngredient", JSON.stringify(baseIngredient));
      localStorage.setItem("ingredientsOff", JSON.stringify(ingredientsOff));
      localStorage.setItem("ingredientsOn", JSON.stringify(ingredientsOn));
      localStorage.setItem("currentPage", JSON.stringify(currentPage));
      localStorage.setItem("sorting", JSON.stringify(sorting));
    }

    isMounted.current = true;
  }, [category, subcategory, baseIngredient, ingredientsOff, ingredientsOn, currentPage, sorting]);

  useEffect(() => {
    axios
      .get(
        `https://64f762d19d775408495385e6.mockapi.io/items?&sortBy=${
          sorting.nameSort
        }&order=${sorting.order ? sorting.order : ""}`
      )
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
      .then((data) =>
        data.filter((el) => {
          if (ingredientsOn.length > 0) {
            return ingredientsOn.some((item) => el.Ingredients.includes(item));
          } else {
            return true; // Если ingredientsOn пуст, возвращаем все элементы
          }
        })
      )
      .then((data) =>
        data.filter((el) => {
          if (ingredientsOff.length > 0) {
            return !ingredientsOff.some((item) =>
              el.Ingredients.includes(item)
            );
          } else {
            return true; // Если ingredientsOff пуст, возвращаем все элементы
          }
        })
      )
      .then((data) =>
        data.filter((el) =>
          el.Title.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
      .then((data) => {
        return subcategory === "low alcohol"
          ? data.filter((el) => Number(el.totalStrength) <= 20)
          : subcategory === "strong"
          ? data.filter((el) => Number(el.totalStrength) > 20)
          : data;
      })
      .then((data) =>
        category === "Alcoholic"
          ? data.filter(
              (el) =>
                Number(el.totalStrength) >= valueMin &&
                Number(el.totalStrength) <= valueMax
            )
          : data
      )
      .then((data) => {
        dispatch(setCountItems(data.length));
        let page = data.slice(currentPage * 9 - 9, currentPage * 9);
        dispatch(setItems(page));
        setIsLoading(false);
      });
  }, [
    category,
    baseIngredient,
    sorting,
    searchValue,
    currentPage,
    valueMin,
    valueMax,
    subcategory,
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
        <RandomCocktailButton />
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

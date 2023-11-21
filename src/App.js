import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//styles
import "./scss/App.scss";

//components
import Header from "./components/header/Header";
import CocktailCard from "./components/cocktailCard/CocktailCard";
import Filters from "./components/filters/Filters";
import SkeletonCocktailCard from "./components/cocktailCard/SkeletonCocktailCard";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { category, baseIngredient } = useSelector((state) => state.filter);

  useEffect(() => {
    axios
      .get("https://64f762d19d775408495385e6.mockapi.io/items")
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
      .then((data) => setItems(data));
    setIsLoading(false);
  }, [category, baseIngredient]);

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
    <div className="App">
      <div className="wrapper">
        <Header />
        <main className="main-content">
          <div className="container content-container">
            <Filters />
            <div className="actions-wrapper content-container__actions">
              <div className="sorting">
                <h2 className="title sorting__title">Sorting</h2>
              </div>
              <div className="search">
                <input type="search" />
              </div>
              <button className="btn-random" type="button">
                Random cocktail
              </button>
            </div>
            <section className="cocktails content-container__cocktails">
              <h2 className="visually-hidden">Cocktails list</h2>
              <ul className="cocktails-list list-reset cocktails__list">
                {isItems()}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

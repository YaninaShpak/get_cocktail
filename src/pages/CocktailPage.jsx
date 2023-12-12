import React, { useEffect, useState } from "react";
import axios from "axios";
import CocktailProperty from "../components/cocktailProperty/CocktailProperty";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const CocktailPage = () => {
  const [item, setItem] = useState({});

  useEffect(() => {
    axios
      .get("https://64f762d19d775408495385e6.mockapi.io/items")
      .then(({data}) => {
        console.log(data[0]);
        setItem(data[getRandomIntInclusive(0, 99)])
      });
  }, []);

  return (
    <div className="container">
      <div className="cocktailPage">
        <div className="cocktailPage__info">
          <h1>{item.Title}</h1>
          <div className="cocktailPage__ingredients">
            <h2>Ingredients</h2>
            <ul className="ingredients-list list-reset">
            {item.Ingredients?.map((el, i) => 
              <li className="ingredients-list__item" key={item.id + i}>
                <p className="ingredients-list__name">{el}</p>
                <p className="ingredients-list__amount">{item.Measures[i]}</p>
              </li>
            )}
            </ul>
          </div>
          <div className="cocktailPage__instruction">
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
        <div className="cocktailPage__img">
          <img src={item.Img} alt={item.Title} />
        </div>
      </div>
    </div>
  );
};

export default CocktailPage;

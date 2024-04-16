import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";

const RandomCocktailPage = () => {
  const navigate = useNavigate();
  const { randomNum } = useSelector((state) => state.cocktailList);
  const [randomCocktail, setRandomCocktail] = useState(null);

  useEffect(() => {
    axios
    .get(`https://64f762d19d775408495385e6.mockapi.io/cocktails`)
    .then(({ data }) => {
      const selectedCocktail = data[randomNum];
      console.log(selectedCocktail)
      setRandomCocktail(selectedCocktail);
      navigate(`/random-cocktail/random/${selectedCocktail?.Title}`);
    });
  },[randomNum])

  return (
    <div className="container cocktailPage">
      {randomCocktail ? (
        <CocktailCard item={randomCocktail} />
      ) : (
        <SkeletonCocktailCard />
      )}
      
    </div>
  );
};

export default RandomCocktailPage;

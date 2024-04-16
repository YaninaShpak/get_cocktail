import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import axios from "axios";

import getRandomIntInclusive from "../utils/getRandomNum";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";

import { setCocktailID } from "../redux/slices/cocktailListSlice";

const RandomCocktailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [randomCocktail, setRandomCocktail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://64f762d19d775408495385e6.mockapi.io/cocktails`)
      .then(({ data }) => {
        const selectedCocktail = data[getRandomIntInclusive(0, 99)];
        setRandomCocktail(selectedCocktail);
        dispatch(setCocktailID(selectedCocktail?.Title));
        navigate(`/random-cocktail/random/${selectedCocktail?.Title}`);
      });
  }, []);

  

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

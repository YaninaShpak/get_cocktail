import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

//libraries
import axios from "axios";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";
import BackButton from "../components/buttons/BackButton/BackButton";

import { setCocktailID } from "../redux/slices/cocktailListSlice";

const RandomCocktailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [randomCocktail, setRandomCocktail] = useState(null);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    axios
      .get(`https://64f762d19d775408495385e6.mockapi.io/items`)
      .then(({data}) => {
        const selectedCocktail = data[getRandomIntInclusive(0, 99)];
        setRandomCocktail(selectedCocktail);
        dispatch(setCocktailID(selectedCocktail?.Title));
        navigate(`/random-cocktail/random/${selectedCocktail?.Title}`);
      })
  }, []);

  return (
    <div className="container cocktailPage">
      {randomCocktail ? <CocktailCard item={randomCocktail}/>: <SkeletonCocktailCard />}
      <BackButton to="/"/>
    </div>
  );
};

export default RandomCocktailPage;
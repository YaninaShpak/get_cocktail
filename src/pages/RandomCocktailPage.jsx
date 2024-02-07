import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

//libraries
import axios from "axios";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";
import BackButton from "../components/buttons/BackButton/BackButton";

import { setCocktailID } from "../redux/slices/cocktailListSlice";

const RandomCocktailPage = () => {
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
        setRandomCocktail(data[getRandomIntInclusive(0, 99)]);
        dispatch(setCocktailID(randomCocktail?.id))}
      )
  }, []);

  return (
    <div className="container cocktailPage">
      {randomCocktail ? <CocktailCard item={randomCocktail}/>: <SkeletonCocktailCard />}
      <BackButton to="/"/>
    </div>
  );
};

export default RandomCocktailPage;
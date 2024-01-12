import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

//libraries
import axios from "axios";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";
import BackButton from "../components/buttons/BackButton/BackButton";

const RandomCocktailPage = () => {
  const {cocktailID} = useSelector((state) => state.cocktailList);
  const [randomCocktail, setRandomCocktail] = useState(null);
  
  console.log('test')

  useEffect(() => {
    axios
    .get(`https://64f762d19d775408495385e6.mockapi.io/items`)
    .then(({data}) => setRandomCocktail(data[cocktailID]))
  }, [cocktailID]);

  return (
    <div className="container cocktailPage">
      {randomCocktail ? <CocktailCard item={randomCocktail}/>: <SkeletonCocktailCard />}
      <BackButton/>
    </div>
  );
};

export default RandomCocktailPage;
import React from "react";
import { useSelector } from "react-redux";

//components
import CocktailCard from "../components/cocktailCard/CocktailCard";
import SkeletonCocktailCard from "../components/cocktailCard/SkeletonCocktailCard";
import BackButton from "../components/buttons/backButton/BackButton";

const CocktailPage = () => {
  const { items, cocktailID } = useSelector((state) => state.cocktailList);
  
  const item = items.find((el) => el.id === cocktailID);

  return (
    <div className="container cocktailPage">
      {item ? <CocktailCard item={item} /> : <SkeletonCocktailCard />}
      <BackButton />
    </div>
  );
};

export default CocktailPage;

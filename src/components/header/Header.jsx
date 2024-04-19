import React from "react";
import { Link } from "react-router-dom";

import RandomCocktailButton from "../buttons/randomCocktailButton/RandomCocktailButton";

import style from "./Header.module.scss";

const Header = () => {
  
  return (
    <header className={style.mainHeader}>
      <div className="container">
        <div className={style.mainHeader__wrapper}>
          <p className={style.mainHeader__title}>
            <Link className="link" to="/">
              Let's get cocktail!
            </Link>
          </p>
          <RandomCocktailButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

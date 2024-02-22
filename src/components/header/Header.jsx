import React from "react";
import { Link } from "react-router-dom";

import style from "./Header.module.scss";

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <div className="container">
        <p className={style.mainHeader__title}>
          <Link className="link" to="/">
            Let's get cocktail!
          </Link>
        </p>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

//styles
import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <p className={style.mainHeader__title}>
        <Link className="link" to="/">Let's get cocktail!</Link>
      </p>
    </header>
  );
};

export default Header;
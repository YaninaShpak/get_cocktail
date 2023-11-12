import React from 'react';
import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <h1 className={style.mainHeader__title}>
        <a className="link" href='/'>Let's get cocktail!</a>
      </h1>
    </header>
  );
};

export default Header;
import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCocktailID } from '../../redux/slices/cocktailListSlice';

import style from './CocktailCardMini.module.scss';

const CocktailCardMini = memo((props) => {
  const {link, title, imgUrl, strength, onClick} = props;
  
  const dispatch = useDispatch();

  const background = useRef();

  useEffect(() => {
    const url = `url("${imgUrl}")`;
    background.current.style.setProperty("background-image", url);
  }, [imgUrl]);
  
  const handleClick = () => {
    dispatch(setCocktailID(link));
    if (onClick) onClick();
  }

  return (
    <li className={style.root}>
      <Link 
        className={`${style.cardMini} link`} 
        to={`cocktail/${link}`} 
        onClick={handleClick}
      >
        <h3 className={style.cardMini__title}>{title}</h3>
        <div className={style.cardMini__img}>
          <img src={imgUrl} alt={title}/>
        </div>
        <div className={style.cardMini__info}>
          {strength && <p>Strength: <span>{strength} %</span></p>}
        </div>
        
      </Link>
      <div className={style.background} ref={background}></div>
    </li>
  );
});

export default CocktailCardMini;
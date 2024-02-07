import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCocktailID } from '../../redux/slices/cocktailListSlice';

//styles
import style from './CocktailCardMini.module.scss';

const CocktailCardMini = ({link, title, imgUrl, strength, onClick}) => {
  const dispatch = useDispatch();

  return (
    <li>
      <Link 
        className={`${style.cardMini} link`} 
        to={`cocktail/${link}`} 
        onClick={() => {
          dispatch(setCocktailID(link));
          onClick();
        }}
      >
        <h3 className={style.cardMini__title}>{title}</h3>
        <div className={style.cardMini__img}>
          <img src={imgUrl} alt={title}/>
        </div>
        <div className="card__info">
          {strength && <p>Strength: <span>{strength} %</span></p>}
        </div>
      </Link>
    </li>
  );
};

export default CocktailCardMini;
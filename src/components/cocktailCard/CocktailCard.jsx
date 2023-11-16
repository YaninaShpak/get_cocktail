//styles
import style from './CocktailCard.module.scss';

const CocktailCard = ({title, imgUrl, strength}) => {
  return (
    <li className={style.card}>
      <h3 className={style.card__title}>{title}</h3>
      <div className={style.card__img}>
        <img src={imgUrl} alt={title}/>
      </div>
      <div className="card__info">
        <p>Strength: <span>{strength} %</span></p>
      </div>
    </li>
  );
};

export default CocktailCard;
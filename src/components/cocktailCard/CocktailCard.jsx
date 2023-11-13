//styles
import style from './CocktailCard.module.scss';

const CocktailCard = () => {
  return (
    <li className={style.card}>
      <h3 className={style.card__title}>Apricot Lady</h3>
      <div className={style.card__img}>
        <img src="https://www.thecocktaildb.com/images/media/drink/7ityp11582579598.jpg" alt="Apricot Lady"/>
      </div>
      <div className="card__info">
        <p>Strange: <span>18.7 %</span></p>
      </div>
    </li>
  );
};

export default CocktailCard;
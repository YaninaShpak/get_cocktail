//styles
import './scss/App.scss';

//components
import Header from './components/header/Header';
import CocktailCard from './components/cocktailCard/CocktailCard';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <main className="main-content">
          <div className="container content-container">
            <section className="filters content-container__filters">
              <h2 className="title filters__title">Filters</h2>
            </section>
            <div className="actions-wrapper content-container__actions">
              <div className="sorting">
                <h2 className="title sorting__title">Sorting</h2>
              </div>
              <div className="search">
                <input type="search" />
              </div>
              <button className="btn-random" type="button">Random cocktail</button>
            </div>
            <section className="cocktails content-container__cocktails">
              <h2 className="visually-hidden">Cocktails list</h2>
              <ul className="cocktails-list list-reset cocktails__list">
                <CocktailCard />
                <CocktailCard />
                <CocktailCard />
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

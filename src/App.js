import { Routes, Route } from "react-router-dom";

//styles
import "./scss/App.scss";

//components
import Header from "./components/header/Header";
import Home from "./pages/Home";
import CocktailPage from "./pages/CocktailPage";
import RandomCocktailPage from "./pages/RandomCocktailPage";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="random-cocktail/random/:title" element={<RandomCocktailPage/>}/>
            <Route path="cocktail/:id" element={<CocktailPage/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

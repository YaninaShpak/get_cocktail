import { Routes, Route } from "react-router-dom";

//components
import Header from "./components/header/Header";
import Home from "./pages/Home";
import CocktailPage from "./pages/CocktailPage";
import RandomCocktailPage from "./pages/RandomCocktailPage";

//styles
import "./scss/App.scss";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="random-cocktail/random/:title"
              element={<RandomCocktailPage />}
            />
            <Route path="cocktail/:title" element={<CocktailPage />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default App;

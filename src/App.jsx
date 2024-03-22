import { NavLink, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import css from "./App.module.css";
import HomePage from "./pages/HomePage/HomePage";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const activeLinkClass = ({ isActive }) => {
    return clsx({ [css.active]: isActive });
  };

  return (
    <>
      <div>
        <nav>
          <NavLink to="/" className={activeLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={activeLinkClass}>
            Movies
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

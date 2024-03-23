import { Link, useLocation } from "react-router-dom";

export const MovieList = ({ films }) => {
  const location = useLocation();

  return (
    <ul>
      {films !== null &&
        films.map((film) => (
          <li key={film.id}>
            <Link state={location} to={`/movies/${film.id}`}>
              {film.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

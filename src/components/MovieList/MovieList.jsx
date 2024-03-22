import { Link } from "react-router-dom";

export const MovieList = ({ films }) => {
  return (
    <ul>
      {films !== null &&
        films.map((film) => (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`}>{film.title}</Link>
          </li>
        ))}
    </ul>
  );
};

export const MovieList = ({ films }) => {
  return (
    <ul>
      {films !== null &&
        films.map((film) => (
          <li key={film.id}>
            <p>{film.title}</p>
          </li>
        ))}
    </ul>
  );
};

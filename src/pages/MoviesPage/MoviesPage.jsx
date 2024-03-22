import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import fetchFilmsByQuery from "../../services/fetchFilmsByQuery";
import { MovieList } from "../../components/MovieList/MovieList";

export const MoviesPage = () => {
  const [films, setFilms] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");
  console.log(searchQuery);

  useEffect(() => {
    const getFilmsByQuery = async () => {
      try {
        const data = await fetchFilmsByQuery(searchQuery);
        console.log(data.results);
        setFilms(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    };
    getFilmsByQuery();
  }, [searchQuery]);

  const onSetQueryValue = (queryValue) => {
    setSearchParams({ query: queryValue });
  };

  return (
    <div>
      MoviesPage
      <SearchBar onSubmit={onSetQueryValue} />
      {/* {isError && <Error errorName={errorName} />} */}
      {films !== null && <MovieList films={films} />}
    </div>
  );
};

import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import fetchFilmsByQuery from "../../services/fetchFilmsByQuery";
import { MovieList } from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

export const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const getFilmsByQuery = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilmsByQuery(searchQuery);

        setFilms(data.results);
      } catch (error) {
        setIsError(true);
        setErrorName(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilmsByQuery();
  }, [searchQuery]);

  const onSetQueryValue = (queryValue) => {
    setSearchParams({ query: queryValue });
  };

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <Error errorName={errorName} />}
      <SearchBar onSubmit={onSetQueryValue} />
      {films !== null && <MovieList films={films} />}
    </div>
  );
};

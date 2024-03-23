import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import fetchFilmsByQuery from "../../services/fetchFilmsByQuery";
import { MovieList } from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import Empty from "../../components/Empty/Empty";

const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const getFilmsByQuery = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilmsByQuery(searchQuery);
        if (data.results.length === 0) {
          setIsEmpty(true);
          return;
        }
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
    setIsEmpty(false);
  };

  return (
    <div>
      <SearchBar onSubmit={onSetQueryValue} />
      {isLoading && <Loader />}
      {isError && <Error errorName={errorName} />}
      {films !== null && <MovieList films={films} />}
      {isEmpty && <Empty />}
    </div>
  );
};

export default MoviesPage;

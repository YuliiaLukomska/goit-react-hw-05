import { useEffect, useState } from "react";
import fetchFilms from "../../services/fetchFilms";
import { MovieList } from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");

  useEffect(() => {
    const getFilms = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilms();

        setFilms(data.results);
      } catch (error) {
        setIsError(true);
        setErrorName(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilms();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {isError && <Error errorName={errorName} />}
      {films !== null && <MovieList films={films} />}
    </>
  );
};

export default HomePage;

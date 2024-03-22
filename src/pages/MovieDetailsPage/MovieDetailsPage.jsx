import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import fetchFilmById from "../../services/fetchFilmById";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { MovieCast } from "../../components/MovieCast/MovieCast";

const MovieDetailsPage = () => {
  // хук зчитує значення динамічного параметра з адресної строки і записує його в змінну movieId.
  const { movieId } = useParams();
  console.log(movieId);
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");

  useEffect(() => {
    const getFilmById = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilmById(movieId);
        console.log(data);
        setFilm(data);
      } catch (error) {
        setIsError(true);
        setErrorName(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilmById();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error errorName={errorName} />}
      {film !== null && (
        <div>
          <h1>{film.title}</h1>
          <Link to="cast">Cast</Link>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;

import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import fetchFilmById from "../../services/fetchFilmById";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { MovieCast } from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  // хук зчитує значення динамічного параметра з адресної строки і записує його в змінну movieId.
  const { movieId } = useParams();

  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getFilmById = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilmById(movieId);

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
          <Link to={backLinkRef.current}>Go Back</Link>
          <h1>{film.title}</h1>
          <p>Add film description</p>
          <Link to="cast">Cast</Link>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
          </Routes>
          <Link to="reviews">Reviews</Link>
          <Routes>
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;

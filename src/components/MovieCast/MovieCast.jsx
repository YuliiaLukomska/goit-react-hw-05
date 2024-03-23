import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchFilmCast from "../../services/fetchFilmCast";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");

  useEffect(() => {
    const getFilmCast = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilmCast(movieId);

        setCast(data.cast);
      } catch (error) {
        setIsError(true);
        setErrorName(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilmCast();
  }, [movieId]);

  return (
    <>
      <h2>Actors:</h2>
      {isLoading && <Loader />}
      {isError && <Error errorName={errorName} />}
      {cast !== null && (
        <ul>
          {cast.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;

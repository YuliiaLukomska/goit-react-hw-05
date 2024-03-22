import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchFilmReviews from "../../services/fetchFilmReviews";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorName, setErrorName] = useState("");

  useEffect(() => {
    const getFilmReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchFilmReviews(movieId);
        console.log(data.results);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
        setErrorName(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilmReviews();
  }, [movieId]);
  return (
    <>
      <h3>Review:</h3>
      {isLoading && <Loader />}
      {isError && <Error errorName={errorName} />}
      {reviews !== null && (
        <ul>
          {reviews.map((item) => (
            <li key={item.id}>
              <p>{item.author}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;

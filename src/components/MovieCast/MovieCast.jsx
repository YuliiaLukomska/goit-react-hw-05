import { useParams } from "react-router-dom";

export const MovieCast = () => {
  const { movieId } = useParams();

  return <div>MovieCast id: {movieId}</div>;
};

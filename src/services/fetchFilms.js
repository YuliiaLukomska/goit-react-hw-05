import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";
const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2ViODUwMzM2ZDY0ODE0MDU3OWU1YjVkZTc5MzRjYyIsInN1YiI6IjY1ZmQ5MjFjMTk3ZGU0MDE2MzE1OWRjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6Ob086_Ta_cvfU8JlAFCBcJcQ9tWmz7EEQiuCexeYs";

const fetchFilms = async () => {
  const { data } = await axios.get(`${BASE_URL}`, {
    headers: {
      // Замість api_read_access_token вставте свій токен
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });
  return data;
};

export default fetchFilms;
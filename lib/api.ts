import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export const trendingMovies = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const topRatedMovies = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const popularMovies = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

import { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";
import { popularMovies, topRatedMovies, trendingMovies } from "../../lib/api";
import { IMovie } from "../../types";
import Banner from "../../components/shared/banner";

export default function Browse() {
  const [trending, setTrending] = useState<IMovie[]>([]);
  const [topRated, setTopRated] = useState<IMovie[]>([]);
  const [popular, setPopular] = useState<IMovie[]>([]);

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
    getPopularMovies();
  }, []);

  const getTrendingMovies = async () => {
    const trending = await trendingMovies();
    setTrending(trending);
  };

  const getTopRatedMovies = async () => {
    const topRated = await topRatedMovies();
    setTopRated(topRated);
  };

  const getPopularMovies = async () => {
    const popular = await popularMovies();
    setPopular(popular);
  };

  return (
    <View className="flex-1">
      <Banner movies={popular} />
    </View>
  );
}

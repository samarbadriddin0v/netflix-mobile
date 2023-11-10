import { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";
import { IMovie } from "../../types";
import { genreMovies } from "../../lib/api";
import Loader from "../../components/shared/loader";
import { ScrollView, StyleSheet } from "react-native";
import Banner from "../../components/shared/banner";
import MovieCard from "../../components/card/movie-card";

export default function Tv() {
  const [comedy, setComedy] = useState<IMovie[]>([]);
  const [documentary, setDocumentary] = useState<IMovie[]>([]);
  const [family, setFamily] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
    getPopularMovies();
  }, []);

  const getTrendingMovies = async () => {
    setIsLoading(true);
    const comedy = await genreMovies("tv", 35);
    setComedy(comedy);
    setIsLoading(false);
  };

  const getTopRatedMovies = async () => {
    const documentary = await genreMovies("tv", 99);
    setDocumentary(documentary);
  };

  const getPopularMovies = async () => {
    const family = await genreMovies("tv", 10751);
    setFamily(family);
  };

  if (isLoading) return <Loader />;

  return (
    <ScrollView>
      <View className="flex-1">
        <Banner movies={comedy} />

        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Comedy</Text>
            <ScrollView horizontal contentContainerStyle={{ gap: 15 }}>
              {comedy.map((item) => (
                <MovieCard item={item} key={item.id} />
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.title}>Documentary</Text>
            <ScrollView horizontal contentContainerStyle={{ gap: 15 }}>
              {documentary.map((item) => (
                <MovieCard item={item} key={item.id} />
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.title}>Family</Text>
            <ScrollView horizontal contentContainerStyle={{ gap: 15 }}>
              {family.map((item) => (
                <MovieCard item={item} key={item.id} />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    rowGap: 50,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
  },
});

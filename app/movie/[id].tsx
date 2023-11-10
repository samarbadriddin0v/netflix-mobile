import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Text, View } from "../../components/Themed";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  image500,
  movieCredits,
  movieDetails,
  similarMovies,
} from "../../lib/api";
import { useEffect, useState } from "react";
import { IActor, IMovie } from "../../types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Loader from "../../components/shared/loader";
import { LinearGradient } from "expo-linear-gradient";
import ActorCard from "../../components/card/actor-card";
import MovieCard from "../../components/card/movie-card";

const { width, height } = Dimensions.get("window");

export default function MovieDetail() {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actors, setActors] = useState<IActor[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const { id } = useGlobalSearchParams();
  const local = useLocalSearchParams();

  const type = local.type == "tv" ? "tv" : "movie";

  const router = useRouter();

  useEffect(() => {
    getMovieDetail();
    getMovieActor();
    getSimilarMovies();
  }, [id]);

  const getMovieDetail = async () => {
    setIsLoading(true);
    const data = await movieDetails(+id, type);
    setMovie(data);
    setIsLoading(false);
  };

  const getMovieActor = async () => {
    const data = await movieCredits(+id, type);
    setActors(data);
  };

  const getSimilarMovies = async () => {
    const data = await similarMovies(+id, type);
    setMovies(data);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <View style={styles.headerLogo}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            <Image
              source={require("../../assets/images/netflix.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>

          <TouchableOpacity>
            <AntDesign name="heart" size={40} color="red" />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <View style={{ height: height }}>
            <Loader />
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: `${image500(movie?.poster_path)}` }}
              style={{ width: width, height: height * 0.7 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{movie?.title}</Text>
        <Text style={styles.status}>
          {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
          {movie?.runtime} min
        </Text>
        <View style={styles.genres}>
          {movie?.genres?.map((genre, idx) => (
            <Text key={idx} style={styles.genreText}>
              {genre?.name} {idx + 1 !== movie.genres.length ? "•" : null}
            </Text>
          ))}
        </View>
        <Text style={styles.overview}>{movie?.overview}</Text>
      </View>

      {actors.length > 0 && (
        <View style={styles.actorWrapper}>
          <Text style={styles.actorTitle}>Actors</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {actors?.map((actor, idx) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </ScrollView>
        </View>
      )}

      <View>
        <Text style={styles.actorTitle}>Similar movies</Text>
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          {movies.map((item) => (
            <MovieCard item={item} key={item.id} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    position: "absolute",
    zIndex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  infoWrapper: {
    flexDirection: "column",
    rowGap: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  status: {
    textAlign: "center",
    fontSize: 20,
    color: "gray",
  },
  genres: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  genreText: {
    color: "lightgray",
    fontSize: 20,
  },
  overview: {
    marginLeft: 10,
  },
  logo: {
    width: 150,
    height: 40,
  },
  headerLogo: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 10,
  },
  actorWrapper: {
    marginTop: 20,
    marginBottom: 10,
  },
  actorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20,
  },
});

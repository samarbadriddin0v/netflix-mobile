import { Stack, useGlobalSearchParams } from "expo-router";
import { Text, View } from "../../components/Themed";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { image500, movieDetails } from "../../lib/api";
import { useEffect, useState } from "react";
import { IMovie } from "../../types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Loader from "../../components/shared/loader";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function MovieDetail() {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useGlobalSearchParams();

  useEffect(() => {
    getMovieDetail();
  }, [id]);

  const getMovieDetail = async () => {
    setIsLoading(true);
    const data = await movieDetails(+id, "movie");
    setMovie(data);
    setIsLoading(false);
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
            <TouchableOpacity>
              <Ionicons name="arrow-back-circle" size={40} color="#E7442E" />
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
});

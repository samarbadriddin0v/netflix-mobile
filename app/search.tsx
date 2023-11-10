import React, { useCallback, useState } from "react";
import { Text, View } from "../components/Themed";
import { IMovie } from "../types";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { image185, imageOriginal, searchMovies } from "../lib/api";
import { debounce } from "lodash";
import Loader from "../components/shared/loader";

const { width, height } = Dimensions.get("window");

export default function Search() {
  const [results, setResults] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async (text: string) => {
    if (text && text.length > 3) {
      setIsLoading(true);
      const res = await searchMovies({ query: text });
      setResults(res);
      setIsLoading(false);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };

  const handletextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          onChangeText={handletextDebounce}
          placeholder="Search for a movie"
          placeholderTextColor={"lightgray"}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => router.push("/")} style={styles.XIcon}>
          <FontAwesome name="times-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        >
          {results.length !== 0 ? (
            <Text style={styles.resultsText}>Results: {results.length}</Text>
          ) : (
            <View style={styles.noResults}>
              <Entypo name="emoji-sad" size={36} color="white" />
              <Text style={styles.title}>
                Sorry, we couldn't find any results
              </Text>
            </View>
          )}

          <View style={styles.wrapper}>
            {results.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                onPress={() => router.push(`/movie/${movie.id}`)}
              >
                <Image
                  source={{
                    uri: `${imageOriginal(movie?.poster_path)}`,
                  }}
                  style={styles.image}
                />
                <Text style={styles.text}>
                  {movie.title.length > 18
                    ? movie.title.slice(0, 18) + "..."
                    : movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    padding: 10,
    fontSize: 18,
    flex: 1,
    color: "white",
    fontWeight: "500",
  },
  XIcon: {
    padding: 10,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginLeft: 2,
    paddingTop: 10,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  image: {
    width: width * 0.44,
    height: height * 0.3,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.2,
  },
});

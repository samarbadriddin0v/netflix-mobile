import { useEffect, useState } from "react";
import { Text, View } from "../Themed";
import { IMovie } from "../../types";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { imageOriginal } from "../../lib/api";
import Header from "./header";
import { LinearGradient } from "expo-linear-gradient";
import { Headertabs } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";

interface Props {
  movies: IMovie[];
}

export default function Banner({ movies }: Props) {
  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    setRandomMovie(movie);
  }, [movies]);

  return (
    <ImageBackground
      source={{
        uri: `${imageOriginal(
          randomMovie?.backdrop_path || randomMovie?.poster_path
        )}`,
      }}
      style={styles.backgroundWrapper}
    >
      <Header />
      <LinearGradient
        colors={["black", "transparent"]}
        style={styles.infoWrapper}
        locations={[1, 0]}
      >
        <View style={styles.infoContainer}>
          {/* Header tab */}
          <View style={styles.tabWrapper}>
            {Headertabs.map((item) => (
              <TouchableOpacity key={item.path} style={styles.tabBtn}>
                <Text style={styles.tabText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Movie information */}
          <Text style={styles.title}>
            {randomMovie?.title || randomMovie?.original_title}
          </Text>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuBtn}>
              <Ionicons name="add-outline" size={24} color={"white"} />
              <Text style={styles.textButton}>My List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="ios-play" size={26} />
              <Text style={styles.textButtonPlay}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn}>
              <Feather name="info" size={24} color={"white"} />
              <Text style={styles.textButton}>Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundWrapper: {
    width: "100%",
    height: (Dimensions.get("window").height * 81) / 100,
    position: "relative",
  },
  infoWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get("window").height,
  },
  infoContainer: {
    paddingTop: 25,
    gap: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "transparent",
  },
  tabBtn: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  menu: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  menuBtn: {
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 13,
    marginTop: 3,
  },
  playBtn: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 142,
    height: 32,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonPlay: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 4,
  },
});

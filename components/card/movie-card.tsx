import React from "react";
import { IMovie } from "../../types";
import { Text, View } from "../Themed";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { image185 } from "../../lib/api";

interface Props {
  item: IMovie;
}

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item }: Props) {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={{
          uri: `${image185(item?.backdrop_path || item?.poster_path)}`,
        }}
        style={styles.image}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.3,
    height: height * 0.2,
  },
});

import React from "react";
import { IMovie } from "../../types";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { image185 } from "../../lib/api";
import { usePathname, useRouter } from "expo-router";

interface Props {
  item: IMovie;
}

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        router.push(`/movie/${item.id}?type=${pathname === "/tv" && "tv"}`)
      }
    >
      <Image
        source={{
          uri: `${image185(item?.poster_path)}`,
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

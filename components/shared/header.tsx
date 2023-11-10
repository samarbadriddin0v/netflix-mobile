import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/netflix.png")}
          resizeMode="contain"
          style={styles.logo}
        />

        <View style={styles.rightSide}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.push("/search")}
          >
            <MaterialIcons
              name="search"
              size={30}
              color={"white"}
              style={styles.searchLogo}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              resizeMode="contain"
              style={styles.profile}
              source={{ uri: "https://tinyurl.com/5n7b72k3" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: 150,
    height: 40,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },
  searchLogo: {
    backgroundColor: "transparent",
  },
  profile: {
    width: 50,
    height: 35,
    borderRadius: 20,
  },
});

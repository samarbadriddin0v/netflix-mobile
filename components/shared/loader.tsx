import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "../Themed";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#E7442E"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

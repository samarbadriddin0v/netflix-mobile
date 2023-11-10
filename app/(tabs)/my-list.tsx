import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";

export default function MyList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You don't have any list yet.</Text>

      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Browse page!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#E7442E",
  },
});

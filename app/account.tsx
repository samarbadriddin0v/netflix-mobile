import { Image, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <Image
          source={require("../assets/images/netflix.png")}
          resizeMode="contain"
          style={{ width: 150, height: 40 }}
        />
      </SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.account}>
          <Image
            resizeMode="contain"
            style={styles.profile}
            source={{ uri: "https://tinyurl.com/5n7b72k3" }}
          />
          <View style={styles.profileInfo}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              John Doe
            </Text>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
          </View>
          <LinearGradient colors={["#3c3cb5", "#00d4ff"]} style={styles.go}>
            <TouchableOpacity>
              <Entypo name="chevron-thin-right" size={36} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.add}
          onPress={() => router.push("/create-account")}
        >
          <Text style={styles.addText}>Add account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  account: {
    width: "96%",
    height: 100,
    backgroundColor: "#333",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  profileInfo: {
    marginLeft: 10,
    backgroundColor: "transparent",
  },
  editBtn: {
    width: 100,
    height: 30,
    backgroundColor: "#E7442E",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  go: {
    position: "absolute",
    height: "100%",
    width: 100,
    right: 0,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    marginTop: 20,
    height: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});

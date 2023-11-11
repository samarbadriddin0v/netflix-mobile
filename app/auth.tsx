import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useState } from "react";

const { height } = Dimensions.get("window");

export default function Auth() {
  const [state, setstate] = useState<"login" | "register">("login");

  return (
    <View>
      <ImageBackground
        source={{ uri: "https://rb.gy/0oz37g" }}
        resizeMode="cover"
        style={{
          flex: 1,
          height,
          position: "relative",
        }}
      >
        <View style={styles.overlay} />
        <SafeAreaView>
          <Image
            source={require("../assets/images/netflix.png")}
            resizeMode="contain"
            style={styles.logo}
          />

          <View style={styles.wrapper}>
            <View style={styles.form}>
              {state === "login" && <Login />}
              {state === "register" && <Register />}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

function Login() {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}

function Register() {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: "100%",
    height: height,
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
  },
  logo: {
    width: 150,
    height: 40,
  },
  wrapper: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  form: {
    width: "90%",
    height: height / 2,
    borderRadius: 10,
    padding: 10,
  },
});

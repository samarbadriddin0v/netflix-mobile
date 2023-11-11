import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Dispatch, useState } from "react";
import { Formik } from "formik";
import { loginSchema, registerSchema } from "../lib/validation";
import {
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { Redirect, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useGlobalContext } from "../context";

const { height } = Dimensions.get("window");

export default function Auth() {
  const [state, setstate] = useState<"login" | "register">("login");

  const { user } = useGlobalContext();

  if (user !== null) return <Redirect href={"/account"} />;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: "https://rb.gy/0oz37g" }}
        resizeMode="cover"
        style={{
          flex: 1,
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
        </SafeAreaView>
        <KeyboardAvoidingView
          style={{ height }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.wrapper}>
            <View style={styles.form}>
              {state === "login" && <Login setstate={setstate} />}
              {state === "register" && <Register setstate={setstate} />}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

interface Props {
  setstate: Dispatch<React.SetStateAction<"login" | "register">>;
}

function Login({ setstate }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const { email, password } = values;
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user.uid) {
        setIsLoading(false);
        setError("");
        router.push("/account");
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Sign In</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ flexDirection: "column" }}>
            {error && (
              <View style={styles.alert}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            )}
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              style={styles.input}
            />
            {errors.email && touched.email && (
              <Text style={{ color: "red", marginTop: 5 }}>{errors.email}</Text>
            )}
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {errors.password}
              </Text>
            )}
            {/* @ts-ignore */}
            <TouchableOpacity onPress={handleSubmit} style={styles.formButton}>
              {isLoading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={styles.textButton}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.bottomContent}>
              <Text>New to Netflix?</Text>
              <TouchableOpacity onPress={() => setstate("register")}>
                <Text style={{ color: "lightblue", fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function Register({ setstate }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setIsLoading(true);
      const { email, password, firstName, lastName } = values;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(res.user, {
        displayName: `${firstName} ${lastName}`,
      });
      addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: res.user.uid,
        list: [],
      });
      if (res.user.uid) {
        setIsLoading(false);
        setError("");
        router.push("/account");
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ flexDirection: "column" }}>
            {error && (
              <View style={styles.alert}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            )}
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "48%" }}>
                <TextInput
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                  placeholderTextColor="gray"
                  style={styles.input}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {errors.firstName}
                  </Text>
                )}
              </View>
              <View style={{ width: "48%" }}>
                <TextInput
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                  placeholderTextColor="gray"
                  style={styles.input}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {errors.lastName}
                  </Text>
                )}
              </View>
            </View>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              style={styles.input}
            />
            {errors.email && touched.email && (
              <Text style={{ color: "red", marginTop: 5 }}>{errors.email}</Text>
            )}
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {errors.password}
              </Text>
            )}
            {/* @ts-ignore */}
            <TouchableOpacity onPress={handleSubmit} style={styles.formButton}>
              {isLoading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={styles.textButton}>Register</Text>
              )}
            </TouchableOpacity>

            <View style={styles.bottomContent}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => setstate("login")}>
                <Text style={{ color: "lightblue", fontWeight: "bold" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
  },
  logo: {
    width: 150,
    height: 40,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  form: {
    width: "90%",
    minHeight: height / 3,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "96%",
    height: 50,
    borderWidth: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    color: "white",
    marginTop: 20,
  },
  formButton: {
    width: "96%",
    height: 50,
    backgroundColor: "#E7442E",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },
  textButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  alert: {
    backgroundColor: "rgba(255,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  alertText: {
    color: "rgb(255,0,0)",
    fontWeight: "bold",
  },
});

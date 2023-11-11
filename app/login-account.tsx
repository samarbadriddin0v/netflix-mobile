import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useState } from "react";
import { Formik } from "formik";
import { loginAccountShema } from "../lib/validation";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getAccount } from "../lib/firebase";
import { useGlobalContext } from "../context";
import { IAccount } from "../types";

const { height, width } = Dimensions.get("window");

export default function LoginAccount() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { accountId } = useLocalSearchParams();
  const { setAccount } = useGlobalContext();
  const router = useRouter();

  const onSubmit = async ({ pin }: { pin: string }) => {
    try {
      setIsLoading(true);
      const res = await getAccount(pin, accountId as string);

      if (res.status) {
        setAccount(res.data as IAccount);
        setIsLoading(false);
        router.back();
      } else {
        setError(res.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <KeyboardAvoidingView
        style={{ height }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <Text style={styles.title}>Login account</Text>
            {error && (
              <View style={styles.alert}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            )}
            <Formik
              onSubmit={onSubmit}
              initialValues={{ pin: "" }}
              validationSchema={loginAccountShema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "transparent",
                  }}
                >
                  <TextInput
                    onChangeText={handleChange("pin")}
                    onBlur={handleBlur("pin")}
                    value={values.pin}
                    placeholder="Enter your pin"
                    placeholderTextColor="gray"
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                  {errors.pin && touched.pin && (
                    <Text style={{ color: "red", marginTop: 5 }}>
                      {errors.pin}
                    </Text>
                  )}

                  <TouchableOpacity
                    // @ts-ignore
                    onPress={handleSubmit}
                    style={styles.formButton}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={"white"} />
                    ) : (
                      <Text style={styles.textButton}>Save</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  form: {
    width: width / 1.2,
    minHeight: height / 3,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#333",
  },
  input: {
    width: "96%",
    height: 50,
    borderWidth: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
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

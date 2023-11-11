import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Redirect, usePathname, useRouter } from "expo-router";
import { IAccount } from "../types";
import { deleteAccount, getAccounts } from "../lib/firebase";
import { useGlobalContext } from "../context";

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const router = useRouter();
  const { user, account } = useGlobalContext();
  const pathname = usePathname();

  useEffect(() => {
    getAllAccounts();
  }, [pathname]);

  const getAllAccounts = async () => {
    try {
      setIsLoading(true);
      const res = await getAccounts(user?.uid!);
      setAccounts(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      const isConfirm = await new Promise((resolve, reject) => {
        Alert.alert(
          "Delete account",
          "Are you sure you want to delete this account?",
          [
            {
              text: "Cancel",
              onPress: () => resolve(false),
              style: "cancel",
            },
            { text: "OK", onPress: () => resolve(true) },
          ]
        );
      });

      if (isConfirm) {
        setIsLoading(true);
        const res = await deleteAccount(id);
        if (res.status) {
          const newAccounts = accounts.filter((account) => account._id !== id);
          setAccounts(newAccounts);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (account !== null) return <Redirect href={"/"} />;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <Image
          source={require("../assets/images/netflix.png")}
          resizeMode="contain"
          style={{ width: 150, height: 40 }}
        />
      </SafeAreaView>
      {isLoading ? (
        <View style={styles.loadingWrapper}>
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
          {[1, 2].map((_, index) => (
            <View style={styles.account} key={index}>
              <Image
                resizeMode="contain"
                style={styles.profile}
                source={{ uri: "https://tinyurl.com/5n7b72k3" }}
              />

              <View style={styles.profileInfo}>
                <Text
                  style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                >
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
          ))}
        </View>
      ) : (
        <View style={styles.wrapper}>
          {accounts.map((account) => (
            <View style={styles.account} key={account._id}>
              <Image
                resizeMode="contain"
                style={styles.profile}
                source={{ uri: "https://tinyurl.com/5n7b72k3" }}
              />
              <View style={styles.profileInfo}>
                <Text
                  style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                >
                  {account.name}
                </Text>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => onDelete(account._id)}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
                </TouchableOpacity>
              </View>
              <LinearGradient colors={["#3c3cb5", "#00d4ff"]} style={styles.go}>
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/login-account?accountId=${account._id}`)
                  }
                >
                  <Entypo name="chevron-thin-right" size={36} color="white" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ))}
          {accounts.length < 4 && (
            <TouchableOpacity
              style={styles.add}
              onPress={() => router.push("/create-account")}
            >
              <Text style={styles.addText}>Add account</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    opacity: 0.8,
    borderRadius: 5,
    zIndex: 99,
    justifyContent: "center",
  },
  account: {
    width: "96%",
    height: 100,
    backgroundColor: "#333",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
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

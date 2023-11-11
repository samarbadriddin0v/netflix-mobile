import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { IAccount } from "../../types";
import { auth, getAccounts } from "../../lib/firebase";
import { useGlobalContext } from "../../context";
import { signOut } from "firebase/auth";

export default function Header() {
  const [isPopover, setIsPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isLogout, setIsLogout] = useState(false);

  const router = useRouter();
  const { user, setAccount, setUser } = useGlobalContext();

  useEffect(() => {
    if (accounts.length === 0) {
      getAllAccounts();
    }
  }, []);

  const logout = async () => {
    try {
      setIsLogout(true);
      signOut(auth);
      setUser(null);
      setAccount(null);
      router.push("/auth");
      setIsLogout(false);
    } catch (error) {
      console.log(error);
      setIsLogout(false);
    }
  };

  const openProfile = async () => {
    setIsPopover((prev) => !prev);
  };

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
          <TouchableOpacity activeOpacity={0.7} onPress={openProfile}>
            <Image
              resizeMode="contain"
              style={styles.profile}
              source={{ uri: "https://tinyurl.com/5n7b72k3" }}
            />
          </TouchableOpacity>

          {isPopover && (
            <View style={styles.popoverWrapper}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={{ marginTop: 15, alignSelf: "center" }}
                />
              ) : (
                <>
                  {accounts.map((account) => (
                    <TouchableOpacity
                      style={styles.popover}
                      key={account._id}
                      onPress={() => {
                        router.push("/account");
                        setAccount(null);
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{ width: 50, height: 50 }}
                        source={{ uri: "https://tinyurl.com/5n7b72k3" }}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {account.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <>
                    <TouchableOpacity
                      style={styles.logoutBtn}
                      onPress={() => logout()}
                    >
                      {isLogout ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.logoutText}>Logout</Text>
                      )}
                    </TouchableOpacity>
                  </>
                </>
              )}
            </View>
          )}
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
    position: "relative",
  },
  searchLogo: {
    backgroundColor: "transparent",
  },
  profile: {
    width: 50,
    height: 35,
    borderRadius: 20,
  },
  popoverWrapper: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.9)",
    width: 250,
    minHeight: 100,
    right: 10,
    top: "110%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  popover: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  logoutBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#E7442E",
    height: 50,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

import { Link, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { IList, IMovie } from "../../types";
import { useGlobalContext } from "../../context";
import { getAllLists } from "../../lib/firebase";
import Loader from "../../components/shared/loader";
import { imageOriginal } from "../../lib/api";

const { width, height } = Dimensions.get("window");

export default function MyList() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<IList[]>([]);

  const { account } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    try {
      setIsLoading(true);
      const res = await getAllLists(account?._id!);
      setMovies(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {movies.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>You don't have any list yet.</Text>

          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Browse page!</Text>
          </Link>
        </View>
      ) : (
        <ScrollView>
          <View className="flex-1">
            <View style={styles.row}>
              <View>
                <Text style={styles.title}>My list</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  {movies.map((item) => (
                    <TouchableOpacity
                      key={item.poster_path}
                      onPress={() => router.push(`/movie/${item.id}`)}
                    >
                      <Image
                        source={{
                          uri: `${imageOriginal(item?.poster_path)}`,
                        }}
                        style={styles.image}
                      />
                      <Text style={styles.text}>
                        {item.title.length > 18
                          ? item.title.slice(0, 18) + "..."
                          : item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 10,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#E7442E",
  },
  row: {
    flexDirection: "column",
    rowGap: 50,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
  },
  image: {
    width: width * 0.44,
    height: height * 0.3,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

import { Image, TouchableOpacity } from "react-native";
import { IActor } from "../../types";
import { Text, View } from "../Themed";
import { image185 } from "../../lib/api";

interface Props {
  actor: IActor;
}

export default function ActorCard({ actor }: Props) {
  return (
    <TouchableOpacity
      style={{ marginRight: 8, alignItems: "center", marginBottom: 12 }}
    >
      <View
        style={{
          overflow: "hidden",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "gray",
          borderRadius: 50,
        }}
      >
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{ uri: `${image185(actor.profile_path as string)}` }}
        />
      </View>
      <Text style={{ fontSize: 15, marginVertical: 10 }}>
        {actor?.character.length > 10
          ? actor.character.slice(0, 10) + "..."
          : actor?.character}
      </Text>
      <Text style={{ fontSize: 14, color: "gray" }}>
        {actor?.original_name.length > 10
          ? actor.original_name.slice(0, 10) + "..."
          : actor?.original_name}
      </Text>
    </TouchableOpacity>
  );
}

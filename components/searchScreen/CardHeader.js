import * as React from "react";
import { Pressable, Text, View, Image as Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dummyPost from "../../data/dummyPost";
import { GlobalStyles } from "../../constants/Styles";
import PressEffect from "../UI/PressEffect";
import { useTheme } from "../../store/theme-context";

const CardHeader = ({ radius }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: radius / 2,
        marginTop: radius / 3,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: dummyPost.profilepic }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: theme.colors.textColor, fontWeight: "600" }}>
            {dummyPost.username}
          </Text>
          <Text style={{ color: theme.colors.mutedTextColor }}>
            {dummyPost.time}
          </Text>
        </View>
      </View>
      <PressEffect>
        <Pressable
          style={{
            padding: 5,
            backgroundColor: theme.colors.primary500,
            borderRadius: 50,
          }}
        >
          <Ionicons name="heart" size={30} color={theme.colors.purple} />
        </Pressable>
      </PressEffect>
    </View>
  );
};

export default CardHeader;

import { useState } from "react";
import { Pressable, Text, View, Image as Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dummyPost from "../../data/dummyPost";
import { useTheme } from "../../store/theme-context";

const CardFooter = ({ radius, width }) => {
  const [text, setText] = useState("");
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.primary500,
        borderRadius: 25,
        alignItems: "center",
        padding: 5,
        marginHorizontal: width * 0.1 + radius / 4,
        marginBottom: radius / 4,
      }}
    >
      <Image
        source={{ uri: dummyPost.sender }}
        style={{ width: 40, height: 50, borderRadius: 50 }}
      />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Add Comment..."
          placeholderTextColor={theme.colors.mutedTextColor}
          onChangeText={(text) => setText(text)}
          value={text}
          selectionColor={theme.colors.orange}
          style={{
            color: theme.colors.textColor,
            padding: 10,
          }}
        />
      </View>
      <Ionicons
        style={{ marginHorizontal: 10, transform: [{ rotate: "-20deg" }] }}
        name="send"
        size={25}
        color={theme.colors.textColor}
      />
    </View>
  );
};

export default CardFooter;

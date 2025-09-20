import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React from "react";
import { DEFAULT_DP, GlobalStyles } from "../../constants/Styles";
import { useTheme } from "../../store/theme-context";

const ListCard = ({ userData }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      style={({ pressed }) =>
        Platform.OS === "ios" && pressed && { opacity: 0.5 }
      }
      android_ripple={{
        color: theme.colors.primary500,
        foreground: true,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.primary300,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            resizeMode: "cover",
            borderRadius: 30,
          }}
          source={{
            uri: !!userData.picturePath ? userData.picturePath : DEFAULT_DP,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", color: theme.colors.textColor }}>
            {userData.username}
          </Text>
          <Text style={{ color: theme.colors.mutedTextColor }}>
            {userData.fullName}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: theme.colors.primary,
        }}
      />
    </Pressable>
  );
};

export default ListCard;

const styles = StyleSheet.create({});

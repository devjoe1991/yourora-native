import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/Styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTheme } from "../store/theme-context";

function ErrorOverlay({ message, onClose }) {
  const { theme } = useTheme();
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.primary500,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/warning.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={{ color: theme.colors.textColor, fontWeight: "bold", marginTop: 5 }}>
        {message}
      </Text>
      <Text
        onPress={onClose}
        style={{
          color: theme.colors.textColor,
          fontWeight: "bold",
          marginTop: 5,
          fontSize: 18,
          backgroundColor: theme.colors.primary600,
          padding: 10,
          paddingHorizontal: 15,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: theme.colors.blue,
        }}
      >
        Ok
      </Text>
    </Animated.View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({});

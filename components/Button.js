import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/Styles";
import { useTheme } from "../store/theme-context";

function Button({
  title,
  onPress,
  disabled,
  titleStyle,
  containerStyle,
  secondary,
}) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.blue,
          borderRadius: 50,
          overflow: "hidden",
        },
        secondary && {
          backgroundColor: theme.colors.primary200,
          borderWidth: 1,
          borderColor: theme.colors.primary600,
        },
        containerStyle,
        disabled && { opacity: 0.8 },
      ]}
    >
      <Pressable
        android_ripple={{
          color: secondary
            ? theme.colors.primary500
            : theme.colors.textColor,
          foreground: true,
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[
            {
              color: theme.colors.textColor,
              fontWeight: "bold",
              fontSize: 18,
              padding: 20,
            },
            secondary && { color: theme.colors.textColor },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({});

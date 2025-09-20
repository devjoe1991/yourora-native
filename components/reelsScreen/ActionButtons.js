import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/Styles";
import PressEffect from "../UI/PressEffect";
import { useTheme } from "../../store/theme-context";

function IconButton({ name, size = 20, color }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary300,
        alignSelf: "center",
        padding: 10,
        borderRadius: 50,
      }}
    >
      <PressEffect>
        <Ionicons name={name} size={size} color={color || theme.colors.textColor} />
      </PressEffect>
    </View>
  );
}

const ActionButtons = () => {
  return (
    <View style={{ gap: 5, flexDirection: "row" }}>
      <IconButton name="heart-outline" />
      <IconButton
        onPress={() => setShowComment(true)}
        name="chatbubble-ellipses"
      />
      <IconButton name="add-circle" />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({});

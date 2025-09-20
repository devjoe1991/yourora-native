import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";
import { useTheme } from "../../store/theme-context";

const Loader = ({ size = "large", color }) => {
  const { theme } = useTheme();
  return <ActivityIndicator size={size} color={color || theme.colors.purple} />;
};

export default Loader;

const styles = StyleSheet.create({});

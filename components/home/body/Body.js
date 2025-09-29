import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Feed from "./Feed";
import MahiPlusTab from "../../mahiPlus/MahiPlusTab";
import { GlobalStyles } from "../../../constants/Styles";
import { useTheme } from "../../../store/theme-context";

const TopTab = createMaterialTopTabNavigator();

const Body = ({ StoryTranslate }) => {
  const { theme } = useTheme();
  
  // Mahi+ tab component with premium features
  const YourMahiTab = () => <MahiPlusTab />;

  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarLabelStyle: {
          color: theme.colors.textColor,
          fontSize: 16,
          textTransform: 'none',
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.blue,
          height: 2,
        },
        tabBarActiveTintColor: theme.colors.textColor,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <TopTab.Screen name="Feed" options={{ title: "Feed" }}>
        {() => <Feed StoryTranslate={StoryTranslate} />}
      </TopTab.Screen>
      <TopTab.Screen name="YourMahi" options={{ title: "Mahi+" }}>
        {() => <YourMahiTab />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default Body;

const styles = StyleSheet.create({});

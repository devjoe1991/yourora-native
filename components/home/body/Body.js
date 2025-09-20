import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Feed from "./Feed";
import Video from "./Video";
import { GlobalStyles } from "../../../constants/Styles";
import { useTheme } from "../../../store/theme-context";
import TopTabBar from "./TopTabBar";
const TopTab = createMaterialTopTabNavigator();
const Body = ({ StoryTranslate }) => {
  const { theme } = useTheme();
  return (
    <TopTab.Navigator
      //   tabBar={(props) => <TopTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.textColor,
        tabBarLabelStyle: {
          textTransform: "none",
          fontSize: 18,
          padding: 0,
          margin: 0,
        },
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIndicatorStyle: {
          height: 3,
          width: "10%",
          left: "20%",
          borderRadius: 30,
          backgroundColor: theme.colors.purple,
        },
        tabBarStyle: {
          padding: 0,
          margin: 0,
          justifyContent: "center",
          width: "100%",
          elevation: 0,
          backgroundColor: "transparent",
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary600,
        },
        tabBarPressColor: theme.colors.textColor,
      }}
    >
      <TopTab.Screen name="Feed">
        {() => <Feed StoryTranslate={StoryTranslate} />}
      </TopTab.Screen>
      <TopTab.Screen name="Video">
        {() => <Video StoryTranslate={StoryTranslate} />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default Body;

const styles = StyleSheet.create({});

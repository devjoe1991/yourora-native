import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Feed from "./Feed";
import { GlobalStyles } from "../../../constants/Styles";
import { useTheme } from "../../../store/theme-context";

const TopTab = createMaterialTopTabNavigator();

const Body = ({ StoryTranslate }) => {
  const { theme } = useTheme();
  
  // Your Mahi tab component (blank for now)
  const YourMahiTab = () => (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.textColor, fontSize: 18, fontWeight: 'bold' }}>
        Your Mahi
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 8 }}>
        Coming Soon...
      </Text>
    </View>
  );

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
      <TopTab.Screen name="YourMahi" options={{ title: "Your Mahi" }}>
        {() => <YourMahiTab />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default Body;

const styles = StyleSheet.create({});

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from "./AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import AuthContentProvider, { AuthContext } from "./store/auth-context";
import { ThemeProvider, useTheme } from "./store/theme-context";
import { GlobalStyles } from "./constants/Styles";
import Loader from "./components/UI/Loader";


function AppContent() {
  const { theme } = useTheme();

  function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      async function fetchToken() {
        setTimeout(() => {
          setIsTryingLogin(false);
        }, 2000);
      }

      fetchToken();
    }, []);

    if (isTryingLogin) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Loader />
        </View>
      );
    }

    return <AuthNavigation />;
  }

  return (
    <NavigationContainer>
      <AuthContentProvider>
        <StatusBar 
          backgroundColor={theme.colors.primary} 
          barStyle={theme.colors.textColor === "#FFFFFF" ? "light-content" : "dark-content"}
        />
        <Root />
      </AuthContentProvider>
    </NavigationContainer>
  );
}

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

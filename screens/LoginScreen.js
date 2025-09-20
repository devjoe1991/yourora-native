import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";
import { GlobalStyles } from "../constants/Styles";
import { useTheme } from "../store/theme-context";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 30,
          marginTop: GlobalStyles.styles.windowHeight * 0.1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: theme.colors.textColor,
          }}
        >
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.mutedTextColor,
          }}
        >
          Sign in to be continoue
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <LoginForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

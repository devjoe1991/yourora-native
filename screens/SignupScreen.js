import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import SignupForm from "../components/signupScreen/SignupForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../constants/Styles";
import { useTheme } from "../store/theme-context";

const BACK_IMG = require("../assets/SignupScreenImage.jpg");
const { height, width } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
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
          Welcome!
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.mutedTextColor,
          }}
        >
          Create your account
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <SignupForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

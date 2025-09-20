import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../../constants/Styles";
import { useTheme } from "../../../store/theme-context";
import PressEffect from "../../UI/PressEffect";
import ThemeToggleSwitch from "../../UI/ThemeToggleSwitch";
import YourOraTextLogo from "../../UI/YourOraTextLogo";

const Header = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 5,
      marginHorizontal: 20,
    },
    iconsContainer: {
      position: "absolute",
      right: 0,
      flexDirection: "row",
    },
    icon: {
      marginLeft: 10,
    },
    unreadBadge: {
      backgroundColor: theme.colors.red,
      position: "absolute",
      right: 2,
      top: 2,
      width: 8,
      height: 8,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    unreadBadgeText: {
      fontSize: 10,
      color: theme.colors.textColor,
      fontWeight: "bold",
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={{ position: "absolute", left: 0, flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={() => navigation.navigate("UserProfileScreen")}
        >
          <PressEffect>
            <Image
              style={{ width: 30, height: 30, borderRadius: 50 }}
              source={{
                uri: "https://p16.tiktokcdn.com/tos-maliva-avt-0068/2f134ee6b5d3a1340aeb0337beb48f2d~c5_720x720.jpeg",
              }}
            />
          </PressEffect>
        </Pressable>
        
        {/* Theme Toggle Switch - Right side of profile avatar, perfectly aligned */}
        <View style={{ marginLeft: 10 }}>
          <ThemeToggleSwitch size={20} />
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <YourOraTextLogo 
          size="large" 
          showSubtitle={true}
        />
      </View>

      <View style={styles.iconsContainer}>
        <PressEffect>
          <Pressable
            style={styles.icon}
            onPress={() => {
              navigation.navigate("SearchScreen");
            }}
          >
            <Ionicons name="search" size={25} color={theme.colors.textColor} />
          </Pressable>
        </PressEffect>
        <PressEffect>
          <Pressable
            style={styles.icon}
            onPress={() => {
              navigation.navigate("NotificationsScreen");
            }}
          >
            <Ionicons name="notifications" size={25} color={theme.colors.textColor} />
            <View style={styles.unreadBadge} />
            {/* <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>6</Text>
            </View> */}
          </Pressable>
        </PressEffect>
      </View>
    </View>
  );
};

export default Header;

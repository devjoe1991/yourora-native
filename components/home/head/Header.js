import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../../constants/Styles";
import { useTheme } from "../../../store/theme-context";
import { useSidebar } from "../../../store/sidebar-context";
import PressEffect from "../../UI/PressEffect";
import AnimatedHamburgerMenu from "../../UI/AnimatedHamburgerMenu";
import YourOraTextLogo from "../../UI/YourOraTextLogo";

const Header = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { isOpen, toggleSidebar } = useSidebar();

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
        <AnimatedHamburgerMenu
          onPress={toggleSidebar}
          isOpen={isOpen}
          size={30}
        />
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

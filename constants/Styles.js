import { Dimensions, StyleSheet } from "react-native";
import { lightTheme, darkTheme } from './themes';
const { height, width } = Dimensions.get("window");

export const GlobalStyles = {
  // Dynamic color system that preserves your current usage patterns
  getColors: (isDark = true) => isDark ? darkTheme.colors : lightTheme.colors,
  
  // Keep existing colors for backward compatibility during transition
  // These match the current dark theme colors exactly
  colors: {
    primary: "#262938",
    primary100: "rgb(8, 8, 8)",
    primary200: "#2B2C3E",
    primary300: "#2E2F40",
    primary500: "#363747",
    primary600: "#3f4152",
    gray: "rgba(225, 225, 225,0.5)",
    gray100: "rgba(225, 225, 225,0.05)",
    blue: "#7A40F8",
    blue100: "#6BB0f5",
    cyan: "#4cc9f0",
    purple: "#C3B1E1",
    purpleDark: "#C459F4",
    magenta: "#F49AC2",
    orange: "#fdac1d",
    greenLight: "#00ECCA",
    green: "#7fff62",
    red: "#ef3e55",
    pink: "#f72585",
    persianRed: "#C44536",
    darkGreen: "#297e2b",
    tabBarColor: "#07070F",
    yellow: "#E0FF55",
  },
  
  // Keep existing styles unchanged
  styles: StyleSheet.create({
    tabBarPadding: 100,
    windowWidth: width,
    windowHeight: height,
  }),
};

// For backward compatibility during transition, keep the old colors object
// This will be removed once all components are updated to use theme context
export const LegacyColors = {
  primary: "#262938",
  primary100: "rgb(8, 8, 8)",
  primary200: "#2B2C3E",
  primary300: "#2E2F40",
  primary500: "#363747",
  primary600: "#3f4152",
  gray: "rgba(225, 225, 225,0.5)",
  gray100: "rgba(225, 225, 225,0.05)",
  blue: "#7A40F8",
  blue100: "#6BB0f5",
  cyan: "#4cc9f0",
  purple: "#C3B1E1",
  purpleDark: "#C459F4",
  magenta: "#F49AC2",
  orange: "#fdac1d",
  greenLight: "#00ECCA",
  green: "#7fff62",
  red: "#ef3e55",
  pink: "#f72585",
  persianRed: "#C44536",
  darkGreen: "#297e2b",
  tabBarColor: "#07070F",
  yellow: "#E0FF55",
};
export const DEFAULT_DP =
  "https://i.pinimg.com/736x/89/bd/4d/89bd4db33ba9999dc990dfc8e0ead989.jpg";

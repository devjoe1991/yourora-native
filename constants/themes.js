// Miha App Theme Definitions
// This file contains both dark and light theme definitions with proper color inversions

export const darkTheme = {
  colors: {
    // Background colors (current dark theme - preserve exactly as they are)
    primary: "#262938",           // Main background
    primary100: "rgb(8, 8, 8)",   // Darkest background  
    primary200: "#2B2C3E",        // Card backgrounds
    primary300: "#2E2F40",        // Secondary backgrounds
    primary500: "#363747",        // Elevated surfaces
    primary600: "#3f4152",        // Borders
    tabBarColor: "#07070F",       // Tab bar background
    
    // Text colors (current light text - preserve exactly as they are)
    textColor: "#FFFFFF",         // Primary text
    mutedTextColor: "rgba(255,255,255,0.5)", // Secondary text
    textSecondary: "rgba(255,255,255,0.3)",  // Muted text
    
    // Additional colors for full compatibility
    gray: "rgba(225, 225, 225,0.5)",
    gray100: "rgba(225, 225, 225,0.05)",
    
    // Brand colors (keep unchanged in both themes)
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
    yellow: "#E0FF55",
    
    // Sidebar-specific colors
    sidebarBackground: "rgba(43, 44, 62, 0.95)", // Semi-transparent primary200
    sidebarOverlay: "rgba(0, 0, 0, 0.5)", // Dark overlay for dark theme
    sidebarBorder: "rgba(63, 65, 82, 0.3)", // Subtle border color
    sidebarShadow: "rgba(0, 0, 0, 0.3)", // Shadow color
  }
};

export const lightTheme = {
  colors: {
    // Background colors (inverted from dark theme)
    primary: "#FFFFFF",           // Main background (was #262938)
    primary100: "#F5F5F5",        // Lightest background (was rgb(8, 8, 8))
    primary200: "#F9F9F9",        // Card backgrounds (was #2B2C3E)
    primary300: "#F0F0F0",        // Secondary backgrounds (was #2E2F40)
    primary500: "#E8E8E8",        // Elevated surfaces (was #363747)
    primary600: "#D0D0D0",        // Borders (was #3f4152)
    tabBarColor: "#FFFFFF",       // Tab bar background (was #07070F)
    
    // Text colors (inverted from light theme)
    textColor: "#000000",         // Primary text (was #FFFFFF)
    mutedTextColor: "rgba(0, 0, 0, 0.6)", // Secondary text (was rgba(255,255,255,0.5))
    textSecondary: "rgba(0, 0, 0, 0.3)",  // Muted text (was rgba(255,255,255,0.3))
    
    // Additional colors for full compatibility (inverted for light theme)
    gray: "rgba(0, 0, 0, 0.5)",           // Inverted from rgba(225, 225, 225,0.5)
    gray100: "rgba(0, 0, 0, 0.05)",       // Inverted from rgba(225, 225, 225,0.05)
    
    // Brand colors (keep unchanged - identical to dark theme)
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
    yellow: "#E0FF55",
    
    // Sidebar-specific colors (light theme)
    sidebarBackground: "rgba(249, 249, 249, 0.95)", // Semi-transparent primary200 for light theme
    sidebarOverlay: "rgba(0, 0, 0, 0.3)", // Lighter overlay for light theme
    sidebarBorder: "rgba(208, 208, 208, 0.3)", // Subtle border color for light theme
    sidebarShadow: "rgba(0, 0, 0, 0.1)", // Lighter shadow for light theme
  }
};
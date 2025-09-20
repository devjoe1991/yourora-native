# Light Mode Setup Guide for YourOra App

This guide explains how to restructure the YourOra app so that the current hard-coded "dark" theme becomes **Dark Mode**, and a new **Light Mode** is created with opposite backgrounds and surfaces, while keeping brand colors unchanged.

## Current Project Analysis

Based on the codebase analysis, your app currently uses:
- **Dark backgrounds**: `#262938`, `#2B2C3E`, `#2E2F40`, `#363747`, `#07070F`
- **Light text**: `#FFFFFF`, `rgba(255,255,255,0.5)`, `rgba(255,255,255,0.3)`
- **Brand colors**: `#7A40F8` (blue), `#00BFA5` (green), `#ef3e55` (red), etc.
- **Theme context**: Already partially implemented with `useTheme` hook

---

## Step 1 – Recognize Current Theme
- Treat **all existing colors** (from `GlobalStyles` and hard-coded values in components) as **Dark Mode**.  
- Do **not** overwrite these values. Instead, copy them into a new object called `DarkTheme`.

```js
// constants/themes.js
export const darkTheme = {
  colors: {
    // Background colors (current dark theme)
    primary: "#262938",           // Main background
    primary100: "rgb(8, 8, 8)",   // Darkest background  
    primary200: "#2B2C3E",        // Card backgrounds
    primary300: "#2E2F40",        // Secondary backgrounds
    primary500: "#363747",        // Elevated surfaces
    primary600: "#3f4152",        // Borders
    tabBarColor: "#07070F",       // Tab bar background
    
    // Text colors (current light text)
    textColor: "#FFFFFF",         // Primary text
    mutedTextColor: "rgba(255,255,255,0.5)", // Secondary text
    textSecondary: "rgba(255,255,255,0.3)",  // Muted text
    
    // Brand colors (keep unchanged)
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
  }
};
```

## Step 2 – Create Light Theme
Create a new LightTheme with **inverted backgrounds and text** while preserving brand colors:

```js
// constants/themes.js
export const lightTheme = {
  colors: {
    // Background colors (inverted from dark)
    primary: "#FFFFFF",           // Main background (was #262938)
    primary100: "#F5F5F5",        // Lightest background (was rgb(8, 8, 8))
    primary200: "#F9F9F9",        // Card backgrounds (was #2B2C3E)
    primary300: "#F0F0F0",        // Secondary backgrounds (was #2E2F40)
    primary500: "#E8E8E8",        // Elevated surfaces (was #363747)
    primary600: "#D0D0D0",        // Borders (was #3f4152)
    tabBarColor: "#FFFFFF",       // Tab bar background (was #07070F)
    
    // Text colors (inverted from light)
    textColor: "#000000",         // Primary text (was #FFFFFF)
    mutedTextColor: "rgba(0, 0, 0, 0.6)", // Secondary text (was rgba(255,255,255,0.5))
    textSecondary: "rgba(0, 0, 0, 0.3)",  // Muted text (was rgba(255,255,255,0.3))
    
    // Brand colors (keep unchanged)
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
  }
};
```

## Color Inversion Rules Applied

| Dark Theme | Light Theme | Usage |
|------------|-------------|-------|
| `#262938` | `#FFFFFF` | Primary background |
| `rgb(8, 8, 8)` | `#F5F5F5` | Secondary background |
| `#2B2C3E` | `#F9F9F9` | Card backgrounds |
| `#2E2F40` | `#F0F0F0` | Elevated surfaces |
| `#363747` | `#E8E8E8` | Border colors |
| `#3f4152` | `#D0D0D0` | Secondary borders |
| `#07070F` | `#FFFFFF` | Tab bar background |
| `#FFFFFF` | `#000000` | Primary text |
| `rgba(255,255,255,0.5)` | `rgba(0, 0, 0, 0.6)` | Secondary text |
| `rgba(255,255,255,0.3)` | `rgba(0, 0, 0, 0.3)` | Muted text |

**Brand colors remain unchanged** to maintain YourOra's visual identity.

⚠️ Cursor: Ask human for confirmation of each mapping before finalizing.

## Step 3 – Update Theme Context
Update the existing theme context to properly manage light/dark mode switching:

```js
// store/theme-context.js
import React, { createContext, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../constants/themes';

const ThemeContext = createContext({
  isDarkMode: true,
  theme: darkTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Step 4 – Update App.js
Wrap the app with ThemeProvider and update StatusBar:

```js
// App.js
import { ThemeProvider } from './store/theme-context';
import { useTheme } from './store/theme-context';

// In Root component:
const { theme } = useTheme();

// Update StatusBar:
<StatusBar 
  backgroundColor={theme.colors.primary} 
  barStyle={theme.colors.textColor === "#FFFFFF" ? "light-content" : "dark-content"}
/>
```

## Step 5 – Replace Hard-Coded Colors
For every component using hard-coded colors, replace with theme context:

**Current Pattern:**
```js
// Before
import { GlobalStyles } from '../constants/Styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary,
    color: "rgba(255,255,255,0.5)",
  }
});
```

**New Pattern:**
```js
// After  
import { useTheme } from '../store/theme-context';
const { theme } = useTheme();
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.mutedTextColor,
  }
});
```

## Step 6 – Component Update Priority
Update components in this order:
1. **App.js** - StatusBar and main container
2. **TabBar.js** - Bottom navigation (already uses theme context)
3. **Header.js** - Top navigation (already uses theme context)  
4. **Post.js** - Main content cards (already uses theme context)
5. **Button.js** - Interactive elements (already uses theme context)
6. **All screen components** - One by one

## Step 7 – Human Checkpoints

Cursor must pause and request approval at each of these checkpoints:
1. ✅ After creating themes.js with proper color mappings
2. ✅ After updating theme-context.js
3. ✅ After updating App.js with ThemeProvider
4. ✅ After updating first screen component
5. ✅ After updating 5–10 components (to verify consistency)
6. ✅ Before final global commit

## Step 8 – No Over-Engineering
- Do not generate auto-converters or scripts
- Do not refactor unrelated code  
- Focus only on color system restructuring
- Preserve existing component logic and functionality

## Step 9 – Testing Strategy
- Test theme switching on all major screens
- Verify text readability in both modes
- Check StatusBar appearance
- Validate brand colors remain consistent
- Test on different device sizes

✅ **End result:**
- DarkTheme = current colors (preserved)
- LightTheme = inverted backgrounds, preserved brand colors
- Every component uses theme context instead of hard-coded values
- Human approval checkpoints ensure control and no unwanted changes
- YourOra's visual identity maintained through consistent brand colors
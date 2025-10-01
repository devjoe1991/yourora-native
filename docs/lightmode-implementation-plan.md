# Light Mode Implementation Plan for Miha App

## Current Project Analysis

Based on your current codebase, I can see you already have:
- A `GlobalStyles` object with dark theme colors in `constants/Styles.js`
- Some theme infrastructure with `lightTheme` and `darkTheme` imports (though the themes.js file doesn't exist yet)
- Hard-coded color usage throughout components
- A design system document with Your Ora branding colors

## Implementation Strategy

### Phase 1: Create Theme System Foundation

#### Step 1: Create Theme Files
Create `constants/themes.js` with proper light and dark theme definitions:

**Dark Theme** (Current Colors - Keep As Is):
```javascript
export const darkTheme = {
  colors: {
    // Background colors (dark)
    primary: "#262938",           // Main background
    primary100: "rgb(8, 8, 8)",   // Darkest background
    primary200: "#2B2C3E",        // Card backgrounds
    primary300: "#2E2F40",        // Secondary backgrounds
    primary500: "#363747",        // Elevated surfaces
    primary600: "#3f4152",        // Borders
    tabBarColor: "#07070F",       // Tab bar background
    
    // Text colors (light)
    text: "#FFFFFF",              // Primary text
    textSecondary: "rgba(225, 225, 225,0.5)", // Secondary text
    textMuted: "rgba(225, 225, 225,0.05)",    // Muted text
    
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

**Light Theme** (Opposite Colors):
```javascript
export const lightTheme = {
  colors: {
    // Background colors (light - opposite of dark)
    primary: "#FFFFFF",           // Main background (was #262938)
    primary100: "#F5F5F5",        // Lightest background (was rgb(8, 8, 8))
    primary200: "#F9F9F9",        // Card backgrounds (was #2B2C3E)
    primary300: "#F0F0F0",        // Secondary backgrounds (was #2E2F40)
    primary500: "#E8E8E8",        // Elevated surfaces (was #363747)
    primary600: "#D0D0D0",        // Borders (was #3f4152)
    tabBarColor: "#FFFFFF",       // Tab bar background (was #07070F)
    
    // Text colors (dark - opposite of light)
    text: "#000000",              // Primary text (was #FFFFFF)
    textSecondary: "rgba(0, 0, 0, 0.6)", // Secondary text (was rgba(225, 225, 225,0.5))
    textMuted: "rgba(0, 0, 0, 0.3)",      // Muted text (was rgba(225, 225, 225,0.05))
    
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

#### Step 2: Create Theme Context
Create `store/theme-context.js`:
```javascript
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

### Phase 2: Update App Structure

#### Step 3: Update App.js
Wrap the app with ThemeProvider and update StatusBar:
```javascript
import { ThemeProvider } from './store/theme-context';
import { useTheme } from './store/theme-context';

// In Root component:
const { theme } = useTheme();

// Update StatusBar:
<StatusBar 
  backgroundColor={theme.colors.primary} 
  barStyle={theme.colors.text === "#FFFFFF" ? "light-content" : "dark-content"}
/>
```

#### Step 4: Update GlobalStyles.js
Modify to use theme context:
```javascript
import { darkTheme, lightTheme } from './themes';

export const GlobalStyles = {
  getColors: (isDark = true) => isDark ? darkTheme : lightTheme,
  
  // Keep legacy colors for backward compatibility during transition
  colors: { /* existing colors */ },
};
```

### Phase 3: Component Refactoring

#### Step 5: Update Components (Priority Order)
1. **App.js** - StatusBar and main container
2. **AuthNavigation.js** - Main navigation wrapper
3. **TabBar.js** - Bottom navigation
4. **Header.js** - Top navigation
5. **Post.js** - Main content cards
6. **Button.js** - Interactive elements
7. **InputField.js** - Form elements
8. **All screen components** - One by one

#### Step 6: Component Update Pattern
For each component:
```javascript
// Before:
import { GlobalStyles } from '../constants/Styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary,
  }
});

// After:
import { useTheme } from '../store/theme-context';
const { theme } = useTheme();
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  }
});
```

### Phase 4: Testing & Validation

#### Step 7: Human Checkpoints
1. ✅ After creating themes.js and theme-context.js
2. ✅ After updating App.js with ThemeProvider
3. ✅ After updating first component (TabBar)
4. ✅ After updating 5-10 components
5. ✅ Before final global commit

#### Step 8: Testing Strategy
- Test theme switching on all major screens
- Verify text readability in both modes
- Check StatusBar appearance
- Validate brand colors remain consistent
- Test on different device sizes

### Phase 5: Theme Toggle Implementation

#### Step 9: Add Theme Toggle
- Add toggle button in settings/profile screen
- Persist theme preference in AsyncStorage
- Add system theme detection (optional)

## Color Mapping Reference

| Dark Theme | Light Theme | Purpose |
|------------|-------------|---------|
| #262938 | #FFFFFF | Primary background |
| rgb(8, 8, 8) | #F5F5F5 | Secondary background |
| #2B2C3E | #F9F9F9 | Card background |
| #2E2F40 | #F0F0F0 | Elevated surface |
| #363747 | #E8E8E8 | Border color |
| #3f4152 | #D0D0D0 | Secondary border |
| #07070F | #FFFFFF | Tab bar |
| #FFFFFF | #000000 | Primary text |
| rgba(225, 225, 225,0.5) | rgba(0, 0, 0, 0.6) | Secondary text |
| rgba(225, 225, 225,0.05) | rgba(0, 0, 0, 0.3) | Muted text |

## Brand Colors (Unchanged)
All brand colors (blue, green, red, etc.) remain exactly the same in both themes to maintain brand consistency.

## Next Steps
1. Create the theme files
2. Set up theme context
3. Update App.js
4. Begin component refactoring with TabBar
5. Test and iterate

This plan ensures a systematic approach while maintaining your existing design system and brand identity.

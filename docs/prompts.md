# Light Mode Implementation Prompts

## Overview
This document contains step-by-step prompts to implement light mode for YourOra app. Each prompt is designed to be executed one at a time with extreme caution to avoid any app errors. The current app uses dark theme hard-coded colors, and we're creating a light mode version.

---

## Phase 1: Foundation Setup

### Prompt 1: Create Theme Files
**Task:** Create the theme definition files with proper color mappings.

**Instructions:**
1. Create `constants/themes.js` file
2. Define `darkTheme` object with current app colors (preserve exactly as they are)
3. Define `lightTheme` object with inverted colors (dark backgrounds → light, light text → dark)
4. Keep ALL brand colors identical in both themes
5. Use the color mapping table from lightmode.md for exact inversions

**Expected Result:** A themes.js file with both dark and light theme objects, ready for use.

---

### Prompt 2: Create Theme Context
**Task:** Set up the theme context system for managing theme state.

**Instructions:**
1. Create `store/theme-context.js` file
2. Import both themes from constants/themes.js
3. Create ThemeContext with isDarkMode, theme, and toggleTheme
4. Create ThemeProvider component with useState for isDarkMode
5. Default to dark mode (isDarkMode: true)
6. Export useTheme hook and ThemeProvider

**Expected Result:** A working theme context system that can switch between dark and light themes.

---

### Prompt 3: Update App.js with Theme Provider
**Task:** Wrap the app with ThemeProvider and update StatusBar.

**Instructions:**
1. Import ThemeProvider from store/theme-context.js
2. Import useTheme hook
3. Wrap the entire app with ThemeProvider
4. Update StatusBar to use theme.colors.primary for backgroundColor
5. Update StatusBar barStyle based on theme (light-content for dark, dark-content for light)
6. Test that app still works with dark theme (no changes visible yet)

**Expected Result:** App wrapped with theme provider, StatusBar responds to theme changes.

---

## Phase 2: Component Analysis and Preparation

### Prompt 4: Analyze Current Component Color Usage
**Task:** Document all hard-coded colors in components to understand what needs to be changed.

**Instructions:**
1. Search through all components for hard-coded color values
2. Create a list of components that use GlobalStyles.colors
3. Create a list of components with hard-coded rgba/rgb/hex values
4. Identify which components already use useTheme hook
5. Document the current color usage patterns

**Expected Result:** A comprehensive list of all components and their color usage patterns.

---

### Prompt 5: Update GlobalStyles.js for Backward Compatibility
**Task:** Modify GlobalStyles to work with theme system while maintaining backward compatibility.

**Instructions:**
1. Import darkTheme and lightTheme from constants/themes.js
2. Add getColors function that returns appropriate theme based on isDark parameter
3. Keep existing colors object for backward compatibility during transition
4. Ensure no existing components break

**Expected Result:** GlobalStyles updated to support theme system without breaking existing code.

---

## Phase 3: Core Component Updates

### Prompt 6: Update TabBar Component
**Task:** Update TabBar to use theme context properly (it already uses useTheme but may need adjustments).

**Instructions:**
1. Check current TabBar implementation
2. Ensure it uses theme.colors for all color properties
3. Replace any hard-coded colors with theme references
4. Test that TabBar works in both dark and light modes
5. Verify tab icons and text colors change appropriately

**Expected Result:** TabBar fully responsive to theme changes.

---

### Prompt 7: Update Header Component
**Task:** Update Header component to use theme context properly.

**Instructions:**
1. Check current Header implementation
2. Ensure it uses theme.colors for all color properties
3. Replace any hard-coded colors with theme references
4. Update logo switching logic if needed
5. Test that Header works in both dark and light modes

**Expected Result:** Header fully responsive to theme changes.

---

### Prompt 8: Update Button Component
**Task:** Update Button component to use theme context properly.

**Instructions:**
1. Check current Button implementation
2. Ensure it uses theme.colors for all color properties
3. Replace any hard-coded colors with theme references
4. Test that Button works in both dark and light modes
5. Verify button text and background colors change appropriately

**Expected Result:** Button component fully responsive to theme changes.

---

### Prompt 9: Update Post Component
**Task:** Update Post component to use theme context properly.

**Instructions:**
1. Check current Post implementation
2. Ensure it uses theme.colors for all color properties
3. Replace any hard-coded colors with theme references
4. Test that Post works in both dark and light modes
5. Verify post text, backgrounds, and borders change appropriately

**Expected Result:** Post component fully responsive to theme changes.

---

## Phase 4: Screen Component Updates

### Prompt 10: Update HomeScreen
**Task:** Update HomeScreen to use theme context.

**Instructions:**
1. Check current HomeScreen implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Test that HomeScreen works in both dark and light modes
5. Verify all text and background colors change appropriately

**Expected Result:** HomeScreen fully responsive to theme changes.

---

### Prompt 11: Update AuthNavigation
**Task:** Update AuthNavigation to use theme context.

**Instructions:**
1. Check current AuthNavigation implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Test that AuthNavigation works in both dark and light modes
5. Verify navigation colors change appropriately

**Expected Result:** AuthNavigation fully responsive to theme changes.

---

### Prompt 12: Update LoginScreen
**Task:** Update LoginScreen to use theme context.

**Instructions:**
1. Check current LoginScreen implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Update text colors to use theme.colors.textColor
5. Test that LoginScreen works in both dark and light modes

**Expected Result:** LoginScreen fully responsive to theme changes.

---

### Prompt 13: Update SignupScreen
**Task:** Update SignupScreen to use theme context.

**Instructions:**
1. Check current SignupScreen implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Update text colors to use theme.colors.textColor
5. Test that SignupScreen works in both dark and light modes

**Expected Result:** SignupScreen fully responsive to theme changes.

---

### Prompt 14: Update ExploreScreen
**Task:** Update ExploreScreen to use theme context.

**Instructions:**
1. Check current ExploreScreen implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Update text colors to use theme.colors.textColor
5. Test that ExploreScreen works in both dark and light modes

**Expected Result:** ExploreScreen fully responsive to theme changes.

---

### Prompt 15: Update ReelsScreen
**Task:** Update ReelsScreen to use theme context.

**Instructions:**
1. Check current ReelsScreen implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Update text colors to use theme.colors.textColor
5. Test that ReelsScreen works in both dark and light modes

**Expected Result:** ReelsScreen fully responsive to theme changes.

---

### Prompt 16: Update MessagesScreen
**Task:** Update MessagesScreen to use theme context.

**Instructions:**
1. Check current MessagesScreen implementation
2. Replace any hard-coded colors with theme references
3. Ensure background colors use theme.colors.primary
4. Update text colors to use theme.colors.textColor
5. Test that MessagesScreen works in both dark and light modes

**Expected Result:** MessagesScreen fully responsive to theme changes.

---

## Phase 5: Remaining Components

### Prompt 17: Update InputField Component
**Task:** Update InputField component to use theme context.

**Instructions:**
1. Check current InputField implementation
2. Replace any hard-coded colors with theme references
3. Ensure placeholder text colors use theme.colors.mutedTextColor
4. Update border colors to use theme.colors.primary600
5. Test that InputField works in both dark and light modes

**Expected Result:** InputField component fully responsive to theme changes.

---

### Prompt 18: Update All Remaining Components
**Task:** Update all remaining components to use theme context.

**Instructions:**
1. Go through each remaining component systematically
2. Replace any hard-coded colors with theme references
3. Ensure all components use theme.colors for color properties
4. Test each component in both dark and light modes
5. Fix any issues that arise

**Expected Result:** All components fully responsive to theme changes.

---

## Phase 6: Testing and Validation

### Prompt 19: Test Theme Switching
**Task:** Test the theme switching functionality across all screens.

**Instructions:**
1. Add a temporary theme toggle button to test switching
2. Test switching between dark and light modes
3. Verify all screens work correctly in both modes
4. Check that text is readable in both modes
5. Verify brand colors remain consistent

**Expected Result:** Theme switching works correctly across all screens.

---

### Prompt 20: Final Validation and Cleanup
**Task:** Final validation and cleanup of the theme implementation.

**Instructions:**
1. Remove any temporary test code
2. Verify all components use theme context consistently
3. Check for any remaining hard-coded colors
4. Test the app thoroughly in both modes
5. Ensure no app errors occur

**Expected Result:** Clean, working light mode implementation with no errors.

---

## Important Notes

### Color Mapping Rules
- **Dark backgrounds** → **Light backgrounds** (e.g., #262938 → #FFFFFF)
- **Light text** → **Dark text** (e.g., #FFFFFF → #000000)
- **Brand colors** → **Keep unchanged** (e.g., #7A40F8 stays #7A40F8)

### Safety Guidelines
1. **Always test after each prompt** - Don't proceed to next prompt if current one has errors
2. **Preserve existing functionality** - Only change colors, don't modify logic
3. **Use theme context consistently** - Replace hard-coded colors with theme references
4. **Maintain brand identity** - Keep all brand colors identical in both themes
5. **Test thoroughly** - Verify each component works in both dark and light modes

### Error Prevention
- If any prompt causes errors, stop and fix before proceeding
- Always backup working state before making changes
- Test theme switching after each major component update
- Verify text readability in both modes
- Check that all interactive elements work correctly

---

## Execution Order
Execute these prompts in exact order, one at a time. Do not skip or combine prompts. Each prompt builds on the previous one and must be completed successfully before moving to the next.

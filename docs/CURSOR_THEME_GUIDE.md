# 🎨 Cursor AI: Theme Integration Guide for New Components

## **Purpose**
This guide instructs Cursor AI on how to automatically integrate any new components with the Miha app's light/dark theme system.

---

## **🚨 CRITICAL RULES FOR NEW COMPONENTS**

### **1. ALWAYS Import Theme Context**
```javascript
import { useTheme } from '../store/theme-context';
// OR for deeper nested components:
import { useTheme } from '../../store/theme-context';
```

### **2. ALWAYS Use useTheme Hook Inside Component**
```javascript
const MyNewComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  // Component logic here
};
```

### **3. ALWAYS Put StyleSheet.create INSIDE Component Function**
```javascript
const MyNewComponent = () => {
  const { theme } = useTheme();
  
  // ✅ CORRECT - Inside component
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      padding: 16,
    },
    text: {
      color: theme.colors.textColor,
    }
  });
  
  return <View style={styles.container} />;
};
```

### **4. NEVER Use Hard-coded Colors**
```javascript
// ❌ NEVER DO THIS
<Text style={{ color: "white" }}>Hello</Text>
<View style={{ backgroundColor: "#000000" }} />
<Text style={{ color: "black" }}>World</Text>

// ✅ ALWAYS DO THIS
<Text style={{ color: theme.colors.textColor }}>Hello</Text>
<View style={{ backgroundColor: theme.colors.primary }} />
<Text style={{ color: theme.colors.textColor }}>World</Text>
```

---

## **🎯 AVAILABLE THEME COLORS**

### **Background Colors**
- `theme.colors.primary` - Main background
- `theme.colors.primary100` - Darkest/lightest background
- `theme.colors.primary200` - Card backgrounds
- `theme.colors.primary300` - Secondary backgrounds
- `theme.colors.primary500` - Elevated surfaces
- `theme.colors.primary600` - Borders
- `theme.colors.tabBarColor` - Tab bar background

### **Text Colors**
- `theme.colors.textColor` - Primary text
- `theme.colors.mutedTextColor` - Secondary text
- `theme.colors.textSecondary` - Muted text

### **Utility Colors**
- `theme.colors.gray` - General gray
- `theme.colors.gray100` - Light gray

### **Brand Colors** (Same in both themes)
- `theme.colors.blue` - Primary blue (#7A40F8)
- `theme.colors.blue100` - Light blue (#6BB0f5)
- `theme.colors.cyan` - Cyan (#4cc9f0)
- `theme.colors.purple` - Purple (#C3B1E1)
- `theme.colors.greenLight` - Light green (#00ECCA)
- `theme.colors.red` - Red (#ef3e55)
- `theme.colors.orange` - Orange (#fdac1d)
- `theme.colors.yellow` - Yellow (#E0FF55)

---

## **📋 COMPONENT TEMPLATE**

Use this template for ALL new components:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../store/theme-context';

const MyNewComponent = ({ prop1, prop2 }) => {
  const { theme, isDarkMode } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
    },
    title: {
      color: theme.colors.textColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      color: theme.colors.mutedTextColor,
      fontSize: 14,
      marginTop: 4,
    },
    button: {
      backgroundColor: theme.colors.blue,
      padding: 12,
      borderRadius: 6,
      marginTop: 16,
    },
    buttonText: {
      color: theme.colors.textColor,
      textAlign: 'center',
      fontWeight: '600',
    },
    border: {
      borderColor: theme.colors.primary600,
      borderWidth: 1,
    }
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <View style={[styles.button, styles.border]}>
        <Text style={styles.buttonText}>Button</Text>
      </View>
    </View>
  );
};

export default MyNewComponent;
```

---

## **🔧 COMMON PATTERNS**

### **Conditional Rendering Based on Theme**
```javascript
const MyComponent = () => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View>
      {isDarkMode ? (
        <DarkIcon />
      ) : (
        <LightIcon />
      )}
    </View>
  );
};
```

### **Dynamic StatusBar**
```javascript
import { StatusBar } from 'react-native';

const MyScreen = () => {
  const { theme } = useTheme();
  
  return (
    <View>
      <StatusBar 
        backgroundColor={theme.colors.primary} 
        barStyle={theme.colors.textColor === "#FFFFFF" ? "light-content" : "dark-content"} 
      />
      {/* Screen content */}
    </View>
  );
};
```

### **LinearGradient with Theme Colors**
```javascript
import LinearGradient from 'expo-linear-gradient';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <LinearGradient
      colors={[theme.colors.blue, theme.colors.cyan]}
      style={styles.gradient}
    >
      <Text style={{ color: theme.colors.textColor }}>Gradient Text</Text>
    </LinearGradient>
  );
};
```

### **Ionicons with Theme Colors**
```javascript
import { Ionicons } from '@expo/vector-icons';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <Ionicons 
      name="heart" 
      size={24} 
      color={theme.colors.textColor} 
    />
  );
};
```

---

## **⚠️ COMMON MISTAKES TO AVOID**

### **❌ StyleSheet.create Outside Component**
```javascript
// WRONG - Can't access theme
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary, // ERROR!
  }
});

const MyComponent = () => {
  const { theme } = useTheme();
  return <View style={styles.container} />;
};
```

### **❌ Using GlobalStyles.colors**
```javascript
// WRONG - Use theme instead
import { GlobalStyles } from '../constants/Styles';

const MyComponent = () => {
  return (
    <View style={{ backgroundColor: GlobalStyles.colors.primary }} /> // WRONG!
  );
};
```

### **❌ Hard-coded Colors**
```javascript
// WRONG - Use theme colors
<Text style={{ color: "white" }}>Hello</Text>
<View style={{ backgroundColor: "#000000" }} />
<Text style={{ color: "black" }}>World</Text>
```

---

## **🧪 TESTING NEW COMPONENTS**

### **Add Theme Toggle for Testing**
```javascript
const MyNewComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <View>
      <Button 
        title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        onPress={toggleTheme}
      />
      {/* Your component content */}
    </View>
  );
};
```

---

## **📁 FILE LOCATIONS**

- **Theme Context**: `store/theme-context.js`
- **Theme Definitions**: `constants/themes.js`
- **Theme Validator**: `utils/themeValidator.js`
- **Development Guide**: `docs/THEME_DEVELOPMENT_GUIDE.md`

---

## **🎯 QUICK CHECKLIST**

When creating ANY new component, ensure:

- [ ] Import `useTheme` from correct path
- [ ] Use `const { theme } = useTheme()` inside component
- [ ] Put `StyleSheet.create` inside component function
- [ ] Use `theme.colors.propertyName` for all colors
- [ ] No hard-coded colors (`"white"`, `"#000"`, etc.)
- [ ] No `GlobalStyles.colors` usage
- [ ] Test with theme toggle button
- [ ] Works in both light and dark modes

---

## **🚀 AUTOMATION RULES**

**When Cursor creates new components:**

1. **Always** add theme import
2. **Always** add useTheme hook
3. **Always** use theme colors instead of hard-coded values
4. **Always** put StyleSheet.create inside component
5. **Always** test with both themes
6. **Never** use GlobalStyles.colors
7. **Never** hard-code colors

**This ensures 100% theme compatibility for all future components!**

---

## **💡 PRO TIPS**

- Use `theme.colors.textColor` for all text
- Use `theme.colors.primary` for main backgrounds
- Use `theme.colors.primary600` for borders
- Use `theme.colors.mutedTextColor` for secondary text
- Brand colors (blue, red, etc.) stay the same in both themes
- Always test with theme toggle to ensure proper adaptation

**Follow these rules and every new component will be automatically theme-aware! 🎨**

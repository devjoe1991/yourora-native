# 🎨 Theme Development Guide

## **Future-Proof Theme System for YourOra App**

This guide ensures that any new components or features you add will automatically work with the theme system.

---

## **🚀 Quick Start for New Components**

### **1. Always Use Theme Context**
```javascript
import { useTheme } from '../store/theme-context';

const MyNewComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.textColor }}>
        This automatically adapts to light/dark mode!
      </Text>
    </View>
  );
};
```

### **2. StyleSheet.create Inside Component**
```javascript
const MyComponent = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      padding: 16,
    },
    text: {
      color: theme.colors.textColor,
      fontSize: 16,
    }
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
};
```

---

## **🎯 Available Colors**

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
- `theme.colors.blue` - Primary blue
- `theme.colors.blue100` - Light blue
- `theme.colors.cyan` - Cyan
- `theme.colors.purple` - Purple
- `theme.colors.greenLight` - Light green
- `theme.colors.red` - Red
- `theme.colors.orange` - Orange
- `theme.colors.yellow` - Yellow
- And more...

---

## **➕ Adding New Colors**

### **Step 1: Add to Both Themes**
Edit `/constants/themes.js`:

```javascript
// In darkTheme.colors
newColor: "#FF0000",  // Dark theme value

// In lightTheme.colors  
newColor: "#00FF00",  // Light theme value
```

### **Step 2: Validate**
```javascript
import { validateThemes } from '../utils/themeValidator';
validateThemes(); // Check console for validation results
```

### **Step 3: Use in Components**
```javascript
const { theme } = useTheme();
<View style={{ backgroundColor: theme.colors.newColor }} />
```

---

## **🔧 Theme Functions**

### **Available in useTheme()**
```javascript
const { 
  theme,           // Current theme object
  isDarkMode,      // Boolean: true for dark, false for light
  toggleTheme,     // Function: Switch between themes
  setTheme         // Function: Set specific theme (true/false)
} = useTheme();
```

### **Examples**
```javascript
// Toggle theme
<Button onPress={toggleTheme} title="Switch Theme" />

// Set specific theme
<Button onPress={() => setTheme(true)} title="Dark Mode" />
<Button onPress={() => setTheme(false)} title="Light Mode" />

// Check current theme
{isDarkMode ? <DarkIcon /> : <LightIcon />}
```

---

## **⚠️ Common Mistakes to Avoid**

### **❌ DON'T: Hard-code colors**
```javascript
// BAD
<Text style={{ color: "white" }}>Hello</Text>
<View style={{ backgroundColor: "#000000" }} />
```

### **✅ DO: Use theme colors**
```javascript
// GOOD
<Text style={{ color: theme.colors.textColor }}>Hello</Text>
<View style={{ backgroundColor: theme.colors.primary }} />
```

### **❌ DON'T: StyleSheet.create outside component**
```javascript
// BAD - Can't access theme
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

### **✅ DO: StyleSheet.create inside component**
```javascript
// GOOD - Can access theme
const MyComponent = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary, // Works!
    }
  });
  
  return <View style={styles.container} />;
};
```

---

## **🧪 Testing Your Components**

### **1. Test Both Themes**
```javascript
const TestComponent = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <View>
      <Text>Current theme: {isDarkMode ? 'Dark' : 'Light'}</Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
      {/* Your component here */}
    </View>
  );
};
```

### **2. Validate Theme Consistency**
```javascript
import { validateThemes } from '../utils/themeValidator';

// Run this in your app to check for missing colors
validateThemes();
```

---

## **📱 Theme Persistence**

The theme system automatically:
- ✅ Saves your theme choice to device storage
- ✅ Restores theme on app restart
- ✅ Prevents theme flash on startup
- ✅ Works offline

---

## **🔍 Debugging**

### **Check Available Colors**
```javascript
import { getAllColors } from '../utils/themeValidator';
console.log('Available colors:', getAllColors());
```

### **Check if Color Exists**
```javascript
import { colorExists } from '../utils/themeValidator';
console.log('Has blue color:', colorExists('blue'));
```

---

## **📋 Checklist for New Components**

- [ ] Import `useTheme` hook
- [ ] Use `theme.colors.propertyName` for all colors
- [ ] Put `StyleSheet.create` inside component function
- [ ] Test in both light and dark modes
- [ ] No hard-coded colors (`"white"`, `"#000"`, etc.)
- [ ] No `GlobalStyles.colors` usage
- [ ] Validate with `validateThemes()`

---

## **🎉 That's It!**

Your theme system is now **100% future-proof**! Any new component you create will automatically work with both light and dark themes as long as you follow these guidelines.

**Happy coding, Bruv! 🚀**

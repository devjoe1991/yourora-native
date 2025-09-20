import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';

const ThemeToggleSwitch = ({ size = 24 }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      width: 50,
      height: 30,
      borderRadius: 15,
      backgroundColor: isDarkMode ? theme.colors.primary600 : theme.colors.primary300,
      padding: 2,
      justifyContent: 'center',
      alignItems: isDarkMode ? 'flex-start' : 'flex-end',
      borderWidth: 1,
      borderColor: theme.colors.primary600,
    },
    toggle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.textColor,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    icon: {
      color: theme.colors.primary,
    }
  });

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <View style={styles.toggle}>
        <Ionicons 
          name={isDarkMode ? "moon" : "sunny"} 
          size={size * 0.6} 
          color={theme.colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ThemeToggleSwitch;

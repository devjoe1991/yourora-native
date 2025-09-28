import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../store/theme-context';

const MahiTextLogo = ({ 
  size = 'large', 
  style = {},
  showSubtitle = false 
}) => {
  const { theme, isDarkMode } = useTheme();
  
  // Size variants
  const sizeConfig = {
    small: {
      fontSize: 12,
      containerSize: 50,
      borderRadius: 6,
    },
    medium: {
      fontSize: 16,
      containerSize: 65,
      borderRadius: 10,
    },
    large: {
      fontSize: 20,
      containerSize: 80,
      borderRadius: 12,
    },
    xlarge: {
      fontSize: 24,
      containerSize: 95,
      borderRadius: 16,
    }
  };

  const config = sizeConfig[size] || sizeConfig.large;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      width: config.containerSize,
      height: config.containerSize,
      backgroundColor: isDarkMode ? theme.colors.primary300 : theme.colors.greenLight,
      borderRadius: config.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    },
    logoText: {
      fontSize: config.fontSize,
      fontWeight: '900',
      textAlign: 'center',
      letterSpacing: 2,
      color: theme.colors.textColor,
      lineHeight: config.fontSize * 1.1,
    },
    // Individual letter styling for the "short to tall" effect
    m: {
      fontSize: config.fontSize * 0.8, // Shortest
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      letterSpacing: 2,
    },
    a: {
      fontSize: config.fontSize * 0.9, // Slightly taller
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      letterSpacing: 2,
    },
    h: {
      fontSize: config.fontSize * 1.1, // Taller
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      letterSpacing: 2,
    },
    i: {
      fontSize: config.fontSize * 1.2, // Tallest
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      letterSpacing: 2,
    },
    subtitle: {
      fontSize: config.fontSize * 0.4,
      color: theme.colors.textSecondary,
      fontWeight: '600',
      marginTop: 2,
      letterSpacing: 1,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.m}>M</Text>
        <Text style={styles.a}>A</Text>
        <Text style={styles.h}>H</Text>
        <Text style={styles.i}>I</Text>
      </View>
      {showSubtitle && (
        <Text style={styles.subtitle}>Your Mahi</Text>
      )}
    </View>
  );
};

export default MahiTextLogo;

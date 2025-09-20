import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../store/theme-context';

const YourOraTextLogo = ({ 
  size = 'large', 
  style = {} 
}) => {
  const { theme, isDarkMode } = useTheme();
  
  // Size variants
  const sizeConfig = {
    small: {
      fontSize: 12,
      subtitleFontSize: 6,
      spacing: 2,
      containerSize: 50,
      borderRadius: 6,
    },
    medium: {
      fontSize: 16,
      subtitleFontSize: 7,
      spacing: 2,
      containerSize: 65,
      borderRadius: 10,
    },
    large: {
      fontSize: 20,
      subtitleFontSize: 8,
      spacing: 3,
      containerSize: 80,
      borderRadius: 12,
    },
    xlarge: {
      fontSize: 24,
      subtitleFontSize: 10,
      spacing: 4,
      containerSize: 95,
      borderRadius: 16,
    }
  };

  const config = sizeConfig[size] || sizeConfig.large;

  // Gradient colors for both themes
  const gradientColors = isDarkMode 
    ? [theme.colors.blue, theme.colors.purple, theme.colors.cyan]
    : [theme.colors.greenLight, theme.colors.blue, theme.colors.cyan];

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      width: config.containerSize,
      height: config.containerSize,
      borderRadius: config.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
    logoText: {
      fontSize: config.fontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      letterSpacing: 0.5,
      color: isDarkMode ? theme.colors.textColor : theme.colors.primary,
      lineHeight: config.fontSize * 1.1,
      marginTop: 1,
    },
    subtitle: {
      fontSize: config.subtitleFontSize,
      color: theme.colors.mutedTextColor,
      textAlign: 'center',
      marginTop: config.spacing,
      fontWeight: '500',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoContainer}
      >
        <Text style={styles.logoText}>
          YOUR{'\n'}ORA
        </Text>
      </LinearGradient>
    </View>
  );
};

export default YourOraTextLogo;

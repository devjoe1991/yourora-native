import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      fontWeight: 'bold',
      textAlign: 'center',
      letterSpacing: 0.5,
      color: theme.colors.textColor,
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
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          YOUR{'\n'}ORA
        </Text>
      </View>
    </View>
  );
};

export default YourOraTextLogo;

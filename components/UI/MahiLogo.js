import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../store/theme-context';

const MahiLogo = ({ size = 'large', style }) => {
  const { theme } = useTheme();
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: 16, letterSpacing: 2 };
      case 'medium':
        return { fontSize: 24, letterSpacing: 3 };
      case 'large':
        return { fontSize: 32, letterSpacing: 4 };
      case 'xlarge':
        return { fontSize: 48, letterSpacing: 6 };
      default:
        return { fontSize: 32, letterSpacing: 4 };
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    letter: {
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      ...getSizeStyles(),
    },
    // Individual letter styling for the "short to tall" effect
    m: {
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      ...getSizeStyles(),
      fontSize: getSizeStyles().fontSize * 0.8, // Shortest
    },
    a: {
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      ...getSizeStyles(),
      fontSize: getSizeStyles().fontSize * 0.9, // Slightly taller
    },
    h: {
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      ...getSizeStyles(),
      fontSize: getSizeStyles().fontSize * 1.1, // Taller
    },
    i: {
      fontWeight: '900',
      color: theme.colors.textColor,
      textAlign: 'center',
      ...getSizeStyles(),
      fontSize: getSizeStyles().fontSize * 1.2, // Tallest
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.m}>M</Text>
      <Text style={styles.a}>A</Text>
      <Text style={styles.h}>H</Text>
      <Text style={styles.i}>I</Text>
    </View>
  );
};

export default MahiLogo;

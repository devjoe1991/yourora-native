import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';

const { width } = Dimensions.get('window');

const PremiumBanner = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 16,
      borderRadius: 24,
      overflow: 'hidden',
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
    },
    gradient: {
      padding: 28,
      minHeight: 120,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    premiumIcon: {
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: 8,
      textAlign: 'center',
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 18,
      color: 'rgba(255, 255, 255, 0.95)',
      textAlign: 'center',
      fontWeight: '600',
      lineHeight: 24,
      marginBottom: 4,
    },
    healthFocus: {
      fontSize: 14,
      color: 'rgba(255, 215, 0, 0.9)',
      textAlign: 'center',
      fontWeight: '500',
      letterSpacing: 0.5,
    },
    accentLine: {
      width: 60,
      height: 4,
      backgroundColor: 'rgba(255, 215, 0, 0.8)',
      borderRadius: 2,
      marginTop: 16,
    },
    cornerAccent: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 215, 0, 0.6)',
    },
    progressContainer: {
      marginTop: 12,
      alignItems: 'center',
    },
    progressBar: {
      width: 120,
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      overflow: 'hidden',
      marginBottom: 6,
    },
    progressFill: {
      height: '100%',
      width: '70%',
      backgroundColor: '#FFD700',
      borderRadius: 2,
    },
    progressText: {
      fontSize: 12,
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
  });
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Ionicons 
          name="diamond" 
          size={36} 
          color="rgba(255, 255, 255, 0.9)" 
          style={styles.premiumIcon}
        />
        <Text style={styles.title}>Mahi+ Premium</Text>
        <Text style={styles.subtitle}>Unlock the full Mahi experience</Text>
        <Text style={styles.healthFocus}>Track • Analyze • Transform</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>50% before midnight</Text>
        </View>
        <View style={styles.accentLine} />
        <View style={styles.cornerAccent} />
      </LinearGradient>
    </View>
  );
};

export default PremiumBanner;

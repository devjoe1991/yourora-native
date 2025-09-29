import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';

const { width } = Dimensions.get('window');

const OffersBanner = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 16,
      borderRadius: 20,
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    gradient: {
      padding: 20,
      minHeight: 80,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 6,
      textAlign: 'center',
      letterSpacing: 0.8,
    },
    subtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
      fontWeight: '500',
      lineHeight: 22,
    },
    accentLine: {
      width: 50,
      height: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 2,
      marginTop: 12,
    },
    cornerAccent: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    socialProof: {
      fontSize: 12,
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      marginTop: 4,
    },
  });
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6', '#1e3a8a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>Exclusive Offers</Text>
        <Text style={styles.subtitle}>Limited time premium deals</Text>
        <Text style={styles.socialProof}>Join 2,847 users who upgraded this week</Text>
        <View style={styles.accentLine} />
        <View style={styles.cornerAccent} />
      </LinearGradient>
    </View>
  );
};

export default OffersBanner;

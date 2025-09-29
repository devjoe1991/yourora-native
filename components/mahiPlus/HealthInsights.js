import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';

const { width } = Dimensions.get('window');

const HealthInsights = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 16,
      borderRadius: 24,
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    gradient: {
      padding: 24,
      minHeight: 120,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerIcon: {
      marginRight: 12,
    },
    headerText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 0.8,
    },
    insightsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    insightItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
    },
    insightValue: {
      fontSize: 28,
      fontWeight: '800',
      color: '#FFD700',
      marginBottom: 6,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    insightLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    upgradePrompt: {
      marginTop: 20,
      padding: 16,
      backgroundColor: 'rgba(255, 215, 0, 0.15)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 215, 0, 0.4)',
    },
    upgradeText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#FFD700',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
  });
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2a2a2a', '#3a3a3a', '#2a2a2a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Ionicons 
            name="pulse" 
            size={24} 
            color="#FFD700" 
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>Your Health Insights</Text>
        </View>
        
        <View style={styles.insightsGrid}>
          <View style={styles.insightItem}>
            <Text style={styles.insightValue}>7</Text>
            <Text style={styles.insightLabel}>Day Streak</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightValue}>12</Text>
            <Text style={styles.insightLabel}>Workouts</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightValue}>85%</Text>
            <Text style={styles.insightLabel}>Consistency</Text>
          </View>
        </View>
        
        <View style={styles.upgradePrompt}>
          <Text style={styles.upgradeText}>
            🔒 Unlock detailed analytics, health data sync & AI insights
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default HealthInsights;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';
import AppleSubscriptionModal from './AppleSubscriptionModal';

const { width } = Dimensions.get('window');

const FeatureSquare = ({ title, subtitle, icon, color, iconName, onPress, showPremiumBadge = true }) => {
  const { theme } = useTheme();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  const styles = StyleSheet.create({
    container: {
      width: (width - 56) / 2,
      height: 160,
      borderRadius: 24,
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    gradient: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    icon: {
      fontSize: 28,
      color: '#FFFFFF',
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: 22,
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12,
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      lineHeight: 16,
      letterSpacing: 0.2,
    },
    accentDot: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    premiumBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: 'rgba(255, 215, 0, 0.9)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    premiumText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#000000',
      letterSpacing: 0.5,
    },
  });
  
          const handlePress = () => {
            if (showPremiumBadge) {
              setShowSubscriptionModal(true);
            } else if (onPress) {
              onPress();
            }
          };

          return (
            <>
              <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
                <LinearGradient
                  colors={[color, color + 'DD', color + 'BB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradient}
                >
                  {showPremiumBadge && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>PREMIUM</Text>
                    </View>
                  )}
                  <View style={styles.iconContainer}>
                    {iconName ? (
                      <Ionicons name={iconName} size={28} color="#FFFFFF" />
                    ) : (
                      <Text style={styles.icon}>{icon}</Text>
                    )}
                  </View>
                  <Text style={styles.title}>{title}</Text>
                  {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                  <View style={styles.accentDot} />
                </LinearGradient>
              </TouchableOpacity>
              
              <AppleSubscriptionModal
                visible={showSubscriptionModal}
                onClose={() => setShowSubscriptionModal(false)}
                onSubscribe={() => {
                  console.log('Subscribe with Apple pressed from feature');
                  setShowSubscriptionModal(false);
                }}
              />
            </>
          );
};

export default FeatureSquare;

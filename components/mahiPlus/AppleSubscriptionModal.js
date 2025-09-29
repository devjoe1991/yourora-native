import React from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';

const { width, height } = Dimensions.get('window');

const AppleSubscriptionModal = ({ visible, onClose, onSubscribe }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderRadius: 28,
      width: '95%',
      maxHeight: height * 0.8,
      borderWidth: 1,
      borderColor: 'rgba(255, 215, 0, 0.3)',
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 20,
    },
    header: {
      padding: 24,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 215, 0, 0.2)',
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    appleIcon: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: '#FFFFFF',
      textAlign: 'center',
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      fontWeight: '500',
    },
    content: {
      padding: 24,
    },
    pricingSection: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 215, 0, 0.2)',
    },
    pricingTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFD700',
      textAlign: 'center',
      marginBottom: 16,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    originalPrice: {
      fontSize: 18,
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.5)',
      textDecorationLine: 'line-through',
      marginRight: 12,
    },
    discountedPrice: {
      fontSize: 24,
      fontWeight: '800',
      color: '#FFD700',
      letterSpacing: 0.5,
    },
    discountBadge: {
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      marginLeft: 12,
    },
    discountText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#FFD700',
    },
    featuresList: {
      marginBottom: 24,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    featureIcon: {
      marginRight: 12,
    },
    featureText: {
      fontSize: 15,
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
      flex: 1,
    },
    subscribeButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 24,
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    subscribeButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    termsText: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.6)',
      textAlign: 'center',
      lineHeight: 16,
    },
    appleTerms: {
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.5)',
      textAlign: 'center',
      marginTop: 8,
      lineHeight: 14,
    },
  });

  const features = [
    'Unlimited streak access',
    'Advanced health analytics',
    'Premium workout plans',
    'Exclusive content & features',
    'Cancel anytime',
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={22} color="rgba(255, 255, 255, 0.9)" />
            </Pressable>
            
            <Ionicons 
              name="logo-apple" 
              size={40} 
              color="#FFFFFF" 
              style={styles.appleIcon}
            />
            <Text style={styles.title}>Mahi+ Premium</Text>
            <Text style={styles.subtitle}>Subscribe through Apple</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.pricingSection}>
              <Text style={styles.pricingTitle}>Special Offer</Text>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>£8.99</Text>
                <Text style={styles.discountedPrice}>£4.49</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>50% OFF</Text>
                </View>
              </View>
            </View>

            <View style={styles.featuresList}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color="#FFD700" 
                    style={styles.featureIcon}
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.subscribeButton} onPress={onSubscribe}>
              <Text style={styles.subscribeButtonText}>Subscribe with Apple</Text>
            </Pressable>

            <Text style={styles.termsText}>
              Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
            </Text>
            <Text style={styles.appleTerms}>
              Payment will be charged to your Apple ID account at confirmation of purchase. Manage your subscriptions in your Apple ID account settings.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AppleSubscriptionModal;

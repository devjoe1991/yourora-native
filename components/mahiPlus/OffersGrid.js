import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../store/theme-context';
import FeatureSquare from './FeatureSquare';
import AppleSubscriptionModal from './AppleSubscriptionModal';

const { width } = Dimensions.get('window');

const OffersGrid = () => {
  const { theme } = useTheme();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    lastRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
    },
  });
  
  const offers = [
    {
      title: "Gym Partnership",
      subtitle: "Exclusive gym discounts & access",
      icon: "🏋️",
      iconName: "fitness",
      color: "#FF6B6B", // Gym red
      showPremiumBadge: false,
    },
    {
      title: "Spotify Playlists",
      subtitle: "Join Spotify & build workout playlists",
      icon: "🎵",
      iconName: "musical-notes",
      color: "#1DB954", // Spotify green
      showPremiumBadge: false,
    },
    {
      title: "Competitions",
      subtitle: "Join and compete in local competitions",
      icon: "🏆",
      iconName: "trophy",
      color: "#FFD700", // Gold
      showPremiumBadge: false,
    },
    {
      title: "Mahi Merch",
      subtitle: "10% off to all Mahi+ members",
      icon: "👕",
      iconName: "shirt",
      color: "#A8E6CF", // Mint
      showPremiumBadge: false,
    },
  ];
  
          const handleOfferPress = (offer) => {
            // For premium offers, open subscription modal
            if (offer.showPremiumBadge) {
              setShowSubscriptionModal(true);
            }
          };

          return (
            <>
              <View style={styles.container}>
                <View style={styles.row}>
                  <FeatureSquare {...offers[0]} onPress={() => handleOfferPress(offers[0])} />
                  <FeatureSquare {...offers[1]} onPress={() => handleOfferPress(offers[1])} />
                </View>
                <View style={styles.lastRow}>
                  <FeatureSquare {...offers[2]} onPress={() => handleOfferPress(offers[2])} />
                  <FeatureSquare {...offers[3]} onPress={() => handleOfferPress(offers[3])} />
                </View>
              </View>
              
              <AppleSubscriptionModal
                visible={showSubscriptionModal}
                onClose={() => setShowSubscriptionModal(false)}
                onSubscribe={() => {
                  console.log('Subscribe with Apple pressed from offer');
                  setShowSubscriptionModal(false);
                }}
              />
            </>
          );
};

export default OffersGrid;

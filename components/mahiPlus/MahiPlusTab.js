import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../store/theme-context';
import PremiumBanner from './PremiumBanner';
import FeaturesGrid from './FeaturesGrid';
import OffersBanner from './OffersBanner';
import OffersGrid from './OffersGrid';

const MahiPlusTab = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    contentContainer: {
      paddingTop: 8,
      paddingBottom: 32,
    },
  });
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <PremiumBanner />
        <FeaturesGrid />
        <OffersBanner />
        <OffersGrid />
      </ScrollView>
    </View>
  );
};

export default MahiPlusTab;

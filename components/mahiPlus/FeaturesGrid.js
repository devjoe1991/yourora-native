import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';
import FeatureSquare from './FeatureSquare';

const { width } = Dimensions.get('window');

const FeaturesGrid = () => {
  const { theme } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      position: 'relative',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.textColor,
      marginBottom: 20,
      textAlign: 'center',
      letterSpacing: 0.8,
    },
    scrollContainer: {
      flexDirection: 'row',
    },
    featureContainer: {
      marginRight: 16,
    },
    arrowContainer: {
      position: 'absolute',
      top: '50%',
      transform: [{ translateY: -20 }],
      zIndex: 10,
    },
    leftArrow: {
      left: 8,
    },
    rightArrow: {
      right: 8,
    },
    arrowButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowIcon: {
      color: 'rgba(255, 255, 255, 0.6)',
    },
  });
  
  const features = [
    {
      title: "Streak Analytics",
      subtitle: "Deep insights into your fitness journey",
      icon: "📈",
      iconName: "trending-up",
      color: "#FFD700", // Gold
    },
    {
      title: "Health Data Sync",
      subtitle: "Apple Health, Strava, Fitbit integration",
      icon: "💓",
      iconName: "heart",
      color: "#FF6B6B", // Health red
    },
    {
      title: "Premium Insights",
      subtitle: "AI-powered fitness recommendations",
      icon: "🧠",
      iconName: "bulb",
      color: "#4ECDC4", // Teal
    },
    {
      title: "Exclusive Content",
      subtitle: "Premium workouts & nutrition plans",
      icon: "👑",
      iconName: "diamond",
      color: "#A8E6CF", // Mint
    },
  ];
  
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    setScrollPosition(scrollX);
  };

  const scrollToNext = () => {
    const nextPosition = scrollPosition + (width - 40);
    scrollViewRef.current?.scrollTo({ x: nextPosition, animated: true });
  };

  const scrollToPrevious = () => {
    const prevPosition = Math.max(0, scrollPosition - (width - 40));
    scrollViewRef.current?.scrollTo({ x: prevPosition, animated: true });
  };

  return (
            <View style={styles.container}>
              <View style={{ position: 'relative' }}>
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={width - 40}
          snapToAlignment="start"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {features.map((feature, index) => (
            <View key={index} style={styles.featureContainer}>
              <FeatureSquare {...feature} />
            </View>
          ))}
        </ScrollView>
        
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <TouchableOpacity 
            style={[styles.arrowContainer, styles.leftArrow]} 
            onPress={scrollToPrevious}
          >
            <View style={styles.arrowButton}>
              <Ionicons name="chevron-back" size={20} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        )}
        
        {/* Right Arrow */}
        {scrollPosition < (width - 40) * (features.length - 1) && (
          <TouchableOpacity 
            style={[styles.arrowContainer, styles.rightArrow]} 
            onPress={scrollToNext}
          >
            <View style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FeaturesGrid;

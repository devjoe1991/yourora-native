import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';

const { width } = Dimensions.get('window');

const HuelPartnership = () => {
  const { theme } = useTheme();
  const [currentPartnership, setCurrentPartnership] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    imageBackground: {
      width: '100%',
      height: 320,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
      padding: 20,
      alignItems: 'center',
      zIndex: 2,
      justifyContent: 'center',
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: 0.5,
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 12,
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    description: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 16,
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    benefitsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 16,
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 4,
    },
    benefitIcon: {
      marginRight: 6,
    },
    benefitText: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    ctaButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    ctaButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    cornerAccent: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: 6,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
      backgroundColor: '#FFFFFF',
      width: 16,
      height: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#FFD700',
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
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    arrowIcon: {
      color: '#FFFFFF',
    },
  });

  const partnerships = [
    {
      image: require('../../assets/bulk.jpg'),
      title: 'Join Bulk',
      subtitle: 'Premium supplements',
      description: 'High-quality supplements for serious athletes. Bulk offers the best value protein powders, vitamins, and fitness supplements.',
      benefits: ['Premium quality', 'Best value', 'Athlete tested'],
    },
    {
      image: require('../../assets/heul.jpg'),
      title: 'Join Huel',
      subtitle: 'The future of nutrition',
      description: 'Complete nutrition in minutes. Huel provides all the protein, carbs, essential fats, fiber, and 26 vitamins and minerals your body needs.',
      benefits: ['Complete nutrition', 'Ready in 2 minutes', 'Sustainable'],
    },
    {
      image: require('../../assets/frive.png'),
      title: 'Join Frive',
      subtitle: 'Food to thrive',
      description: 'Fresh, healthy meals delivered to your door. Frive offers nutritious, chef-prepared meals with Mediterranean, Asian, and plant-based options.',
      benefits: ['Chef-prepared meals', 'Fresh ingredients', 'Multiple cuisines'],
    },
  ];

  const currentData = partnerships[currentPartnership];

  const animateTransition = (newIndex) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextPartnership = () => {
    const newIndex = (currentPartnership + 1) % partnerships.length;
    setCurrentPartnership(newIndex);
    animateTransition(newIndex);
  };

  const prevPartnership = () => {
    const newIndex = (currentPartnership - 1 + partnerships.length) % partnerships.length;
    setCurrentPartnership(newIndex);
    animateTransition(newIndex);
  };

  const goToPartnership = (index) => {
    if (index !== currentPartnership) {
      setCurrentPartnership(index);
      animateTransition(index);
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ImageBackground
          source={currentData.image}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
          <Text style={styles.title}>{currentData.title}</Text>
          <Text style={styles.subtitle}>{currentData.subtitle}</Text>
          <Text style={styles.description}>{currentData.description}</Text>
          
          <View style={styles.benefitsContainer}>
            {currentData.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" style={styles.benefitIcon} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
        
        {/* Left Arrow */}
        <TouchableOpacity
          style={[styles.arrowContainer, styles.leftArrow]}
          onPress={prevPartnership}
        >
          <View style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={20} style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>

        {/* Right Arrow */}
        <TouchableOpacity
          style={[styles.arrowContainer, styles.rightArrow]}
          onPress={nextPartnership}
        >
          <View style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={20} style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>

          <View style={styles.dotContainer}>
            {partnerships.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentPartnership === index && styles.activeDot]}
                onPress={() => goToPartnership(index)}
              />
            ))}
          </View>
          
          <View style={styles.cornerAccent} />
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default HuelPartnership;

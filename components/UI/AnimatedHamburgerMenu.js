import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../store/theme-context';
import PressEffect from './PressEffect';

const AnimatedHamburgerMenu = ({ onPress, isOpen = false, size = 30 }) => {
  const { theme } = useTheme();
  
  // Animation values
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  
  // Line animation values
  const line1Rotation = useSharedValue(0);
  const line1TranslateY = useSharedValue(0);
  const line2Opacity = useSharedValue(1);
  const line3Rotation = useSharedValue(0);
  const line3TranslateY = useSharedValue(0);

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    glowContainer: {
      position: 'absolute',
      width: size + 10,
      height: size + 10,
      borderRadius: (size + 10) / 2,
      backgroundColor: theme.colors.blue,
      opacity: 0.3,
    },
    lineContainer: {
      width: size * 0.6,
      height: size * 0.4,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    line: {
      width: '100%',
      height: 2,
      backgroundColor: theme.colors.textColor,
      borderRadius: 1,
    },
  });

  // Animated styles for glow effect
  const glowAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  // Animated styles for line 1 (top line)
  const line1AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${line1Rotation.value}deg` },
        { translateY: line1TranslateY.value },
      ],
    };
  });

  // Animated styles for line 2 (middle line)
  const line2AnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: line2Opacity.value,
    };
  });

  // Animated styles for line 3 (bottom line)
  const line3AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${line3Rotation.value}deg` },
        { translateY: line3TranslateY.value },
      ],
    };
  });

  // Sync hamburger animation with sidebar state
  React.useEffect(() => {
    if (isOpen) {
      // Open animation (hamburger to X)
      line1Rotation.value = withSpring(45, { damping: 12, stiffness: 200 });
      line1TranslateY.value = withSpring(6, { damping: 12, stiffness: 200 });
      line2Opacity.value = withTiming(0, { duration: 200 });
      line3Rotation.value = withSpring(-45, { damping: 12, stiffness: 200 });
      line3TranslateY.value = withSpring(-6, { damping: 12, stiffness: 200 });
    } else {
      // Close animation (X to hamburger)
      line1Rotation.value = withSpring(0, { damping: 12, stiffness: 200 });
      line1TranslateY.value = withSpring(0, { damping: 12, stiffness: 200 });
      line2Opacity.value = withTiming(1, { duration: 200 });
      line3Rotation.value = withSpring(0, { damping: 12, stiffness: 200 });
      line3TranslateY.value = withSpring(0, { damping: 12, stiffness: 200 });
    }
  }, [isOpen]);

  const handlePress = () => {
    // Press animation
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
    glowOpacity.value = withTiming(1, { duration: 150 });
    
    // Reset press animation
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      glowOpacity.value = withTiming(0, { duration: 200 });
    }, 150);

    // Call the onPress callback
    if (onPress) {
      onPress();
    }
  };

  return (
    <PressEffect>
      <Pressable onPress={handlePress} style={styles.container}>
        {/* Glow effect */}
        <Animated.View style={[styles.glowContainer, glowAnimatedStyle]} />
        
        {/* Hamburger lines */}
        <View style={styles.lineContainer}>
          <Animated.View style={[styles.line, line1AnimatedStyle]} />
          <Animated.View style={[styles.line, line2AnimatedStyle]} />
          <Animated.View style={[styles.line, line3AnimatedStyle]} />
        </View>
      </Pressable>
    </PressEffect>
  );
};

export default AnimatedHamburgerMenu;

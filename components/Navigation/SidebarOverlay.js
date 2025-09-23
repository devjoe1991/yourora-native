import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../store/theme-context';
import { useSidebar } from '../../store/sidebar-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SidebarOverlay = () => {
  const { theme, isDarkMode } = useTheme();
  const { isOpen, closeSidebar } = useSidebar();
  
  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
    },
    pressable: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  // Animated styles
  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  // Handle overlay press to close sidebar
  const handleOverlayPress = () => {
    if (isOpen) {
      closeSidebar();
    }
  };

  // Animation effects
  React.useEffect(() => {
    if (isOpen) {
      // Show overlay with spring animation
      opacity.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
    } else {
      // Hide overlay with timing animation
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.95, { duration: 200 });
    }
  }, [isOpen]);

  // Don't render if sidebar is not open
  if (!isOpen) {
    return null;
  }

  return (
    <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
      <Pressable
        style={styles.pressable}
        onPress={handleOverlayPress}
        activeOpacity={1}
      />
    </Animated.View>
  );
};

export default SidebarOverlay;

import { withSpring, withTiming, Easing } from 'react-native-reanimated';

/**
 * Sidebar Animation Utilities
 * Provides consistent animation configurations for the sidebar navigation system
 */

// Spring physics configurations for natural, bouncy feel
export const SPRING_CONFIG = {
  // Gentle spring for sidebar slide animations
  gentle: {
    damping: 15,
    stiffness: 200,
    mass: 1,
  },
  
  // Bouncy spring for hamburger menu transformation
  bouncy: {
    damping: 12,
    stiffness: 300,
    mass: 0.8,
  },
  
  // Quick spring for press effects
  quick: {
    damping: 20,
    stiffness: 400,
    mass: 0.5,
  },
  
  // Smooth spring for overlay animations
  smooth: {
    damping: 18,
    stiffness: 150,
    mass: 1.2,
  },
};

// Timing configurations for different animation types
export const TIMING_CONFIG = {
  // Fast timing for quick interactions
  fast: {
    duration: 150,
    easing: Easing.out(Easing.quad),
  },
  
  // Medium timing for standard animations
  medium: {
    duration: 250,
    easing: Easing.out(Easing.cubic),
  },
  
  // Slow timing for complex animations
  slow: {
    duration: 350,
    easing: Easing.out(Easing.quart),
  },
  
  // Overlay fade timing
  overlay: {
    duration: 200,
    easing: Easing.out(Easing.quad),
  },
  
  // Hamburger transformation timing
  hamburger: {
    duration: 250,
    easing: Easing.out(Easing.back(1.2)),
  },
};

/**
 * Animation presets for common sidebar interactions
 */
export const SIDEBAR_ANIMATIONS = {
  // Sidebar slide-in animation
  slideIn: (translateX, sidebarWidth) => {
    return withSpring(0, SPRING_CONFIG.gentle);
  },
  
  // Sidebar slide-out animation
  slideOut: (translateX, sidebarWidth) => {
    return withTiming(-sidebarWidth, TIMING_CONFIG.medium);
  },
  
  // Overlay fade-in animation
  overlayFadeIn: (opacity) => {
    return withSpring(1, SPRING_CONFIG.smooth);
  },
  
  // Overlay fade-out animation
  overlayFadeOut: (opacity) => {
    return withTiming(0, TIMING_CONFIG.overlay);
  },
  
  // Hamburger menu open animation
  hamburgerOpen: (rotation, translateY) => {
    return withSpring(45, SPRING_CONFIG.bouncy);
  },
  
  // Hamburger menu close animation
  hamburgerClose: (rotation, translateY) => {
    return withSpring(0, SPRING_CONFIG.bouncy);
  },
  
  // Press effect animation
  pressEffect: (scale) => {
    return withSpring(0.9, SPRING_CONFIG.quick);
  },
  
  // Release effect animation
  releaseEffect: (scale) => {
    return withSpring(1, SPRING_CONFIG.quick);
  },
  
  // Glow effect animation
  glowIn: (opacity) => {
    return withTiming(1, TIMING_CONFIG.fast);
  },
  
  // Glow effect fade out
  glowOut: (opacity) => {
    return withTiming(0, TIMING_CONFIG.overlay);
  },
};

/**
 * Animation sequences for complex interactions
 */
export const ANIMATION_SEQUENCES = {
  // Complete sidebar open sequence
  openSidebar: (translateX, opacity, scale, sidebarWidth) => {
    'worklet';
    return {
      translateX: withSpring(0, SPRING_CONFIG.gentle),
      opacity: withSpring(1, SPRING_CONFIG.smooth),
      scale: withSpring(1, SPRING_CONFIG.smooth),
    };
  },
  
  // Complete sidebar close sequence
  closeSidebar: (translateX, opacity, scale, sidebarWidth) => {
    'worklet';
    return {
      translateX: withTiming(-sidebarWidth, TIMING_CONFIG.medium),
      opacity: withTiming(0, TIMING_CONFIG.overlay),
      scale: withTiming(0.95, TIMING_CONFIG.overlay),
    };
  },
  
  // Hamburger menu complete transformation
  transformHamburger: (line1Rotation, line1TranslateY, line2Opacity, line3Rotation, line3TranslateY, isOpen) => {
    'worklet';
    if (isOpen) {
      return {
        line1Rotation: withSpring(45, SPRING_CONFIG.bouncy),
        line1TranslateY: withSpring(6, SPRING_CONFIG.bouncy),
        line2Opacity: withTiming(0, TIMING_CONFIG.fast),
        line3Rotation: withSpring(-45, SPRING_CONFIG.bouncy),
        line3TranslateY: withSpring(-6, SPRING_CONFIG.bouncy),
      };
    } else {
      return {
        line1Rotation: withSpring(0, SPRING_CONFIG.bouncy),
        line1TranslateY: withSpring(0, SPRING_CONFIG.bouncy),
        line2Opacity: withTiming(1, TIMING_CONFIG.fast),
        line3Rotation: withSpring(0, SPRING_CONFIG.bouncy),
        line3TranslateY: withSpring(0, SPRING_CONFIG.bouncy),
      };
    }
  },
};

/**
 * Performance optimization utilities
 */
export const PERFORMANCE_UTILS = {
  // Check if device can handle complex animations
  shouldUseNativeDriver: true,
  
  // Reduce animation complexity on older devices
  reduceAnimations: false,
  
  // Animation cleanup utility
  cleanupAnimations: (animations) => {
    'worklet';
    animations.forEach(animation => {
      if (animation && typeof animation.cancel === 'function') {
        animation.cancel();
      }
    });
  },
  
  // Memory-efficient animation state management
  createAnimationState: () => {
    return {
      isAnimating: false,
      currentAnimation: null,
      animationQueue: [],
    };
  },
};

/**
 * Accessibility-friendly animation configurations
 */
export const ACCESSIBILITY_ANIMATIONS = {
  // Reduced motion for users with motion sensitivity
  reducedMotion: {
    duration: 100,
    easing: Easing.linear,
  },
  
  // High contrast mode animations
  highContrast: {
    duration: 200,
    easing: Easing.out(Easing.quad),
  },
  
  // Screen reader friendly animations
  screenReader: {
    duration: 0, // Instant for screen readers
    easing: Easing.linear,
  },
};

/**
 * Animation debugging utilities
 */
export const DEBUG_UTILS = {
  // Log animation performance
  logPerformance: (animationName, startTime, endTime) => {
    if (__DEV__) {
      const duration = endTime - startTime;
      console.log(`🎬 ${animationName}: ${duration.toFixed(2)}ms`);
    }
  },
  
  // Monitor animation frame rate
  monitorFrameRate: (callback) => {
    if (__DEV__) {
      let frameCount = 0;
      const startTime = Date.now();
      
      const countFrame = () => {
        frameCount++;
        requestAnimationFrame(countFrame);
      };
      
      countFrame();
      
      setTimeout(() => {
        const fps = frameCount / ((Date.now() - startTime) / 1000);
        console.log(`📊 Animation FPS: ${fps.toFixed(2)}`);
        callback(fps);
      }, 1000);
    }
  },
};

export default {
  SPRING_CONFIG,
  TIMING_CONFIG,
  SIDEBAR_ANIMATIONS,
  ANIMATION_SEQUENCES,
  PERFORMANCE_UTILS,
  ACCESSIBILITY_ANIMATIONS,
  DEBUG_UTILS,
};

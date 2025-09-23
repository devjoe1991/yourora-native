import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../store/theme-context';
import { useSidebar } from '../../store/sidebar-context';
import { useAuth } from '../../store/auth-context';
import SidebarItem from './SidebarItem';
import ThemeToggleSwitch from '../UI/ThemeToggleSwitch';
import PressEffect from '../UI/PressEffect';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

const Sidebar = ({ navigation }) => {
  const { theme } = useTheme();
  const { isOpen, closeSidebar } = useSidebar();
  const { userData } = useAuth();

  // Get user initials from fullName
  const getUserInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get display name (fullName or username as fallback)
  const getDisplayName = () => {
    return userData?.fullName || userData?.username || 'User';
  };

  const styles = StyleSheet.create({
    sidebar: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIDEBAR_WIDTH,
      height: '100%',
      backgroundColor: theme.colors.primary200,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      paddingTop: 60, // Account for status bar
      paddingHorizontal: 20,
      paddingBottom: 40,
      zIndex: 1001,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 5,
        height: 0,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10,
    },
    userProfile: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.primary300,
      borderRadius: 16,
      marginBottom: 30,
      marginTop: 20,
      zIndex: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatarText: {
      color: theme.colors.textColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textColor,
      marginBottom: 4,
    },
    userStatus: {
      fontSize: 14,
      color: theme.colors.mutedTextColor,
    },
    navigationContainer: {
      flex: 1,
    },
    navigationTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.mutedTextColor,
      marginBottom: 16,
      marginLeft: 4,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    footer: {
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.primary600,
      marginTop: 20,
    },
    footerTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.mutedTextColor,
      marginBottom: 16,
      marginLeft: 4,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    themeToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.primary300,
      borderRadius: 12,
    },
    themeToggleLabel: {
      fontSize: 16,
      color: theme.colors.textColor,
      fontWeight: '500',
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary500,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    closeButtonIcon: {
      color: theme.colors.textColor,
      fontWeight: 'bold',
    },
  });

  // Animation values
  const translateX = useSharedValue(-SIDEBAR_WIDTH);

  // Animated styles
  const animatedSidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Animation effects
  React.useEffect(() => {
    if (isOpen) {
      translateX.value = withSpring(0, {
        damping: 15,
        stiffness: 200,
      });
    } else {
      translateX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
    }
  }, [isOpen]);

  // Navigation items with specified colors
  const navigationItems = [
    {
      icon: 'home',
      title: 'Home',
      color: theme.colors.blue,
      screenName: 'HomeScreen',
    },
    {
      icon: 'compass',
      title: 'Explore',
      color: theme.colors.cyan,
      screenName: 'ExploreScreen',
    },
    {
      icon: 'play-circle',
      title: 'Reels',
      color: theme.colors.purple,
      screenName: 'ReelsScreen',
    },
    {
      icon: 'chatbubbles',
      title: 'Messages',
      color: theme.colors.green,
      badge: 3,
      screenName: 'MessagesScreen',
    },
    {
      icon: 'search',
      title: 'Search',
      color: theme.colors.orange,
      screenName: 'SearchScreen',
    },
    {
      icon: 'notifications',
      title: 'Notifications',
      color: theme.colors.magenta,
      badge: 6,
      screenName: 'NotificationsScreen',
    },
    {
      icon: 'person',
      title: 'Profile',
      color: theme.colors.pink,
      screenName: 'UserProfileScreen',
    },
  ];

  // Don't render if sidebar is not open
  if (!isOpen) {
    return null;
  }

  return (
    <Animated.View style={[styles.sidebar, animatedSidebarStyle]}>
      {/* User Profile Section */}
      <PressEffect>
        <Pressable 
          style={styles.userProfile} 
          onPress={() => {
            closeSidebar();
            setTimeout(() => {
              navigation.navigate('UserProfileScreen');
            }, 100);
          }}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getUserInitials(userData?.fullName)}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{getDisplayName()}</Text>
            <Text style={styles.userStatus}>Active now</Text>
          </View>
          {/* Close Button - Inside Profile Section */}
          <PressEffect>
            <Pressable 
              style={styles.closeButton} 
              onPress={(e) => {
                e.stopPropagation();
                closeSidebar();
              }}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={theme.colors.textColor}
              />
            </Pressable>
          </PressEffect>
        </Pressable>
      </PressEffect>

      {/* Navigation Items */}
      <View style={styles.navigationContainer}>
        <Text style={styles.navigationTitle}>Navigation</Text>
        {navigationItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            title={item.title}
            color={item.color}
            badge={item.badge}
            navigation={navigation}
            screenName={item.screenName}
          />
        ))}
      </View>

      {/* Footer with Theme Toggle */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Settings</Text>
        <View style={styles.themeToggleContainer}>
          <Text style={styles.themeToggleLabel}>Theme</Text>
          <ThemeToggleSwitch size={20} />
        </View>
      </View>
    </Animated.View>
  );
};

export default Sidebar;

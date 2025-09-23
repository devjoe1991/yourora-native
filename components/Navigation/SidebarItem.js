import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';
import { useSidebar } from '../../store/sidebar-context';
import PressEffect from '../UI/PressEffect';

const SidebarItem = ({ 
  icon, 
  title, 
  color, 
  badge, 
  onPress, 
  navigation,
  screenName 
}) => {
  const { theme } = useTheme();
  const { closeSidebar } = useSidebar();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginVertical: 4,
      borderRadius: 12,
      backgroundColor: 'transparent',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${color}20`, // 20% opacity of the color
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    icon: {
      color: color,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.textColor,
    },
    badge: {
      backgroundColor: theme.colors.red,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
      marginLeft: 8,
    },
    badgeText: {
      color: theme.colors.textColor,
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  const handlePress = () => {
    // Close sidebar first
    closeSidebar();
    
    // Navigate after a short delay to allow sidebar to close
    setTimeout(() => {
      if (onPress) {
        onPress();
      } else if (navigation && screenName) {
        navigation.navigate(screenName);
      }
    }, 100);
  };

  return (
    <PressEffect>
      <Pressable onPress={handlePress} style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={color}
            style={styles.icon}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </PressEffect>
  );
};

export default SidebarItem;

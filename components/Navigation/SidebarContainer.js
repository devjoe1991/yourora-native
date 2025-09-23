import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSidebar } from '../../store/sidebar-context';
import Sidebar from './Sidebar';
import SidebarOverlay from './SidebarOverlay';

const SidebarContainer = ({ children }) => {
  const { isOpen } = useSidebar();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      {/* Main app content */}
      <View style={styles.content}>
        {children}
      </View>
      
      {/* Sidebar and overlay - only render when open */}
      {isOpen && (
        <>
          <SidebarOverlay />
          <Sidebar navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default SidebarContainer;

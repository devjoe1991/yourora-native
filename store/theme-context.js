import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../constants/themes';

const ThemeContext = createContext({
  isDarkMode: true,
  theme: darkTheme,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  // Load saved theme preference on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme_preference');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme preference:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadTheme();
  }, []);
  
  // Save theme preference when it changes
  useEffect(() => {
    if (isLoaded) {
      const saveTheme = async () => {
        try {
          await AsyncStorage.setItem('theme_preference', isDarkMode ? 'dark' : 'light');
        } catch (error) {
          console.log('Error saving theme preference:', error);
        }
      };
      
      saveTheme();
    }
  }, [isDarkMode, isLoaded]);
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const setTheme = (darkMode) => {
    setIsDarkMode(darkMode);
  };
  
  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return null;
  }
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
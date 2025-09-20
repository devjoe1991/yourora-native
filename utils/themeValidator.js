// Theme Validation Utility
// This ensures both themes have the same color properties for consistency

import { darkTheme, lightTheme } from '../constants/themes';

/**
 * Validates that both themes have the same color properties
 * This prevents missing colors when adding new ones
 */
export const validateThemes = () => {
  const darkColors = Object.keys(darkTheme.colors);
  const lightColors = Object.keys(lightTheme.colors);
  
  const missingInLight = darkColors.filter(color => !lightColors.includes(color));
  const missingInDark = lightColors.filter(color => !darkColors.includes(color));
  
  if (missingInLight.length > 0) {
    console.warn('⚠️ Missing colors in light theme:', missingInLight);
  }
  
  if (missingInDark.length > 0) {
    console.warn('⚠️ Missing colors in dark theme:', missingInDark);
  }
  
  if (missingInLight.length === 0 && missingInDark.length === 0) {
    console.log('✅ Theme validation passed - both themes have matching color properties');
  }
  
  return {
    isValid: missingInLight.length === 0 && missingInDark.length === 0,
    missingInLight,
    missingInDark
  };
};

/**
 * Helper function to add a new color to both themes
 * Usage: addColorToThemes('newColor', '#FF0000', '#0000FF')
 */
export const addColorToThemes = (colorName, darkValue, lightValue) => {
  console.log(`Adding color '${colorName}' to both themes...`);
  
  // This would need to be done manually in themes.js
  console.log(`Add to darkTheme.colors: ${colorName}: "${darkValue}"`);
  console.log(`Add to lightTheme.colors: ${colorName}: "${lightValue}"`);
  
  // Validate after adding
  validateThemes();
};

/**
 * Get all available colors for reference
 */
export const getAllColors = () => {
  return Object.keys(darkTheme.colors);
};

/**
 * Check if a color exists in the current theme
 */
export const colorExists = (colorName) => {
  return darkTheme.colors.hasOwnProperty(colorName) && lightTheme.colors.hasOwnProperty(colorName);
};

import React, { createContext, useContext, useState, useCallback } from 'react';

const SidebarContext = createContext({
  isOpen: false,
  isAnimating: false,
  toggleSidebar: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  setAnimating: () => {},
});

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openSidebar = useCallback(() => {
    if (!isOpen && !isAnimating) {
      setIsAnimating(true);
      setIsOpen(true);
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [isOpen, isAnimating]);

  const closeSidebar = useCallback(() => {
    if (isOpen && !isAnimating) {
      setIsAnimating(true);
      setIsOpen(false);
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [isOpen, isAnimating]);

  const toggleSidebar = useCallback(() => {
    if (isAnimating) return; // Prevent rapid toggling during animation
    
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }, [isOpen, isAnimating, openSidebar, closeSidebar]);

  const setAnimating = useCallback((animating) => {
    setIsAnimating(animating);
  }, []);

  const value = {
    isOpen,
    isAnimating,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setAnimating,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

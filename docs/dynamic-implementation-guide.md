# 🔄 Dynamic Implementation Guide

## 📋 **Overview**
This guide provides a comprehensive framework for implementing dynamic components in Miha that will seamlessly integrate with your backend when it's ready. All components should be built with dynamic data in mind from the start.

---

## 🎯 **Core Principles**

### **1. Always Use Context, Never Hardcode**
```javascript
// ❌ BAD - Hardcoded values
const userName = "Joe J";
const userInitials = "JJ";

// ✅ GOOD - Dynamic from context
const { userData } = useAuth();
const userName = userData?.fullName || userData?.username || "User";
const userInitials = getUserInitials(userData?.fullName);
```

### **2. Build for Backend Integration**
```javascript
// ✅ GOOD - Backend ready structure
const { userData, isLoading, error } = useAuth();

// Will automatically work when backend is connected
if (isLoading) return <Loader />;
if (error) return <ErrorComponent />;
```

### **3. Graceful Fallbacks**
```javascript
// ✅ GOOD - Always have fallbacks
const displayName = userData?.fullName || userData?.username || "User";
const avatarUrl = userData?.picturePath || defaultAvatar;
```

---

## 🏗️ **Implementation Framework**

### **Step 1: Context Integration**
```javascript
import { useAuth } from '../../store/auth-context';
import { useTheme } from '../../store/theme-context';

const MyComponent = () => {
  const { userData, isLoading, error } = useAuth();
  const { theme, isDarkMode } = useTheme();
  
  // Component logic here
};
```

### **Step 2: Dynamic Data Extraction**
```javascript
// Helper functions for consistent data handling
const getUserDisplayName = (userData) => {
  return userData?.fullName || userData?.username || "User";
};

const getUserInitials = (fullName) => {
  if (!fullName) return "U";
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarUrl = (userData) => {
  return userData?.picturePath || require('../../assets/default-avatar.png');
};
```

### **Step 3: Loading States**
```javascript
const MyComponent = () => {
  const { userData, isLoading } = useAuth();
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <View>
      <Text>{getUserDisplayName(userData)}</Text>
    </View>
  );
};
```

### **Step 4: Error Handling**
```javascript
const MyComponent = () => {
  const { userData, error } = useAuth();
  
  if (error) {
    return <ErrorOverlay message="Failed to load user data" />;
  }
  
  return (
    <View>
      <Text>{getUserDisplayName(userData)}</Text>
    </View>
  );
};
```

---

## 🔧 **Dynamic Component Checklist**

### **✅ Pre-Implementation Checklist**
- [ ] **Context Integration**: Component uses `useAuth()` and `useTheme()`
- [ ] **No Hardcoded Values**: All user data comes from context
- [ ] **Loading States**: Handles `isLoading` from auth context
- [ ] **Error Handling**: Handles `error` from auth context
- [ ] **Fallback Values**: Has default values for missing data
- [ ] **Theme Integration**: Uses theme colors and styles
- [ ] **Navigation Ready**: Uses `useNavigation()` for routing

### **✅ Implementation Checklist**
- [ ] **Dynamic User Data**: Name, initials, avatar from `userData`
- [ ] **Real-time Updates**: Component updates when context changes
- [ ] **Performance Optimized**: No unnecessary re-renders
- [ ] **Accessibility**: Screen reader support and proper focus
- [ ] **Responsive Design**: Works on different screen sizes
- [ ] **Animation Ready**: Smooth transitions and interactions

### **✅ Backend Integration Checklist**
- [ ] **API Ready**: Component will work with real API data
- [ ] **Data Validation**: Handles different data formats
- [ ] **Network States**: Handles online/offline scenarios
- [ ] **Caching Strategy**: Implements proper data caching
- [ ] **Error Recovery**: Handles network errors gracefully

---

## 📱 **Component Templates**

### **Template 1: User Profile Component**
```javascript
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useAuth } from '../../store/auth-context';
import { useTheme } from '../../store/theme-context';
import { useNavigation } from '@react-navigation/native';
import { PressEffect } from '../UI/PressEffect';

const UserProfileComponent = () => {
  const { userData, isLoading, error } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigation();
  
  // Helper functions
  const getUserDisplayName = () => {
    return userData?.fullName || userData?.username || "User";
  };
  
  const getUserInitials = () => {
    const fullName = userData?.fullName;
    if (!fullName) return "U";
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const getAvatarUrl = () => {
    return userData?.picturePath || require('../../assets/default-avatar.png');
  };
  
  // Loading state
  if (isLoading) {
    return <Loader />;
  }
  
  // Error state
  if (error) {
    return <ErrorOverlay message="Failed to load profile" />;
  }
  
  return (
    <PressEffect>
      <Pressable 
        style={[styles.profileContainer, { backgroundColor: theme.colors.primary200 }]}
        onPress={() => navigation.navigate('UserProfileScreen')}
      >
        <View style={styles.avatar}>
          {userData?.picturePath ? (
            <Image source={{ uri: userData.picturePath }} style={styles.avatarImage} />
          ) : (
            <Text style={[styles.avatarText, { color: theme.colors.textColor }]}>
              {getUserInitials()}
            </Text>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.textColor }]}>
            {getUserDisplayName()}
          </Text>
          <Text style={[styles.userStatus, { color: theme.colors.textColorSecondary }]}>
            Active now
          </Text>
        </View>
      </Pressable>
    </PressEffect>
  );
};

const styles = StyleSheet.create((theme) => ({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary500,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userStatus: {
    fontSize: 14,
    marginTop: 2,
  },
}));

export default UserProfileComponent;
```

### **Template 2: Dynamic List Component**
```javascript
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useAuth } from '../../store/auth-context';
import { useTheme } from '../../store/theme-context';

const DynamicListComponent = () => {
  const { userData, isLoading, error } = useAuth();
  const { theme } = useTheme();
  
  // Dynamic data from context
  const listData = userData?.posts || userData?.notifications || [];
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <ErrorOverlay message="Failed to load data" />;
  }
  
  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: theme.colors.primary200 }]}>
      <Text style={[styles.itemText, { color: theme.colors.textColor }]}>
        {item.title || item.name || "Item"}
      </Text>
    </View>
  );
  
  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || index.toString()}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    />
  );
};
```

---

## 🔍 **Dynamic Validation Checklist**

### **Before Backend Integration**
```javascript
// ✅ Check these before connecting backend
const validateDynamicImplementation = () => {
  // 1. No hardcoded user data
  const hasHardcodedData = component.includes('"Joe J"') || component.includes('"JJ"');
  
  // 2. Uses auth context
  const usesAuthContext = component.includes('useAuth()');
  
  // 3. Has loading states
  const hasLoadingStates = component.includes('isLoading');
  
  // 4. Has error handling
  const hasErrorHandling = component.includes('error');
  
  // 5. Uses theme context
  const usesThemeContext = component.includes('useTheme()');
  
  return {
    isDynamic: !hasHardcodedData && usesAuthContext,
    hasLoadingStates,
    hasErrorHandling,
    usesThemeContext,
    isBackendReady: hasLoadingStates && hasErrorHandling
  };
};
```

### **Backend Integration Test**
```javascript
// Test component with mock backend data
const testBackendIntegration = () => {
  const mockUserData = {
    fullName: "John Doe",
    username: "johndoe",
    picturePath: "https://example.com/avatar.jpg",
    posts: [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" }
    ]
  };
  
  // Component should work with this data
  // No hardcoded values should break
  // All dynamic features should work
};
```

---

## 🚀 **Backend Integration Strategy**

### **Phase 1: Context Updates**
```javascript
// Update auth-context.js when backend is ready
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Backend API calls
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await api.getUserData();
      setUserData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // All components will automatically update
  // No changes needed to individual components
};
```

### **Phase 2: API Integration**
```javascript
// Add API service layer
const api = {
  getUserData: () => fetch('/api/user'),
  updateUserData: (data) => fetch('/api/user', { method: 'PUT', body: JSON.stringify(data) }),
  // ... other API calls
};
```

### **Phase 3: Real-time Updates**
```javascript
// Add real-time updates when backend supports it
useEffect(() => {
  const socket = io('your-backend-url');
  socket.on('userDataUpdate', (newData) => {
    setUserData(newData);
  });
  
  return () => socket.disconnect();
}, []);
```

---

## 📊 **Dynamic Implementation Metrics**

### **Success Criteria**
- [ ] **Zero Hardcoded Values**: No hardcoded user data in components
- [ ] **Context Integration**: All components use `useAuth()` and `useTheme()`
- [ ] **Loading States**: Proper loading indicators
- [ ] **Error Handling**: Graceful error recovery
- [ ] **Backend Ready**: Components work with API data
- [ ] **Performance**: No unnecessary re-renders
- [ ] **Accessibility**: Screen reader support
- [ ] **Responsive**: Works on all screen sizes

### **Quality Assurance**
```javascript
// Run this check on all components
const qualityCheck = (component) => {
  const checks = {
    usesAuthContext: component.includes('useAuth()'),
    usesThemeContext: component.includes('useTheme()'),
    hasLoadingStates: component.includes('isLoading'),
    hasErrorHandling: component.includes('error'),
    noHardcodedData: !component.includes('"Joe J"') && !component.includes('"JJ"'),
    hasFallbacks: component.includes('||') && component.includes('?'),
    isBackendReady: component.includes('userData?.') && component.includes('isLoading')
  };
  
  return {
    score: Object.values(checks).filter(Boolean).length / Object.keys(checks).length,
    isDynamic: checks.usesAuthContext && checks.noHardcodedData,
    isBackendReady: checks.isBackendReady && checks.hasErrorHandling
  };
};
```

---

## 🎯 **Best Practices Summary**

### **DO's**
- ✅ Always use `useAuth()` and `useTheme()`
- ✅ Implement loading and error states
- ✅ Use fallback values for missing data
- ✅ Build components that work with mock data
- ✅ Test with different user data scenarios
- ✅ Use helper functions for data extraction
- ✅ Implement proper TypeScript types

### **DON'Ts**
- ❌ Never hardcode user data
- ❌ Don't assume data will always be available
- ❌ Don't skip loading and error states
- ❌ Don't use hardcoded colors or themes
- ❌ Don't build components that break with different data
- ❌ Don't forget accessibility features

---

## 🔄 **Migration Guide**

### **Converting Hardcoded Components**
1. **Identify hardcoded values** in existing components
2. **Add context imports** (`useAuth`, `useTheme`)
3. **Replace hardcoded data** with dynamic values
4. **Add loading states** for better UX
5. **Add error handling** for robustness
6. **Test with different data** scenarios
7. **Validate backend readiness** with mock data

### **Example Migration**
```javascript
// BEFORE - Hardcoded
const ProfileCard = () => (
  <View>
    <Text>Joe J</Text>
    <Text>JJ</Text>
  </View>
);

// AFTER - Dynamic
const ProfileCard = () => {
  const { userData, isLoading } = useAuth();
  
  if (isLoading) return <Loader />;
  
  return (
    <View>
      <Text>{userData?.fullName || userData?.username || "User"}</Text>
      <Text>{getUserInitials(userData?.fullName)}</Text>
    </View>
  );
};
```

---

## 📝 **Documentation Template**

### **For Each New Component**
```markdown
## Component Name

### Dynamic Features
- **User Data**: Reads from `useAuth()` context
- **Theme Integration**: Uses `useTheme()` for styling
- **Loading States**: Handles `isLoading` from auth context
- **Error Handling**: Displays errors gracefully
- **Backend Ready**: Works with API data when available

### Implementation
- Uses `userData?.fullName` for display name
- Falls back to `userData?.username` if fullName unavailable
- Generates initials dynamically from fullName
- Handles missing avatar with default image
- Updates automatically when user data changes

### Backend Integration
- Will work seamlessly when backend is connected
- No code changes needed for API integration
- Supports real-time updates when available
- Handles network errors gracefully
```

---

This guide ensures all future components are built with dynamic data in mind and will seamlessly integrate with your backend when it's ready! 🚀

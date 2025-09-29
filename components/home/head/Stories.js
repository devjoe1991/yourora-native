import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  FlatList,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import React, { useRef, useState } from "react";
import { USERS } from "../../../data/users";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/Styles";
import { useTheme } from "../../../store/theme-context";
import ImageStory from "../../story/ImageStory";
import { Ionicons } from "@expo/vector-icons";
import PressEffect from "../../UI/PressEffect";
// https://github.com/birdwingo/react-native-instagram-stories?tab=readme-ov-file

// Streak Counter Data - Progressive unlock system based on daily goals
const streakFeeds = [
  {
    id: 0,
    type: "add_story",
    streak_days: 0,
    streak_level: 0,
    title: "Add Story",
    description: "Share your fitness journey",
    active: false,
    isCurrentUser: true,
    feedType: "creation",
    icon: "add-circle",
    isUnlocked: true,
    isLocked: false,
  },
  {
    id: 1,
    type: "streak_1",
    streak_days: 1,
    streak_level: 1,
    title: "Streak 1",
    description: "1 day streak - Complete your daily goal!",
    active: true,
    isCurrentUser: true,
    feedType: "streak1",
    icon: "fitness",
    isUnlocked: true,
    isLocked: false,
    currentStreak: true,
  },
  {
    id: 2,
    type: "streak_2",
    streak_days: 2,
    streak_level: 2,
    title: "Streak 2",
    description: "2 day streak - Locked until you complete today's goal",
    active: false,
    isCurrentUser: false,
    feedType: "streak2",
    icon: "nutrition",
    isUnlocked: false,
    isLocked: true,
    currentStreak: false,
  },
  {
    id: 3,
    type: "streak_3",
    streak_days: 3,
    streak_level: 3,
    title: "Streak 3",
    description: "3 day streak - Locked until you complete today's goal",
    active: false,
    isCurrentUser: false,
    feedType: "streak3",
    icon: "water",
    isUnlocked: false,
    isLocked: true,
    currentStreak: false,
  },
  {
    id: 4,
    type: "streak_4",
    streak_days: 4,
    streak_level: 4,
    title: "Streak 4",
    description: "4 day streak - Locked until you complete today's goal",
    active: false,
    isCurrentUser: false,
    feedType: "streak4",
    icon: "moon",
    isUnlocked: false,
    isLocked: true,
    currentStreak: false,
  },
  {
    id: 5,
    type: "streak_5",
    streak_days: 5,
    streak_level: 5,
    title: "Streak 5",
    description: "5 day streak - Locked until you complete today's goal",
    active: false,
    isCurrentUser: false,
    feedType: "streak5",
    icon: "leaf",
    isUnlocked: false,
    isLocked: true,
    currentStreak: false,
  },
  {
    id: 6,
    type: "streak_6",
    streak_days: 6,
    streak_level: 6,
    title: "Streak 6",
    description: "6 day streak - Locked until you complete today's goal",
    active: false,
    isCurrentUser: false,
    feedType: "streak6",
    icon: "heart",
    isUnlocked: false,
    isLocked: true,
    currentStreak: false,
  },
];
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ITEM_SIZE = SCREEN_WIDTH / 5;
const TRANSLATE_VALUE = ITEM_SIZE / 2;
export const CONTAINER_HEIGHT = ITEM_SIZE + TRANSLATE_VALUE + 10;

// Streak level color function - Enhanced for different feed types and locked states
const getStreakLevelColor = (level, feedType, isLocked = false, streakDays = 0) => {
  // Locked streak colors (muted/grayed out)
  if (isLocked) {
    return '#555555'; // Dark gray for locked streaks
  }

  // Check if this is a milestone streak (10, 20, 30, etc.)
  const isMilestone = streakDays > 0 && streakDays % 10 === 0;
  
  // Milestone streaks get red color
  if (isMilestone) {
    return '#FF6B6B'; // Red for milestone streaks (10, 20, 30, etc.)
  }

  // Base colors by level
  const levelColors = {
    0: '#333333',      // Add Story - Dark
    1: '#45B7D1',      // Newcomer - Blue
    2: '#4ECDC4',      // Rising - Teal  
    3: '#96CEB4',      // Committed - Green
    4: '#FFEAA7',      // Dedicated - Yellow
    5: '#DDA0DD',      // Elite - Purple
    6: '#FFD700',      // Legendary - Gold
    7: '#FF6B6B',      // Master - Red
  };

  // Feed type specific color variations - Blue ORA theme
  const feedTypeModifiers = {
    streak1: '#00BFA5',      // Blue ORA for streak 1
    streak2: '#4ECDC4',      // Teal for streak 2
    streak3: '#45B7D1',      // Blue for streak 3
    streak4: '#6C5CE7',      // Purple for streak 4
    streak5: '#00B894',      // Green for streak 5
    streak6: '#E17055',      // Orange for streak 6
    creation: '#333333',     // Dark for creation
  };

  return feedTypeModifiers[feedType] || levelColors[level] || '#333333';
};

// Get progression emoji based on streak days
const getProgressionEmoji = (streakDays) => {
  if (streakDays === 0) return "🎯"; // Starting point
  if (streakDays === 1) return "🔥"; // First day - fire
  if (streakDays === 2) return "💪"; // Second day - muscle
  if (streakDays === 3) return "⚡"; // Third day - lightning
  if (streakDays === 4) return "🚀"; // Fourth day - rocket
  if (streakDays === 5) return "⭐"; // Fifth day - star
  if (streakDays === 6) return "🌟"; // Sixth day - glowing star
  if (streakDays === 7) return "👑"; // One week - crown
  if (streakDays === 8) return "💎"; // Eighth day - diamond
  if (streakDays === 9) return "🏆"; // Ninth day - trophy
  if (streakDays === 10) return "🎉"; // 10 days - celebration
  if (streakDays === 11) return "🔥"; // Back to fire
  if (streakDays === 12) return "💪"; // Muscle
  if (streakDays === 13) return "⚡"; // Lightning
  if (streakDays === 14) return "🚀"; // Rocket
  if (streakDays === 15) return "⭐"; // Star
  if (streakDays === 16) return "🌟"; // Glowing star
  if (streakDays === 17) return "👑"; // Crown
  if (streakDays === 18) return "💎"; // Diamond
  if (streakDays === 19) return "🏆"; // Trophy
  if (streakDays === 20) return "🎊"; // 20 days - confetti
  if (streakDays === 21) return "🔥"; // Back to fire
  if (streakDays === 22) return "💪"; // Muscle
  if (streakDays === 23) return "⚡"; // Lightning
  if (streakDays === 24) return "🚀"; // Rocket
  if (streakDays === 25) return "⭐"; // Star
  if (streakDays === 26) return "🌟"; // Glowing star
  if (streakDays === 27) return "👑"; // Crown
  if (streakDays === 28) return "💎"; // Diamond
  if (streakDays === 29) return "🏆"; // Trophy
  if (streakDays === 30) return "🎆"; // 30 days - fireworks
  if (streakDays >= 31) return "🏅"; // 31+ days - medal
  
  // Fallback for any other numbers
  return "🔥";
};

// Get streak feed title based on type
const getStreakFeedTitle = (feedType, streakDays) => {
  const titles = {
    streak1: `Streak 1`,
    streak2: `Streak 2`,
    streak3: `Streak 3`,
    streak4: `Streak 4`,
    streak5: `Streak 5`,
    streak6: `Streak 6`,
    creation: `Create Story`,
  };
  return titles[feedType] || 'Streak Feed';
};

const Stories = ({ followingsData }) => {
  const { theme } = useTheme();
  const storiesRef = useRef(null);
  const [showStory, setShowStory] = useState(false);
  const [selectedStreakFeed, setSelectedStreakFeed] = useState(null);
  const ScrollX = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    story: {
      width: 70,
      height: 70,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: theme.colors.cyan,
    },
  });

  // Pan responder for swipe down to close modal
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          modalTranslateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          // Swipe down threshold - close modal
          Animated.timing(modalTranslateY, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setSelectedStreakFeed(null);
            modalTranslateY.setValue(0);
          });
        } else {
          // Snap back to original position
          Animated.spring(modalTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Handle streak feed selection
  const handleStreakFeedPress = (streakFeed) => {
    if (streakFeed.type === "add_story") {
      navigation.navigate("AddStoryScreen");
    } else if (streakFeed.isLocked) {
      // Show locked streak message
      setSelectedStreakFeed({
        ...streakFeed,
        isLockedMessage: true,
      });
      console.log(`Streak ${streakFeed.streak_level} is locked - complete today's goal to unlock!`);
    } else {
      setSelectedStreakFeed(streakFeed);
      console.log(`Opening ${streakFeed.feedType} feed with ${streakFeed.streak_days} day streak`);
      // Here you would navigate to the specific streak feed
      // navigation.navigate("StreakFeed", { 
      //   feedType: streakFeed.feedType,
      //   streakDays: streakFeed.streak_days,
      //   streakLevel: streakFeed.streak_level
      // });
    }
  };

  return (
    <View>
      <Animated.FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={streakFeeds}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: CONTAINER_HEIGHT + 20,
          paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_SIZE / 2,
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={"fast"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_SIZE
          );
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
            (index + 2) * ITEM_SIZE,
          ];
          const scale = ScrollX.interpolate({
            inputRange,
            outputRange: [0.8, 0.8, 1, 0.8, 0.8],
          });
          const translateY = ScrollX.interpolate({
            inputRange,
            outputRange: [
              0,
              TRANSLATE_VALUE / 2,
              TRANSLATE_VALUE,
              TRANSLATE_VALUE / 2,
              0,
            ],
          });
          return (
            <PressEffect>
              <Pressable
                onPress={() => handleStreakFeedPress(item)}
              >
                <Animated.View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ translateY }, { scale }],
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    marginVertical: 5,
                  }}
                >
                  {/* Streak Counter Circle */}
                  <View
                    style={[
                      {
                        width: "100%",
                        height: "100%",
                        borderRadius: 60,
                        backgroundColor: getStreakLevelColor(item.streak_level, item.feedType, item.isLocked, item.streak_days),
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: item.isCurrentUser ? 3 : 2,
                        borderColor: item.isCurrentUser ? '#00BFA5' : getStreakLevelColor(item.streak_level, item.feedType, item.isLocked, item.streak_days),
                        shadowColor: getStreakLevelColor(item.streak_level, item.feedType, item.isLocked, item.streak_days),
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: item.isLocked ? 0.1 : 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                        opacity: item.isLocked ? 0.6 : 1,
                      },
                    ]}
                  >
                    {item.type === "add_story" ? (
                      // Add Story button
                      <Ionicons
                        name={item.icon}
                        size={30}
                        color={theme.colors.textColor}
                      />
                    ) : item.isLocked ? (
                      // Locked streak - show padlock
                      <View style={{ alignItems: "center" }}>
                        <Ionicons
                          name="lock-closed"
                          size={25}
                          color={theme.colors.textColor}
                          style={{ marginBottom: 2 }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: theme.colors.textColor,
                            textAlign: "center",
                          }}
                        >
                          LOCKED
                        </Text>
                      </View>
                    ) : (
                      // Unlocked streak counter with just number
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          color: theme.colors.textColor,
                          textAlign: "center",
                        }}
                      >
                        {item.streak_days}
                      </Text>
                    )}
                    
                    {/* Progression emoji indicator for current user streaks */}
                    {item.active && !item.isLocked && (
                      <View
                        style={{
                          position: "absolute",
                          right: 3,
                          bottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {getProgressionEmoji(item.streak_days)}
                        </Text>
                      </View>
                    )}

                    {/* Streak level indicator */}
                    {item.streak_level > 0 && !item.isLocked && (
                      <View
                        style={{
                          position: "absolute",
                          top: 3,
                          right: 3,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          borderRadius: 10,
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: getStreakLevelColor(item.streak_level, item.feedType, item.isLocked, item.streak_days),
                          }}
                        >
                          {item.streak_level}
                        </Text>
                      </View>
                    )}

                    {/* Lock indicator for locked streaks */}
                    {item.isLocked && (
                      <View
                        style={{
                          position: "absolute",
                          top: 3,
                          right: 3,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          borderRadius: 10,
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Ionicons
                          name="lock-closed"
                          size={12}
                          color={theme.colors.textColor}
                        />
                      </View>
                    )}
                  </View>

                  {/* Streak feed title below circle */}
                  <Text
                    style={{
                      fontSize: 10,
                      color: theme.colors.textColor,
                      textAlign: "center",
                      marginTop: 5,
                      fontWeight: "600",
                    }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </Animated.View>
              </Pressable>
            </PressEffect>
          );
        }}
      />

      {/* Streak Feed Selection Modal */}
      {selectedStreakFeed && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedStreakFeed}
          statusBarTranslucent={true}
          onRequestClose={() => {
            setSelectedStreakFeed(null);
          }}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backdropFilter: 'blur(10px)',
          }}>
            <Animated.View 
              style={[{
                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                borderRadius: 28,
                padding: 32,
                alignItems: 'center',
                width: '90%',
                transform: [{ translateY: modalTranslateY }],
                borderWidth: 1,
                borderColor: 'rgba(255, 215, 0, 0.3)',
                shadowColor: '#FFD700',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 20,
              }]}
              {...panResponder.panHandlers}
            >
              {/* X Close Button */}
              <Pressable
                onPress={() => setSelectedStreakFeed(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Ionicons name="close" size={22} color="rgba(255, 255, 255, 0.9)" />
              </Pressable>
              <View style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                backgroundColor: getStreakLevelColor(selectedStreakFeed.streak_level, selectedStreakFeed.feedType, selectedStreakFeed.isLocked, selectedStreakFeed.streak_days),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 24,
                opacity: selectedStreakFeed.isLocked ? 0.6 : 1,
                borderWidth: 3,
                borderColor: selectedStreakFeed.isLocked ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 215, 0, 0.6)',
                shadowColor: selectedStreakFeed.isLocked ? '#FFD700' : '#00BFA5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 8,
              }}>
                {selectedStreakFeed.isLocked ? (
                  <Ionicons
                    name="lock-closed"
                    size={44}
                    color="rgba(255, 255, 255, 0.9)"
                  />
                ) : (
                  <Ionicons
                    name={selectedStreakFeed.icon}
                    size={44}
                    color="rgba(255, 255, 255, 0.9)"
                  />
                )}
              </View>
              
              <Text style={{
                fontSize: 26,
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: 12,
                textAlign: 'center',
                letterSpacing: 0.5,
              }}>
                {selectedStreakFeed.isLocked ? `${selectedStreakFeed.title} - LOCKED` : getStreakFeedTitle(selectedStreakFeed.feedType, selectedStreakFeed.streak_days)}
              </Text>
              
              <Text style={{
                fontSize: 16,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: 24,
                textAlign: 'center',
                lineHeight: 22,
                fontWeight: '500',
              }}>
                {selectedStreakFeed.description}
              </Text>
              
              {selectedStreakFeed.isLocked ? (
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: '800',
                    color: '#FFD700',
                    marginBottom: 12,
                    letterSpacing: 0.5,
                  }}>
                    🔒 Locked Streak
                  </Text>
                  <Text style={{
                    fontSize: 15,
                    color: 'rgba(255, 215, 0, 0.9)',
                    textAlign: 'center',
                    marginBottom: 24,
                    fontWeight: '500',
                    lineHeight: 20,
                  }}>
                    Complete today's daily goal by making a new post to unlock this streak!
                  </Text>
                  
                  {/* Premium Unlock Options */}
                  <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 20,
                    padding: 24,
                    marginBottom: 24,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 215, 0, 0.2)',
                    shadowColor: '#FFD700',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 4,
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#FFD700',
                      textAlign: 'center',
                      marginBottom: 8,
                    }}>
                      💎 Mahi+ Premium
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center',
                      marginBottom: 15,
                    }}>
                      Unlock the full Mahi experience
                    </Text>
                    
                    {/* Streak Packages */}
                    <View style={{ marginBottom: 15 }}>
                      <Pressable
                        style={{
                          backgroundColor: 'rgba(0, 191, 165, 0.9)',
                          paddingHorizontal: 24,
                          paddingVertical: 16,
                          borderRadius: 24,
                          marginBottom: 12,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor: 'rgba(0, 191, 165, 0.3)',
                          shadowColor: '#00BFA5',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          elevation: 4,
                        }}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>
                          Unlock 5 Streaks
                        </Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>
                          £2.49
                        </Text>
                      </Pressable>
                      
                      <Pressable
                        style={{
                          backgroundColor: 'rgba(0, 119, 182, 0.9)',
                          paddingHorizontal: 24,
                          paddingVertical: 16,
                          borderRadius: 24,
                          marginBottom: 12,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor: 'rgba(0, 119, 182, 0.3)',
                          shadowColor: '#0077B6',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          elevation: 4,
                        }}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>
                          Unlock 10 Streaks
                        </Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>
                          £4.49
                        </Text>
                      </Pressable>
                    </View>
                    
                    {/* Subscription Option */}
                    <Pressable
                      style={{
                        backgroundColor: 'rgba(255, 215, 0, 0.15)',
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        borderRadius: 24,
                        borderWidth: 2,
                        borderColor: '#FFD700',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        shadowColor: '#FFD700',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 6,
                      }}
                    >
                      <View>
                        <Text style={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold' }}>
                          Mahi+ Premium
                        </Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}>
                          Unlimited streak access
                        </Text>
                        <Text style={{ color: '#FFD700', fontSize: 14, fontWeight: 'bold' }}>
                          £8.99/month
                        </Text>
                      </View>
                      <Text style={{ color: '#FFD700', fontSize: 12, fontWeight: 'bold' }}>
                        BEST VALUE
                      </Text>
                    </Pressable>
                  </View>
                  
                  {/* Free Option */}
                  <Pressable
                    onPress={() => {
                      setSelectedStreakFeed(null);
                      navigation.navigate("AddStoryScreen");
                    }}
                    style={{
                      backgroundColor: '#FFD700',
                      paddingHorizontal: 30,
                      paddingVertical: 15,
                      borderRadius: 25,
                    }}
                  >
                    <Text style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                      Complete Daily Goal (Free)
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: getStreakLevelColor(selectedStreakFeed.streak_level, selectedStreakFeed.feedType, selectedStreakFeed.isLocked, selectedStreakFeed.streak_days),
                    marginBottom: 30,
                  }}>
                    {selectedStreakFeed.streak_days} Days Streak
                  </Text>
                  
                  <Pressable
                    onPress={() => setSelectedStreakFeed(null)}
                    style={{
                      backgroundColor: getStreakLevelColor(selectedStreakFeed.streak_level, selectedStreakFeed.feedType, selectedStreakFeed.isLocked, selectedStreakFeed.streak_days),
                      paddingHorizontal: 30,
                      paddingVertical: 15,
                      borderRadius: 25,
                    }}
                  >
                    <Text style={{
                      color: theme.colors.textColor,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                      Open {selectedStreakFeed.title} Feed
                    </Text>
                  </Pressable>
                </>
              )}
              
              {/* Swipe down indicator */}
              <View style={{
                position: 'absolute',
                top: -10,
                width: 40,
                height: 4,
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 2,
              }} />
            </Animated.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Stories;

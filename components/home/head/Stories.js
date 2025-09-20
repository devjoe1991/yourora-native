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
} from "react-native";
import React, { useRef, useState } from "react";
import { USERS } from "../../../data/users";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/Styles";
import ImageStory from "../../story/ImageStory";
import { Ionicons } from "@expo/vector-icons";
import PressEffect from "../../UI/PressEffect";
// https://github.com/birdwingo/react-native-instagram-stories?tab=readme-ov-file

// Streak-based data for fitness app - realistic beginner numbers
const data = [
  {
    user_id: 0,
    streak_days: 0, // Special case for "Add Story" button
    streak_level: 0,
    user_name: "Add Story",
    active: false,
    isCurrentUser: true,
  },
  {
    user_id: 1,
    streak_days: 1,
    streak_level: 1, // Newcomer level
    user_name: "Your Streak",
    active: true,
    isCurrentUser: true,
  },
  {
    user_id: 2,
    streak_days: 2,
    streak_level: 1, // Same level as user
    user_name: "Same Level",
    active: false,
    isCurrentUser: false,
  },
  {
    user_id: 3,
    streak_days: 3,
    streak_level: 1, // Same level as user
    user_name: "Same Level",
    active: false,
    isCurrentUser: false,
  },
  {
    user_id: 4,
    streak_days: 5,
    streak_level: 1, // Same level as user
    user_name: "Same Level",
    active: false,
    isCurrentUser: false,
  },
  {
    user_id: 5,
    streak_days: 7,
    streak_level: 1, // Same level as user
    user_name: "Same Level",
    active: false,
    isCurrentUser: false,
  },
  {
    user_id: 6,
    streak_days: 9,
    streak_level: 2, // Next level - Rising
    user_name: "Next Level",
    active: false,
    isCurrentUser: false,
  },
];
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ITEM_SIZE = SCREEN_WIDTH / 5;
const TRANSLATE_VALUE = ITEM_SIZE / 2;
export const CONTAINER_HEIGHT = ITEM_SIZE + TRANSLATE_VALUE + 10;

// Streak level color function
const getStreakLevelColor = (level) => {
  switch(level) {
    case 0: return '#333333';      // Add Story - Dark
    case 1: return '#45B7D1';      // Newcomer - Blue
    case 2: return '#4ECDC4';      // Rising - Teal  
    case 3: return '#96CEB4';      // Committed - Green
    case 4: return '#FFEAA7';      // Dedicated - Yellow
    case 5: return '#DDA0DD';      // Elite - Purple
    case 6: return '#FFD700';      // Legendary - Gold
    case 7: return '#FF6B6B';      // Master - Red
    default: return '#333333';
  }
};

const Stories = ({ followingsData }) => {
  const storiesRef = useRef(null);
  const [showStory, setShowStory] = useState(false);
  const ScrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  return (
    <View>
      <Animated.FlatList
        keyExtractor={(data, index) => index.toString()}
        data={data}
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
                onPress={() => {
                  if (item.user_id == 0) {
                    // Add Story button
                    navigation.navigate("AddStoryScreen");
                  } else if (item.isCurrentUser) {
                    // Your personal streak - show personal feed
                    console.log("Show personal streak feed for", item.streak_days, "days");
                    // navigation.navigate("PersonalStreakFeed", { streakDays: item.streak_days });
                  } else {
                    // Other streaks - unlock feed based on level
                    console.log("Unlock feed for streak level", item.streak_level, "with", item.streak_days, "days");
                    // navigation.navigate("StreakFeed", { 
                    //   streakLevel: item.streak_level, 
                    //   streakDays: item.streak_days 
                    // });
                  }
                }}
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
                  // onPress={() => {
                  //   setShowStory(true);
                  // }}
                >
                  {/* Streak Score Circle */}
                  <View
                    style={[
                      {
                        width: "100%",
                        height: "100%",
                        borderRadius: 60,
                        backgroundColor: getStreakLevelColor(item.streak_level),
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: item.isCurrentUser ? 3 : 0,
                        borderColor: item.isCurrentUser ? '#00BFA5' : 'transparent',
                      },
                    ]}
                  >
                    {item.user_id == 0 ? (
                      // Add Story button
                      <Ionicons
                        name="add-circle"
                        size={30}
                        color="white"
                      />
                    ) : (
                      // Streak score number
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {item.streak_days}
                      </Text>
                    )}
                    
                    {/* Active indicator */}
                    {item.active && (
                      <View
                        style={{
                          position: "absolute",
                          right: 3,
                          bottom: 5,
                        }}
                      >
                        <Ionicons
                          name="ellipse"
                          size={15}
                          color={GlobalStyles.colors.greenLight}
                        />
                      </View>
                    )}
                  </View>
                </Animated.View>
              </Pressable>
            </PressEffect>
          );
        }}
      />

      {showStory && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStory}
          statusBarTranslucent={true}
          onRequestClose={() => {
            setShowStory(!showStory);
          }}
        >
          <ImageStory setShowStory={setShowStory} stories={data?.stories} />
        </Modal>
      )}
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.cyan,
  },
});

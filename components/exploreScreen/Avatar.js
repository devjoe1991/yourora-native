import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import PressEffect from "../UI/PressEffect";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../store/theme-context";

function Icon({ icon, size = 20, line, onPress = () => {} }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          padding: 10,
        },
        line && {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: theme.colors.primary,
        },
      ]}
    >
      <PressEffect>
        <Image
          source={icon}
          style={{
            width: size,
            height: size,
            tintColor: theme.colors.textColor,
            margin: 10,
          }}
        />
      </PressEffect>
    </Pressable>
  );
}

const Avatar = ({ imgUri, displayName, avatarSize, remainingSpace }) => {
  const { theme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [OptionsHeight, setOptionsHeight] = useState(200);

  const styles = StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      borderLeftWidth: 7,
      borderRightWidth: 7,
      borderBottomWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: theme.colors.primary500,
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: showOptions ? withTiming(10) : withTiming(0),
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      {showOptions && remainingSpace < OptionsHeight && (
        <Animated.View
          onLayout={(e) => {
            setOptionsHeight(e.nativeEvent.layout.height);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -OptionsHeight,
          }}
          entering={FadeInDown}
          exiting={FadeOutDown}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary500,
              borderRadius: 20,
            }}
          >
            <Icon icon={require("../../assets/add-friend.png")} line />
            <Icon icon={require("../../assets/chat-focused.png")} line />
            <Icon icon={require("../../assets/profile.png")} />
          </View>
          <View
            style={[
              styles.triangle,
              { transform: [{ rotate: "180deg" }], top: -2 },
            ]}
          />
        </Animated.View>
      )}
      <PressEffect>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
          onPress={() => setShowOptions(!showOptions)}
        >
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: imgUri }}
              style={{ width: avatarSize, height: avatarSize, borderRadius: 50 }}
            />
            {/* Online indicator */}
            <View
              style={{
                position: "absolute",
                right: 2,
                bottom: 2,
                width: Math.max(8, avatarSize * 0.2),
                height: Math.max(8, avatarSize * 0.2),
                borderRadius: Math.max(4, avatarSize * 0.1),
                backgroundColor: theme.colors.greenLight,
                borderWidth: 2,
                borderColor: theme.colors.primary300,
              }}
            />
          </View>
          <Text
            style={{
              color: theme.colors.textColor,
              fontSize: 15,
              fontWeight: "500",
              paddingTop: 10,
            }}
          >
            {displayName}
          </Text>
        </Pressable>
      </PressEffect>
      {showOptions && remainingSpace > OptionsHeight && (
        <Animated.View
          onLayout={(e) => {
            setOptionsHeight(e.nativeEvent.layout.height);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          entering={FadeInUp}
          exiting={FadeOutUp}
        >
          <View style={styles.triangle} />
          <View
            style={{
              backgroundColor: theme.colors.primary500,
              borderRadius: 20,
            }}
          >
            <Icon icon={require("../../assets/profile.png")} line />
            <Icon icon={require("../../assets/chat-focused.png")} line />
            <Icon icon={require("../../assets/add-friend.png")} />
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default Avatar;

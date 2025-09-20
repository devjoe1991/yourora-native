// ProgressBar.js
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { GlobalStyles } from "../../constants/Styles";
import { useTheme } from "../../store/theme-context";

const DURATION = 5;
const ProgressBar = ({ onFinish, start, completed }) => {
  const { theme } = useTheme();
  const progress = useSharedValue(0);
  const isCompleted = useSharedValue(false);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 5,
      backgroundColor: theme.colors.primary500,
      borderRadius: 10,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: theme.colors.purple,
      borderRadius: 10,
    },
  });

  useEffect(() => {
    if (start) {
      isCompleted.value = false;
      progress.value = withTiming(
        1,
        {
          duration: DURATION * 1000,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            isCompleted.value = true;
            if (onFinish) {
              runOnJS(onFinish)();
            }
          }
        }
      );
    }
  }, [start]);

  useEffect(() => {
    if (completed) {
      progress.value = 1;
    }
  }, [completed]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />
    </View>
  );
};

export default ProgressBar;

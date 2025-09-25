import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../store/theme-context";
import TabBarSvg from "./TabBarSvg";
import NewPostIcon from "./NewPostIcon";
import { AppContext } from "../../store/app-context";

const TabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();
  const appCtx = useContext(AppContext);
  const screens = [
    {
      name: "Home",
      icon: "home",
      iconFocused: "home",
    },
    {
      name: "Explore",
      icon: "compass",
      iconFocused: "compass",
    },
    {
      name: "Reels",
      icon: "play-circle",
      iconFocused: "play-circle",
    },
    {
      name: "Chat",
      icon: "chatbubbles",
      iconFocused: "chatbubbles",
    },
  ];
  const [tabBarHeight, setTabBarHeight] = useState(50);
  const [actionBtnPressed, setActionBtnPressed] = useState(false);

  const activeTabScreen = state.routes[state.index].name;
  return (
    <Fragment>
      {actionBtnPressed && (
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Pressable
            onPress={() => setActionBtnPressed(false)}
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
              opacity: 0.8,
            }}
          />
        </Animated.View>
      )}
      <View style={{ zIndex: 1 }}>
        <TabBarSvg height={tabBarHeight} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          height: tabBarHeight,
        }}
        onLayout={(e) => {
          setTabBarHeight(e.nativeEvent.layout.height);
          appCtx.setTabBarHeight(e.nativeEvent.layout.height + 50);
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (actionBtnPressed) {
              setActionBtnPressed(false);
            }
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const animatedStyles = useAnimatedStyle(() => {
            return {
              transform: [
                { translateX: isFocused ? withTiming(-10) : withTiming(0) },
                { translateY: isFocused ? withTiming(-6) : withTiming(0) },
              ],
              tintColor: isFocused
                ? withTiming("white")
                : withTiming("rgba(255,255,255,0.2)"),
            };
          });
          const animatedColor = useAnimatedStyle(() => {
            return {
              opacity: isFocused ? withTiming(1) : withTiming(0),
            };
          });
          return (
            <Fragment key={index}>
              <View style={{ flex: 1 }}>
                <Pressable onPress={onPress}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                      padding: 15,
                    }}
                  >
                    <Animated.View
                      style={[
                        {
                          width: 24,
                          height: 24,
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        animatedStyles,
                      ]}
                    >
                      <Ionicons
                        name={isFocused ? screens[index].iconFocused : screens[index].icon}
                        size={24}
                        color={isFocused ? theme.colors.blue : theme.colors.textSecondary}
                      />
                    </Animated.View>
                  </View>
                </Pressable>
              </View>
              {index == 1 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      transform: [{ translateY: -(50 / 2 + 5) }],
                    }}
                  >
                    <NewPostIcon
                      exploreActive={activeTabScreen === "ExploreScreen"}
                      pressed={actionBtnPressed}
                      setPressed={setActionBtnPressed}
                    />
                  </View>
                </View>
              )}
            </Fragment>
          );
        })}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default TabBar;

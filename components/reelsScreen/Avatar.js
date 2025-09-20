import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { USERS } from "../../data/users";
import { Image } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import PressEffect from "../UI/PressEffect";
import { useTheme } from "../../store/theme-context";

const Avatar = () => {
  const { theme } = useTheme();
  return (
    <PressEffect>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 50 }}
            source={{ uri: USERS[0].image }}
          />
          {/* Online indicator */}
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: theme.colors.greenLight,
              borderWidth: 2,
              borderColor: theme.colors.primary300,
            }}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {USERS[0].name}
          </Text>
          <Text style={{ color: theme.colors.mutedTextColor, fontSize: 12 }}>
            @{USERS[0].user}
          </Text>
        </View>
      </View>
    </PressEffect>
  );
};

export default Avatar;

const styles = StyleSheet.create({});

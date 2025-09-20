import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";
import { Image } from "react-native";
import { USERS } from "../../data/users";
import { useTheme } from "../../store/theme-context";

const ChatCard = ({ sender }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "rgba(122, 64, 248,0.5)",
      padding: 10,
      borderRadius: 20,
      marginLeft: 10,
      width: "70%",
      alignSelf: "flex-end",
      borderBottomRightRadius: 0,
    },
    senderContainer: {
      backgroundColor: theme.colors.primary600,
      borderBottomRightRadius: undefined,
      borderBottomLeftRadius: 0,
    },
  });

  return (
    <View
      style={[
        { margin: 10, marginHorizontal: 15 },
        sender && { flexDirection: "row", alignItems: "flex-end" },
      ]}
    >
      {sender && (
        <Image
          source={{ uri: USERS[0].image }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
      )}
      <View style={[styles.container, sender && styles.senderContainer]}>
        <Text style={{ color: theme.colors.textColor }}>
          this is a message sdjhadsaidjasfiosahfoisioasjdiosadjasdjoasdjoiasdoj
        </Text>
        <Text
          style={{
            color: theme.colors.mutedTextColor,
            fontSize: 10,
            textAlign: sender ? "right" : undefined,
            paddingTop: 2,
          }}
        >
          12:00 AM
        </Text>
      </View>
    </View>
  );
};

export default ChatCard;

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/Styles";
import { USERS } from "../../data/users";
import { useTheme } from "../../store/theme-context";
function CommentCard() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary300,
      borderRadius: 20,
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: USERS[1].image }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14, color: theme.colors.textColor }}>
            John Doe asdlaksm aslkdmsdksad as
            aaksjdlmakjndsmlasknjdlmlskcnmsalmcksacansldsakdalsdlnsdksadm;samdas;dm;
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.6)",
              alignSelf: "flex-end",
            }}
          >
            2 minutes Ago
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CommentCard;

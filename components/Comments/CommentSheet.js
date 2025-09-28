import React, { useRef, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Ionicons } from "@expo/vector-icons";
import CommentCard from "./CommentCard";
import { GlobalStyles } from "../../constants/Styles";
import { FlatList } from "react-native-gesture-handler";
import InputField from "../InputField";
import EmojiInput from "../UI/EmojiInput";
import { useTheme } from "../../store/theme-context";
import PressEffect from "../UI/PressEffect";

function CommentSheet({ visible, setVisible }) {
  const { theme } = useTheme();
  const [comment, setComment] = useState("");
  const actionSheetRef = useRef(null);
  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [visible]);

  const handleClose = () => {
    setVisible();
  };

  return (
    <View style={{ flex: 1 }}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: theme.colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: '90%',
        }}
        indicatorStyle={{
          width: 50,
          marginVertical: 10,
          backgroundColor: theme.colors.textColor,
        }}
        gestureEnabled={true}
        snapPoints={[90]}
        onClose={() => {
          setVisible();
        }}
      >
        {/* Header with close button */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary500,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.textColor,
          }}>
            Comments
          </Text>
          <PressEffect>
            <TouchableOpacity
              onPress={handleClose}
              style={{
                width: 35,
                height: 35,
                borderRadius: 17.5,
                backgroundColor: theme.colors.primary500,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons 
                name="close" 
                size={20} 
                color={theme.colors.textColor} 
              />
            </TouchableOpacity>
          </PressEffect>
        </View>

        {/* Comments List */}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 5]}
          renderItem={({ item, index }) => {
            return <CommentCard />;
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        />

        {/* Input Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: theme.colors.primary500,
          }}
        >
          <EmojiInput />
        </View>
      </ActionSheet>
    </View>
  );
}

export default CommentSheet;

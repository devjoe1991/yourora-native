import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import MessageCard from "../components/messagesScreen/MessageCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../constants/Styles";
import { useTheme } from "../store/theme-context";

const MessagesScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [paddingTop, setPaddingTop] = useState(0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          width: "100%",
        }}
      >
        <View
          onLayout={(e) => {
            setPaddingTop(e.nativeEvent.layout.height + 15);
          }}
          style={{ margin: 20, marginTop: StatusBar.currentHeight + 15 }}
        >
          <InputField
            onChangeText={setSearch}
            onBlur={() => {}}
            value={search}
            placeholder="Search"
            keyboardType="default"
            inValid={true}
            search={true}
          />
        </View>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: paddingTop,
          paddingBottom: GlobalStyles.styles.tabBarPadding,
        }}
        renderItem={({ item, index }) => {
          return <MessageCard />;
        }}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

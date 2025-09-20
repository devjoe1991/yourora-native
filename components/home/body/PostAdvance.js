import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { DEFAULT_DP, GlobalStyles } from "../../../constants/Styles";
import CommentSheet from "../../Comments/CommentSheet";
import { timeDifference } from "../../../utils/helperFunctions";
import { AuthContext } from "../../../store/auth-context";
import PressEffect from "../../UI/PressEffect";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");

function PostAdvance({ post }) {
  const authCtx = useContext(AuthContext);

  function Avatar() {
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = React.useState(
      !!post.userPicturePath ? post.userPicturePath : DEFAULT_DP
    );
    return (
      <View style={{ flexDirection: "row" }}>
        <PressEffect>
          <Pressable
            style={{
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.navigate("UserProfileScreen", {
                backWhite: true,
                ViewUser: true,
              });
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={
                  profilePic
                    ? { uri: profilePic }
                    : {
                        uri: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
                      }
                }
                style={styles.story}
              />
              {/* Online indicator */}
              <View
                style={{
                  position: "absolute",
                  right: 2,
                  bottom: 2,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: GlobalStyles.colors.greenLight,
                  borderWidth: 2,
                  borderColor: GlobalStyles.colors.primary300,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                username
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {timeDifference(post.createdAt)}
              </Text>
            </View>
          </Pressable>
        </PressEffect>
      </View>
    );
  }
  function PostFotter() {
    const [showCaptions, setShowCaptions] = useState(false);

    return (
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="location"
              size={15}
              color={GlobalStyles.colors.gray}
            />
            <Text
              style={{ color: GlobalStyles.colors.gray, paddingHorizontal: 5 }}
            >
              Tower Bridge, London
            </Text>
          </View>
          <Text
            style={{ color: GlobalStyles.colors.gray, paddingHorizontal: 5 }}
          >
            25 July, 2024
          </Text>
        </View>
        <Text
          onPress={() => setShowCaptions(!showCaptions)}
          numberOfLines={showCaptions ? undefined : 1}
          style={{
            color: "white",
            padding: 5,
            paddingBottom: 10,
            width: showCaptions ? undefined : "90%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: GlobalStyles.colors.purple,
            }}
          >
            Post Title:{" "}
          </Text>
          {post.description}
        </Text>
      </View>
    );
  }
  function PostImage({ children }) {
    const [resizeModeCover, setResizeModeCover] = useState(true);
    const [ratio, setRatio] = useState(1);

    useEffect(() => {
      Image.getSize(post.picturePath, (width, height) => {
        const imageRatio = width / height;
        if (imageRatio < 0.9) {
          setRatio(1);
        } else {
          setRatio(imageRatio);
        }
      });
    }, [post]);

    return (
      <Pressable
        style={{
          borderRadius: 30,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: GlobalStyles.colors.primary600,
        }}
        onPress={() => {
          setResizeModeCover(!resizeModeCover);
          console.log("object");
        }}
      >
        <ImageBackground
          source={{ uri: post.picturePath }}
          style={{
            width: "100%",
            aspectRatio: ratio,
            backgroundColor: GlobalStyles.colors.primary500,
          }}
          imageStyle={{
            resizeMode: resizeModeCover ? "cover" : "contain",
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,.5)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              bottom: 0,
              height: 40 + 50,
              width: "100%",
              position: "absolute",
            }}
          />
          {children}
        </ImageBackground>
      </Pressable>
    );
  }
  function PostStats() {
    const [liked, setLiked] = useState(false);
    const [showReactionBar, setShowReactionBar] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);

    const [totalLikes, setTotalLikes] = useState(post.likes.length);
    const [showComments, setShowComments] = useState(false);
    
    // Common emojis for reaction bar
    const commonEmojis = ['❤️', '🔥', '💪', '👏', '🎉'];
    
    function handleReactionPress(emoji) {
      setSelectedReaction(emoji);
      setLiked(true); // Set as liked with the selected emoji
      setShowReactionBar(false);
      // Handle reaction logic here
      console.log(`User reacted with: ${emoji}`);
    }

    function handleLongPress() {
      setShowReactionBar(true);
    }

    function handleCloseReactionBar() {
      setShowReactionBar(false);
      // Don't reset anything when just closing the bar
    }

    function handleLike() {
      if (selectedReaction) {
        // If there's a selected reaction, clear it and set to unliked
        setSelectedReaction(null);
        setLiked(false);
        setTotalLikes((prevData) => prevData - 1);
      } else {
        // Normal like/unlike behavior
        setTotalLikes((prevData) => (liked ? prevData - 1 : prevData + 1));
        setLiked(!liked);
      }
    }

    function FooterButton({ icon, number, onPress, onLongPress, color = "white", showReaction = false }) {
      return (
        <View style={{ zIndex: 10 }}>
          <Pressable 
            style={[styles.footerIcon]} 
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
          >
            <PressEffect>
              <View
                style={{
                  backgroundColor: GlobalStyles.colors.primary,
                  padding: 10,
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {showReaction && selectedReaction ? (
                  <Text style={{ fontSize: 20 }}>{selectedReaction}</Text>
                ) : (
                  <Ionicons
                    style={{
                      paddingHorizontal: 5,
                    }}
                    name={icon}
                    size={20}
                    color={color}
                  />
                )}

                {/* <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {number}
                </Text> */}
              </View>
            </PressEffect>
          </Pressable>
        </View>
      );
    }

    return (
      <>
        <CommentSheet visible={showComments} setVisible={setShowComments} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Avatar />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <FooterButton
              icon={liked ? "heart" : "heart-outline"}
              number={totalLikes}
              onPress={handleLike}
              onLongPress={handleLongPress}
              color={GlobalStyles.colors.greenLight}
              showReaction={true}
            />
            <FooterButton
              icon={"chatbubble-ellipses"}
              number={post.comments.length}
              onPress={() => {
                setShowComments(true);
              }}
            />

            <FooterButton icon={"arrow-redo"} onPress={() => {}} left={20} />
          </View>
        </View>
        
        {/* Reaction Bar */}
        {showReactionBar && (
          <>
            {/* Backdrop to close reaction bar when tapping outside */}
            <Pressable
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
              }}
              onPress={handleCloseReactionBar}
            />
            <View style={{
              position: 'absolute',
              bottom: 50,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderRadius: 20,
              padding: 8,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 200,
              width: 50,
              zIndex: 1000,
            }}>
            {commonEmojis.map((emoji, index) => (
              <Pressable
                key={index}
                onPress={() => handleReactionPress(emoji)}
                style={{
                  padding: 8,
                  borderRadius: 15,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20 }}>{emoji}</Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => {
                // Open emoji keyboard
                console.log('Open emoji keyboard');
                handleCloseReactionBar();
              }}
              style={{
                padding: 8,
                borderRadius: 15,
                backgroundColor: 'rgba(255,255,255,0.1)',
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="add" size={20} color="white" />
            </Pressable>
            </View>
          </>
        )}
      </>
    );
  }

  return (
    <View
      style={{
        backgroundColor: GlobalStyles.colors.primary300,
        borderRadius: 30,
        marginHorizontal: 10,
      }}
    >
      <PostImage>
        <PostStats />
      </PostImage>
      <PostFotter />
    </View>
  );
}

export default PostAdvance;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});


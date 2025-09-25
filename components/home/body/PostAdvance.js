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
import { useTheme } from "../../../store/theme-context";
import PressEffect from "../../UI/PressEffect";
import { LinearGradient } from "expo-linear-gradient";
import VideoPlayer from "../../UI/VideoPlayer";
import { 
  getContentType, 
  getMediaUrl, 
  getThumbnailUrl, 
  getVideoDuration, 
  isVideoPost, 
  isImagePost,
  getAspectRatio 
} from "../../../utils/mediaUtils";
const { height, width } = Dimensions.get("window");

function PostAdvance({ post }) {
  const { theme } = useTheme();
  const authCtx = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

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
                  backgroundColor: theme.colors.greenLight,
                  borderWidth: 2,
                  borderColor: theme.colors.primary300,
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
                  color: theme.colors.textColor,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                username
              </Text>
              <Text
                style={{
                  color: theme.colors.textSecondary,
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
              color={theme.colors.mutedTextColor}
            />
            <Text
              style={{ color: theme.colors.mutedTextColor, paddingHorizontal: 5 }}
            >
              Tower Bridge, London
            </Text>
          </View>
          <Text
            style={{ color: theme.colors.mutedTextColor, paddingHorizontal: 5 }}
          >
            25 July, 2024
          </Text>
        </View>
        <View
          style={{
            padding: 5,
            paddingBottom: 10,
            width: showCaptions ? undefined : "90%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: theme.colors.purple,
              marginBottom: 8,
            }}
          >
            {post.title || "Fitness Post"}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.textColor,
              lineHeight: 20,
            }}
          >
            {isExpanded || !post.description || post.description.length <= 100 
              ? post.description 
              : post.description.substring(0, 100) + "... "}
            {post.description && post.description.length > 100 && (
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.blue,
                  fontWeight: "600",
                }}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "See less" : "See more"}
              </Text>
            )}
          </Text>
        </View>
      </View>
    );
  }
  function PostMedia({ children }) {
    const [resizeModeCover, setResizeModeCover] = useState(true);
    const [ratio, setRatio] = useState(1);
    const [isVideoVisible, setIsVideoVisible] = useState(true);

    const contentType = getContentType(post);
    const mediaUrl = getMediaUrl(post);
    const thumbnailUrl = getThumbnailUrl(post);
    const videoDuration = getVideoDuration(post);
    const aspectRatio = getAspectRatio(post);

    useEffect(() => {
      if (isImagePost(post)) {
        Image.getSize(mediaUrl, (width, height) => {
          const imageRatio = width / height;
          // Instagram standard ratios
          if (imageRatio >= 1.8) {
            // Landscape: 1.91:1 ratio
            setRatio(1.91);
          } else if (imageRatio <= 0.8) {
            // Portrait: 4:5 ratio
            setRatio(0.8);
          } else {
            // Square: 1:1 ratio
            setRatio(1);
          }
        });
      } else {
        // For videos, use the aspect ratio from dimensions or default
        setRatio(aspectRatio);
      }
    }, [post, aspectRatio]);

    const handleMediaPress = () => {
      if (isImagePost(post)) {
        setResizeModeCover(!resizeModeCover);
        console.log("object");
      }
      // For videos, the VideoPlayer handles its own press events
    };

    return (
      <Pressable
        style={{
          borderRadius: 30,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.colors.primary600,
        }}
        onPress={handleMediaPress}
      >
        {isVideoPost(post) ? (
          <VideoPlayer
            videoUrl={mediaUrl}
            thumbnailUrl={thumbnailUrl}
            duration={videoDuration}
            isVisible={isVideoVisible}
            autoPlay={true}
            showControls={true}
            style={{
              width: "100%",
              aspectRatio: ratio,
              backgroundColor: theme.colors.primary500,
            }}
            aspectRatio={ratio}
          />
        ) : (
          <ImageBackground
            source={{ uri: mediaUrl }}
            style={{
              width: "100%",
              aspectRatio: ratio,
              backgroundColor: theme.colors.primary500,
            }}
            imageStyle={{
              resizeMode: resizeModeCover ? "cover" : "contain",
            }}
          >
            <LinearGradient
              colors={[theme.colors.primary500, "transparent"]}
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
        )}
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

    function FooterButton({ icon, number, onPress, onLongPress, color = theme.colors.textColor, showReaction = false }) {
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
                  backgroundColor: theme.colors.primary,
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
                    color: theme.colors.textColor,
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
              color={theme.colors.greenLight}
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
              backgroundColor: theme.colors.primary500,
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
                  backgroundColor: theme.colors.primary600,
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
              <Ionicons name="add" size={20} color={theme.colors.textColor} />
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
        backgroundColor: theme.colors.primary300,
        borderRadius: 30,
        marginHorizontal: 10,
      }}
    >
      <PostMedia>
        <PostStats />
      </PostMedia>
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


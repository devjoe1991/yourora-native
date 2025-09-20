import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { DEFAULT_DP, GlobalStyles } from "../../../constants/Styles";
import CommentSheet from "../../Comments/CommentSheet";
import { timeDifference } from "../../../utils/helperFunctions";
import { AuthContext } from "../../../store/auth-context";
import { Path, Svg } from "react-native-svg";
import PressEffect from "../../UI/PressEffect";
const { height, width } = Dimensions.get("window");

function Post({ post }) {
  const authCtx = useContext(AuthContext);
  function PostHeader() {
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = React.useState(
      !!post.userPicturePath ? post.userPicturePath : DEFAULT_DP
    );
    return (
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <Svg width={20} height={20} viewBox={`0 0 20 20`}>
          <Path
            d={`M0,0
              L20,0
              L20,20
              A20,20 0 0,0 0,0
              Z
        `}
            fill={GlobalStyles.colors.primary500}
          />
        </Svg>

        <View
          style={{
            backgroundColor: GlobalStyles.colors.primary500,
            padding: 5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PressEffect>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
        </View>
        <Svg width={20} height={20} viewBox={`0 0 20 20`}>
          <Path
            d={`M20,0
              L0,0
              L00,20
              A0,0 0 0,1 20,0
              Z
        `}
            fill={GlobalStyles.colors.primary500}
          />
        </Svg>
      </View>
    );
  }

  function PostImage() {
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
        onPress={() => {
          setResizeModeCover(!resizeModeCover);
        }}
        style={{}}
      >
        <Image
          source={{ uri: post.picturePath }}
          style={{
            width: "100%",
            aspectRatio: ratio,
            borderRadius: 15,
            resizeMode: resizeModeCover ? "cover" : "contain",
            backgroundColor: GlobalStyles.colors.primary500,
            borderWidth: 1,
            borderColor: GlobalStyles.colors.primary500,
          }}
        />
      </Pressable>
    );
  }
  function PostStats() {
    const [liked, setLiked] = useState(false);
    const [showReactionBar, setShowReactionBar] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);

    const [totalLikes, setTotalLikes] = useState(post.likes.length);
    const [showCaptions, setShowCaptions] = useState(false);
    const [showComments, setShowComments] = useState(false);
    
    // Common emojis for reaction bar
    const commonEmojis = ['❤️', '🔥', '💪', '👏', '🎉'];
    
    async function handleLike() {
      setTotalLikes((prevData) => (liked ? prevData - 1 : prevData + 1));
      setLiked(!liked);
    }

    function handleReactionPress(emoji) {
      setSelectedReaction(emoji);
      setShowReactionBar(false);
      // Handle reaction logic here
      console.log(`User reacted with: ${emoji}`);
      
      // Reset to original heart icon after 2 seconds
      setTimeout(() => {
        setSelectedReaction(null);
        setLiked(false); // Reset to unliked state
      }, 2000);
    }

    function handleLongPress() {
      setShowReactionBar(true);
    }

    function handleCloseReactionBar() {
      setShowReactionBar(false);
      // Reset to original heart icon when closing
      setSelectedReaction(null);
      setLiked(false); // Reset to unliked state
    }

    function FooterButton({ icon, number, onPress, onLongPress, color = "white", showReaction = false }) {
      return (
        <View>
          <Pressable 
            style={[styles.footerIcon]} 
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
          >
            <PressEffect>
              {showReaction && selectedReaction ? (
                <Text style={{ fontSize: 25 }}>{selectedReaction}</Text>
              ) : (
                <Ionicons name={icon} size={25} color={color} />
              )}
            </PressEffect>
            <Text
              style={{
                color: "white",
                fontWeight: "600",
              }}
            >
              {number}
            </Text>
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ position: "absolute", left: 0, flexDirection: "row" }}>
            <FooterButton
              icon={liked ? "heart" : "heart-outline"}
              number={totalLikes}
              onPress={handleLike}
              onLongPress={handleLongPress}
              color={GlobalStyles.colors.greenLight}
              showReaction={true}
            />
            <FooterButton
              icon={"chatbubble-ellipses-outline"}
              number={post.comments.length}
              onPress={() => {
                setShowComments(true);
              }}
            />
          </View>
          <PostHeader />
          <View
            style={{ position: "absolute", right: 0, flexDirection: "row" }}
          >
            <FooterButton icon={"arrow-redo"} onPress={() => {}} left={20} />
            <FooterButton icon={"bookmark"} onPress={() => {}} />
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
        
        {post.description && (
          <Text
            onPress={() => setShowCaptions(!showCaptions)}
            numberOfLines={showCaptions ? undefined : 1}
            style={{
              color: "white",
              paddingHorizontal: 5,
              paddingTop: 15,
              textAlign: "center",
              width: showCaptions ? undefined : "90%",
              alignSelf: "center",
            }}
          >
            {post.description}
            akmfadlsa,d;sal,d;lasdas;ld;salaldsa;sld;dlsaskdasdalksd
          </Text>
        )}
      </>
    );
  }

  return (
    <View
      style={{
        backgroundColor: GlobalStyles.colors.primary300,
        borderRadius: 25,
        padding: 15,
        margin: 10,
        marginHorizontal: 20,
      }}
    >
      <PostImage />

      <PostStats />
    </View>
  );
}

export default Post;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  footerIcon: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});


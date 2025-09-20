import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useRef, useContext } from "react";
import { Pressable, StyleSheet, Text, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
// import { formatTime } from "../util/functions";
import { AppContext } from "../store/app-context";
import { useTheme } from "../store/theme-context";

function CameraScreen({ showCamera, setShowCamera, getPost, mode, setExit }) {
  const { theme } = useTheme();
  const appCtx = useContext(AppContext);

  const [facing, setFacing] = useState("back");
  const [camera, setCamera] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: theme.colors.primary,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 20,
    },
    button: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.colors.red,
      justifyContent: "center",
      alignItems: "center",
    },
    captureButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      borderWidth: 3,
      borderColor: theme.colors.textColor,
    },
    flipButton: {
      position: "absolute",
      top: 20,
      right: 20,
      backgroundColor: theme.colors.primary500,
      padding: 10,
      borderRadius: 20,
    },
    closeButton: {
      position: "absolute",
      top: 20,
      left: 20,
      backgroundColor: theme.colors.primary500,
      padding: 10,
      borderRadius: 20,
    },
    flashButton: {
      position: "absolute",
      top: 80,
      right: 20,
      backgroundColor: theme.colors.primary500,
      padding: 10,
      borderRadius: 20,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.primary500,
      justifyContent: "center",
      alignItems: "center",
    },
    overlayText: {
      color: theme.colors.textColor,
      fontSize: 18,
      textAlign: "center",
      marginBottom: 20,
    },
    overlayButton: {
      backgroundColor: theme.colors.blue,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    overlayButtonText: {
      color: theme.colors.textColor,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  const [permission, requestPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [image, setImage] = useState(null);

  const [recording, setRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimer(0);
    }

    return () => clearInterval(timerRef.current);
  }, [recording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImage(photo.uri);
      getPost(photo.uri);
      setShowCamera(false);
    }
  };

  const startRecording = async () => {
    if (camera) {
      setRecording(true);
      const video = await camera.recordAsync();
      setVideo(video.uri);
      getPost(video.uri);
      setShowCamera(false);
    }
  };

  const stopRecording = () => {
    camera.stopRecording();
    setRecording(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      getPost(result.assets[0].uri);
      setShowCamera(false);
    }
  };

  const flipCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          We need your permission to show the camera
        </Text>
        <Pressable style={styles.overlayButton} onPress={requestPermission}>
          <Text style={styles.overlayButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      {showCamera && (
        <Modal visible={showCamera} animationType="slide">
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={setCamera}
            mode={mode}
          >
            <SafeAreaView style={styles.container}>
              <Pressable style={styles.closeButton} onPress={() => setShowCamera(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textColor} />
              </Pressable>

              <Pressable style={styles.flipButton} onPress={flipCamera}>
                <Ionicons name="camera-reverse" size={24} color={theme.colors.textColor} />
              </Pressable>

              <Pressable style={styles.flashButton} onPress={pickImage}>
                <Ionicons name="images" size={24} color={theme.colors.textColor} />
              </Pressable>

              {recording && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{formatTime(timer)}</Text>
                </View>
              )}

              <View style={styles.buttonContainer}>
                <View style={styles.buttonSubContainer}>
                  <Pressable
                    style={styles.button}
                    onPress={mode === "photo" ? takePicture : startRecording}
                  >
                    <View style={styles.captureButton} />
                  </Pressable>

                  {mode === "video" && (
                    <Pressable
                      style={[styles.button, { backgroundColor: theme.colors.blue }]}
                      onPress={recording ? stopRecording : startRecording}
                    >
                      <Ionicons
                        name={recording ? "stop" : "play"}
                        size={30}
                        color={theme.colors.textColor}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
            </SafeAreaView>
          </CameraView>
        </Modal>
      )}
    </>
  );
}

export default CameraScreen;
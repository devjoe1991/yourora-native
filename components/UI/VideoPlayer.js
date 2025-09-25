import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../store/theme-context';
import { isValidVideoDuration, getVideoDurationMessage } from '../../utils/mediaUtils';

const { width, height } = Dimensions.get('window');

const VideoPlayer = ({ 
  videoUrl, 
  thumbnailUrl, 
  duration, 
  isVisible = true,
  autoPlay = true,
  showControls = true,
  onVideoPress,
  style,
  aspectRatio = 1
}) => {
  const { theme } = useTheme();
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [durationError, setDurationError] = useState(null);

  // Move styles inside component to access theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    videoContainer: {
      flex: 1,
      position: 'relative',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButton: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 30,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    durationBadge: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    durationText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.colors.textColor,
    },
    muteIndicator: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 15,
      padding: 6,
    },
    controlsOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 20,
    },
    controlButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 25,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContent: {
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 5,
    },
    errorSubtext: {
      fontSize: 14,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    // Validate video duration
    if (duration && !isValidVideoDuration(duration)) {
      setDurationError(getVideoDurationMessage(duration));
    } else {
      setDurationError(null);
    }
  }, [duration]);

  useEffect(() => {
    if (isVisible && autoPlay && !durationError) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isVisible, autoPlay, durationError]);

  const playVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.log('Error playing video:', error);
      }
    }
  };

  const pauseVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.log('Error pausing video:', error);
      }
    }
  };

  const toggleMute = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.setIsMutedAsync(!isMuted);
        setIsMuted(!isMuted);
      } catch (error) {
        console.log('Error toggling mute:', error);
      }
    }
  };

  const handleVideoPress = () => {
    if (onVideoPress) {
      onVideoPress();
    } else {
      if (isPlaying) {
        pauseVideo();
      } else {
        playVideo();
      }
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusUpdate = (status) => {
    setStatus(status);
    setIsLoading(status.isLoaded === false);
    
    if (status.isLoaded && status.didJustFinish) {
      // Video finished, restart if looping
      if (status.isLooping) {
        playVideo();
      }
    }
  };

  // Show error if duration is invalid
  if (durationError) {
    return (
      <View style={[styles.container, style, styles.errorContainer]}>
        <View style={styles.errorContent}>
          <Ionicons name="warning" size={40} color={theme.colors.red} />
          <Text style={[styles.errorText, { color: theme.colors.textColor }]}>
            {durationError}
          </Text>
          <Text style={[styles.errorSubtext, { color: theme.colors.textSecondary }]}>
            Videos must be 3-30 seconds long
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={handleVideoPress}
        activeOpacity={0.9}
        onLongPress={() => setShowControlsOverlay(true)}
      >
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={[styles.video, { aspectRatio }]}
          resizeMode={ResizeMode.COVER}
          isLooping={true}
          isMuted={isMuted}
          shouldPlay={isVisible && autoPlay}
          onPlaybackStatusUpdate={handleStatusUpdate}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.textColor} />
          </View>
        )}

        {/* Play/Pause Overlay */}
        {!isLoading && (
          <View style={styles.overlay}>
            {!isPlaying && (
              <View style={styles.playButton}>
                <Ionicons 
                  name="play" 
                  size={40} 
                  color={theme.colors.textColor} 
                />
              </View>
            )}
          </View>
        )}

        {/* Duration Badge */}
        {duration && (
          <View style={styles.durationBadge}>
            <Text style={[styles.durationText, { color: theme.colors.textColor }]}>
              {formatTime(duration * 1000)}
            </Text>
          </View>
        )}

        {/* Mute Indicator */}
        {isMuted && (
          <View style={styles.muteIndicator}>
            <Ionicons 
              name="volume-mute" 
              size={16} 
              color={theme.colors.textColor} 
            />
          </View>
        )}

        {/* Controls Overlay */}
        {showControlsOverlay && showControls && (
          <View style={styles.controlsOverlay}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleVideoPress}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color={theme.colors.textColor} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleMute}
            >
              <Ionicons 
                name={isMuted ? "volume-mute" : "volume-high"} 
                size={24} 
                color={theme.colors.textColor} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setShowControlsOverlay(false)}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={theme.colors.textColor} 
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
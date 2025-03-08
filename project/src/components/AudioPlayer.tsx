import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Share,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import usePlayerStore from '../stores/playerStore';
import useDownloadStore from '../stores/downloadStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const formatTime = (milliseconds: number) => {
  if (!milliseconds || isNaN(milliseconds)) return '00:00:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    isBuffering,
    error,
    playPause,
    seek,
    setPlaybackSpeed,
    playNext,
  } = usePlayerStore();

  const { downloadAudio, deleteDownload, getDownloadStatus } = useDownloadStore();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    return () => {
      usePlayerStore.getState().cleanup();
    };
  }, []);

  if (!currentTrack) return null;

  const downloadStatus = getDownloadStatus(currentTrack.id);

  const handleDownload = async () => {
    if (downloadStatus.isDownloaded) {
      await deleteDownload(currentTrack.id);
    } else {
      await downloadAudio(currentTrack.id, currentTrack.url);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this lecture: ${currentTrack.title} by ${currentTrack.scholar}`,
        url: currentTrack.url,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const renderMinimizedPlayer = () => (
    <Pressable 
      style={styles.minimizedContainer}
      onPress={() => setIsMinimized(false)}
    >
      <View style={styles.minimizedContent}>
        <Text style={styles.minimizedTitle} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        {isLoading || isBuffering ? (
          <ActivityIndicator color="#4CAF50" />
        ) : (
          <Pressable onPress={(e) => {
            e.stopPropagation();
            playPause();
          }}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color="#4CAF50"
            />
          </Pressable>
        )}
      </View>
      <Slider
        style={styles.minimizedSlider}
        minimumValue={0}
        maximumValue={duration > 0 ? duration : 1}
        value={currentTime}
        onSlidingComplete={seek}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#2C2C2E"
        thumbTintColor="#4CAF50"
      />
    </Pressable>
  );

  const renderFullPlayer = () => (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', '#000']}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <Pressable onPress={() => setIsMinimized(true)} style={styles.headerButton}>
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable onPress={() => setIsFavorite(!isFavorite)} style={styles.actionButton}>
            <Ionicons name={isFavorite ? "star" : "star-outline"} size={24} color={isFavorite ? "#FFD700" : "#fff"} />
          </Pressable>
          <Pressable onPress={handleDownload} style={styles.actionButton}>
            {downloadStatus.progress > 0 && downloadStatus.progress < 1 ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons
                name={downloadStatus.isDownloaded ? "trash" : "download"}
                size={24}
                color="#fff"
              />
            )}
          </Pressable>
          <Pressable onPress={handleShare} style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={() => setShowMenu(true)} style={styles.actionButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <View style={styles.artwork}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80' }}
          style={styles.artworkImage}
        />
      </View>

      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {currentTrack.title}
        </Text>
        <Text style={styles.scholar}>{currentTrack.scholar}</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.progressContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration > 0 ? duration : 1}
            value={currentTime}
            onSlidingComplete={seek}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            thumbTintColor="#fff"
          />
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>

        <View style={styles.mainControls}>
          <Pressable
            onPress={() => seek(Math.max(0, currentTime - 10000))}
            style={styles.secondaryButton}>
            <Ionicons name="play-back" size={35} color="#fff" />
          </Pressable>

          <Pressable
            onPress={playPause}
            style={styles.playButton}
            disabled={isLoading || isBuffering}>
            {isLoading || isBuffering ? (
              <ActivityIndicator color="#000" size="large" />
            ) : (
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={40}
                color="#000"
              />
            )}
          </Pressable>

          <Pressable
            onPress={() => seek(Math.min(duration, currentTime + 10000))}
            style={styles.secondaryButton}>
            <Ionicons name="play-forward" size={35} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.bottomControls}>
          <Pressable
            style={styles.speedButton}
            onPress={() => {
              const currentIndex = speedOptions.indexOf(playbackSpeed);
              const nextIndex = (currentIndex + 1) % speedOptions.length;
              setPlaybackSpeed(speedOptions[nextIndex]);
            }}>
            <Text style={styles.speedButtonText}>{playbackSpeed}x</Text>
          </Pressable>

          <Pressable onPress={playNext} style={styles.nextButton}>
            <Ionicons name="play-skip-forward" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <Pressable 
              style={styles.menuItem}
              onPress={() => {
                handleDownload();
                setShowMenu(false);
              }}
            >
              <Ionicons
                name={downloadStatus.isDownloaded ? "trash" : "download"}
                size={24}
                color="#fff"
              />
              <Text style={styles.menuItemText}>
                {downloadStatus.isDownloaded ? 'Remove Download' : 'Download'}
              </Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuItem}
              onPress={() => {
                // Add to playlist logic here
                setShowMenu(false);
              }}
            >
              <Ionicons name="list" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Add to Playlist</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );

  return isMinimized ? renderMinimizedPlayer() : renderFullPlayer();
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 1000,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  minimizedContainer: {
    position: 'absolute',
    bottom: 65, // Above tab bar
    left: 0,
    right: 0,
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    padding: 8,
    zIndex: 999,
  },
  minimizedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  minimizedTitle: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  minimizedSlider: {
    height: 2,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  artwork: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  artworkImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    borderRadius: 8,
  },
  trackInfo: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  scholar: {
    color: '#8E8E93',
    fontSize: 18,
    textAlign: 'center',
  },
  controls: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    color: '#8E8E93',
    fontSize: 12,
    width: 70,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
    height: 40,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 32,
  },
  secondaryButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  speedButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  speedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  nextButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
});
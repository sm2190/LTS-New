import { create } from 'zustand';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

interface PlayerState {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  currentTrack: AudioTrack | null;
  isLoading: boolean;
  isBuffering: boolean;
  error: string | null;
  downloadProgress: { [key: string]: number };
}

interface AudioTrack {
  id: string;
  title: string;
  scholar: string;
  url: string;
  duration: string;
  isDownloaded?: boolean;
  localUri?: string;
}

interface PlayerStore extends PlayerState {
  initializeAudio: (track: AudioTrack) => Promise<void>;
  playPause: () => Promise<void>;
  seek: (position: number) => Promise<void>;
  setPlaybackSpeed: (speed: number) => Promise<void>;
  downloadTrack: (track: AudioTrack) => Promise<void>;
  deleteDownload: (track: AudioTrack) => Promise<void>;
  cleanup: () => Promise<void>;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  sound: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  playbackSpeed: 1.0,
  currentTrack: null,
  isLoading: false,
  isBuffering: false,
  error: null,
  downloadProgress: {},

  initializeAudio: async (track: AudioTrack) => {
    try {
      const { sound: currentSound } = get();
      set({ isLoading: true, error: null });

      // Unload previous sound if exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }

      // Configure audio session
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      // Handle Archive.org URLs properly
      let audioUrl = track.url;
      
      // Use local URI if downloaded
      if (track.isDownloaded && track.localUri) {
        audioUrl = track.localUri;
      }
      
      console.log('Loading audio from URL:', audioUrl);

      // Create and load the sound
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        (status) => {
          if (status.isLoaded) {
            set({
              currentTime: status.positionMillis,
              duration: status.durationMillis || 0,
              isBuffering: status.isBuffering,
            });
          }
        }
      );

      await sound.setProgressUpdateIntervalAsync(1000);

      set({
        sound,
        currentTrack: track,
        isLoading: false,
        duration: status.durationMillis || 0,
      });

      // Start playing
      await sound.playAsync();
      set({ isPlaying: true });
    } catch (error) {
      console.error('Audio initialization error:', error);
      set({ 
        error: 'Failed to load audio. Please try again.',
        isLoading: false 
      });
    }
  },

  playPause: async () => {
    try {
      const { sound, isPlaying } = get();
      if (!sound) return;

      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      set({ isPlaying: !isPlaying });
    } catch (error) {
      console.error('Playback error:', error);
      set({ error: 'Playback failed. Please try again.' });
    }
  },

  seek: async (position: number) => {
    try {
      const { sound } = get();
      if (!sound) return;

      await sound.setPositionAsync(position);
      set({ currentTime: position });
    } catch (error) {
      console.error('Seek error:', error);
      set({ error: 'Failed to seek. Please try again.' });
    }
  },

  setPlaybackSpeed: async (speed: number) => {
    try {
      const { sound } = get();
      if (!sound) return;

      await sound.setRateAsync(speed, true);
      set({ playbackSpeed: speed });
    } catch (error) {
      console.error('Playback speed error:', error);
      set({ error: 'Failed to change playback speed.' });
    }
  },

  downloadTrack: async (track: AudioTrack) => {
    try {
      const downloadDir = `${FileSystem.documentDirectory}lectures/`;
      const fileUri = `${downloadDir}${track.id}.mp3`;

      // Create directory if it doesn't exist
      await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });

      // Start download
      const downloadResumable = FileSystem.createDownloadResumable(
        track.url,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          set((state) => ({
            downloadProgress: {
              ...state.downloadProgress,
              [track.id]: progress,
            },
          }));
        }
      );

      const result = await downloadResumable.downloadAsync();
      if (result?.uri) {
        return result.uri;
      }
    } catch (error) {
      console.error('Download error:', error);
      set({ error: 'Download failed. Please try again.' });
    }
  },

  deleteDownload: async (track: AudioTrack) => {
    try {
      if (track.localUri) {
        await FileSystem.deleteAsync(track.localUri);
        set((state) => ({
          downloadProgress: {
            ...state.downloadProgress,
            [track.id]: 0,
          },
        }));
      }
    } catch (error) {
      console.error('Delete error:', error);
      set({ error: 'Failed to delete download.' });
    }
  },

  cleanup: async () => {
    try {
      const { sound } = get();
      if (sound) {
        await sound.unloadAsync();
      }
      set({
        sound: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        currentTrack: null,
        error: null,
      });
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  },
}));

export default usePlayerStore;
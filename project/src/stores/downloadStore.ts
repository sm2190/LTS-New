import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';
import LZString from 'lz-string';
import { DownloadState, DownloadStatus } from '../types/audio';

const ENCRYPTION_KEY = 'your-secure-key-here'; // In production, use a secure key management system
const DOWNLOADS_DIR = `${FileSystem.documentDirectory}downloads/`;

interface DownloadStore {
  downloads: DownloadState;
  downloadAudio: (id: string, url: string) => Promise<void>;
  deleteDownload: (id: string) => Promise<void>;
  getDownloadStatus: (id: string) => DownloadStatus;
  getDecryptedAudioUrl: (id: string) => Promise<string | null>;
}

// Ensure downloads directory exists
FileSystem.makeDirectoryAsync(DOWNLOADS_DIR, { intermediates: true })
  .catch(console.error);

const useDownloadStore = create<DownloadStore>()(
  persist(
    (set, get) => ({
      downloads: {},

      downloadAudio: async (id: string, url: string) => {
        try {
          const tempFileUri = `${DOWNLOADS_DIR}temp_${id}.mp3`;
          const encryptedFileUri = `${DOWNLOADS_DIR}${id}.enc`;
          
          // Download to temporary file
          const downloadResumable = FileSystem.createDownloadResumable(
            url,
            tempFileUri,
            {},
            (downloadProgress) => {
              const progress = downloadProgress.totalBytesWritten / 
                downloadProgress.totalBytesExpectedToWrite;
              
              set((state) => ({
                downloads: {
                  ...state.downloads,
                  [id]: {
                    isDownloaded: false,
                    progress,
                    localUri: encryptedFileUri,
                  },
                },
              }));
            }
          );

          // Start download
          const result = await downloadResumable.downloadAsync();
          
          if (result?.uri) {
            // Read the downloaded file
            const fileContent = await FileSystem.readAsStringAsync(result.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            // Compress the content
            const compressed = LZString.compressToBase64(fileContent);

            // Encrypt the compressed content
            const encrypted = CryptoJS.AES.encrypt(compressed, ENCRYPTION_KEY).toString();

            // Write encrypted file
            await FileSystem.writeAsStringAsync(encryptedFileUri, encrypted);

            // Delete temporary file
            await FileSystem.deleteAsync(tempFileUri);

            set((state) => ({
              downloads: {
                ...state.downloads,
                [id]: {
                  isDownloaded: true,
                  progress: 1,
                  localUri: encryptedFileUri,
                },
              },
            }));
          }
        } catch (error) {
          console.error('Download failed:', error);
          set((state) => {
            const { [id]: removed, ...rest } = state.downloads;
            return { downloads: rest };
          });
        }
      },

      deleteDownload: async (id: string) => {
        const { downloads } = get();
        const download = downloads[id];

        if (download?.localUri) {
          try {
            await FileSystem.deleteAsync(download.localUri);
            set((state) => {
              const { [id]: removed, ...rest } = state.downloads;
              return { downloads: rest };
            });
          } catch (error) {
            console.error('Delete failed:', error);
          }
        }
      },

      getDownloadStatus: (id: string) => {
        const { downloads } = get();
        return (
          downloads[id] || {
            isDownloaded: false,
            progress: 0,
          }
        );
      },

      getDecryptedAudioUrl: async (id: string) => {
        const { downloads } = get();
        const download = downloads[id];

        if (!download?.localUri || !download.isDownloaded) {
          return null;
        }

        try {
          // Read encrypted file
          const encrypted = await FileSystem.readAsStringAsync(download.localUri);

          // Decrypt content
          const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

          // Decompress content
          const decompressed = LZString.decompressFromBase64(decrypted);

          // Create temporary file for playback
          const tempPlaybackUri = `${DOWNLOADS_DIR}temp_playback_${id}.mp3`;
          await FileSystem.writeAsStringAsync(tempPlaybackUri, decompressed, {
            encoding: FileSystem.EncodingType.Base64,
          });

          return tempPlaybackUri;
        } catch (error) {
          console.error('Decryption failed:', error);
          return null;
        }
      },
    }),
    {
      name: 'downloads-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useDownloadStore;
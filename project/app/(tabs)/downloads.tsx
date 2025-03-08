import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const DOWNLOADED_LECTURES = [
  {
    id: '1',
    title: 'Tafsir Surah Al-Fatiha - Part 1',
    scholar: 'Sheikh Ibn Uthaymeen',
    size: '45.2 MB',
    duration: '45:30',
  },
  {
    id: '2',
    title: 'Understanding Salah - Basics',
    scholar: 'Sheikh Al-Albani',
    size: '32.8 MB',
    duration: '32:15',
  },
];

export default function DownloadsScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderDownloadItem = ({ item }) => (
    <Pressable style={styles.downloadItem}>
      <View style={styles.lectureInfo}>
        <Text style={styles.lectureTitle}>{item.title}</Text>
        <Text style={styles.lectureScholar}>{item.scholar}</Text>
        <Text style={styles.lectureSize}>{item.size}</Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.duration}>{item.duration}</Text>
        <Pressable onPress={() => setIsPlaying(!isPlaying)}>
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={32} 
            color="#4CAF50" 
          />
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Downloads</Text>
        <View style={styles.storageInfo}>
          <Ionicons name="phone-portrait-outline" size={20} color="#8E8E93" />
          <Text style={styles.storageText}>78.0 MB used</Text>
        </View>
      </View>

      {DOWNLOADED_LECTURES.length > 0 ? (
        <FlatList
          data={DOWNLOADED_LECTURES}
          renderItem={renderDownloadItem}
          contentContainerStyle={styles.downloadsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="download" size={48} color="#8E8E93" />
          <Text style={styles.emptyStateText}>No downloads yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Downloaded lectures will appear here
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  storageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  storageText: {
    color: '#8E8E93',
    marginLeft: 8,
    fontSize: 14,
  },
  downloadsList: {
    paddingHorizontal: 20,
  },
  downloadItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  lectureInfo: {
    flex: 1,
  },
  lectureTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  lectureScholar: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  lectureSize: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    color: '#8E8E93',
    marginRight: 12,
  },
  deleteButton: {
    marginLeft: 16,
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const FEATURED_SCHOLARS = [
  {
    id: '1',
    name: 'Sheikh Ibn Uthaymeen',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
    series: ['Tafsir Series', 'Fiqh Series', 'Aqeedah Series'],
  },
  {
    id: '2',
    name: 'Sheikh Al-Albani',
    image: 'https://images.unsplash.com/photo-1552233707-a3185320d9a8?w=800&q=80',
    series: ['Hadith Series', 'Fiqh Series'],
  },
];

const RECENT_LECTURES = [
  {
    id: '1',
    title: 'Tafsir Surah Al-Fatiha',
    scholar: 'Sheikh Ibn Uthaymeen',
    duration: '45:30',
  },
  {
    id: '2',
    title: 'Understanding Salah',
    scholar: 'Sheikh Al-Albani',
    duration: '32:15',
  },
];

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderScholarItem = ({ item }) => (
    <Link href={`/scholar/${item.id}`} asChild>
      <Pressable style={styles.scholarCard}>
        <Image source={{ uri: item.image }} style={styles.scholarImage} />
        <Text style={styles.scholarName}>{item.name}</Text>
        <Text style={styles.seriesCount}>{item.series.length} Series</Text>
      </Pressable>
    </Link>
  );

  const renderLectureItem = ({ item }) => (
    <Pressable style={styles.lectureItem}>
      <View style={styles.lectureInfo}>
        <Text style={styles.lectureTitle}>{item.title}</Text>
        <Text style={styles.lectureScholar}>{item.scholar}</Text>
      </View>
      <View style={styles.lectureControls}>
        <Text style={styles.lectureDuration}>{item.duration}</Text>
        <Pressable onPress={() => setIsPlaying(!isPlaying)}>
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={32} 
            color="#4CAF50" 
          />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Islamic Lectures</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Scholars</Text>
        <FlatList
          data={FEATURED_SCHOLARS}
          renderItem={renderScholarItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scholarsList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Lectures</Text>
        <FlatList
          data={RECENT_LECTURES}
          renderItem={renderLectureItem}
          contentContainerStyle={styles.lecturesList}
        />
      </View>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 15,
  },
  scholarsList: {
    paddingHorizontal: 20,
  },
  scholarCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scholarImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  scholarName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  seriesCount: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  lecturesList: {
    paddingHorizontal: 20,
  },
  lectureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
  lectureControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lectureDuration: {
    color: '#8E8E93',
    marginRight: 12,
  },
});
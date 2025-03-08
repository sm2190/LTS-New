import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ibnUthaymeen } from '../../../../src/data/scholars/ibnUthaymeen';
import { AudioLecture } from '../../../../src/types/content';
import usePlayerStore from '../../../../src/stores/playerStore';

export default function SeriesScreen() {
  const { id, seriesId } = useLocalSearchParams();

  // Find the series in all categories and subcategories
  const findSeries = () => {
    for (const category of ibnUthaymeen.categories) {
      if (category.subCategories) {
        for (const subCategory of category.subCategories) {
          const series = subCategory.series.find((s) => s.id === seriesId);
          if (series) return series;
        }
      }
      if (category.series) {
        const series = category.series.find((s) => s.id === seriesId);
        if (series) return series;
      }
    }
    return null;
  };

  const series = findSeries();
  const initializeAudio = usePlayerStore((state) => state.initializeAudio);

  const playLecture = async (lecture: AudioLecture) => {
    try {
      console.log('Playing lecture:', lecture.title, 'URL:', lecture.url);
      await initializeAudio({
        id: lecture.id,
        title: lecture.title,
        scholar: ibnUthaymeen.name,
        url: lecture.url,
        duration: lecture.duration,
      });
    } catch (error) {
      console.error('Failed to play lecture:', error);
    }
  };

  const renderLectureItem = ({ item }: { item: AudioLecture }) => (
    <Pressable style={styles.lectureItem} onPress={() => playLecture(item)}>
      <View style={styles.lectureInfo}>
        <Text style={styles.lectureTitle}>{item.title}</Text>
        <Text style={styles.lectureDuration}>{item.duration}</Text>
        {item.description && (
          <Text style={styles.lectureDescription}>{item.description}</Text>
        )}
      </View>
      <Ionicons name="play-circle" size={32} color="#4CAF50" />
    </Pressable>
  );

  if (!series) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.push(`/scholar/${id}`)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Series not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push(`/scholar/${id}`)}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>{series.title}</Text>
      </View>

      <FlatList
        data={series.lectures}
        renderItem={renderLectureItem}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  list: {
    padding: 20,
  },
  lectureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  lectureInfo: {
    flex: 1,
    marginRight: 16,
  },
  lectureTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  lectureDuration: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  lectureDescription: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
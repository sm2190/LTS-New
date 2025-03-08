import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ibnUthaymeen } from '../../../../src/data/scholars/ibnUthaymeen';
import { Series } from '../../../../src/types/content';

export default function SubCategoryScreen() {
  const { id, subcategoryId } = useLocalSearchParams();

  const findSubCategory = () => {
    for (const category of ibnUthaymeen.categories) {
      if (category.subCategories) {
        const subCategory = category.subCategories.find(
          (sc) => sc.id === subcategoryId
        );
        if (subCategory) return subCategory;
      }
    }
    return null;
  };

  const subCategory = findSubCategory();

  const renderSeriesItem = ({ item }: { item: Series }) => (
    <Pressable
      style={styles.seriesItem}
      onPress={() => router.push(`/scholar/${id}/series/${item.id}`)}>
      <View style={styles.seriesInfo}>
        <Text style={styles.seriesTitle}>{item.title}</Text>
        <Text style={styles.lectureCount}>
          {item.lectures.length} Lectures
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
    </Pressable>
  );

  if (!subCategory) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.push(`/scholar/${id}`)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Subcategory not found</Text>
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
        <Text style={styles.title}>{subCategory.title}</Text>
      </View>

      <FlatList
        data={subCategory.series}
        renderItem={renderSeriesItem}
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
  seriesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  seriesInfo: {
    flex: 1,
  },
  seriesTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  lectureCount: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
});
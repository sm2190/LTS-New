import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ibnUthaymeen } from '../../../src/data/scholars/ibnUthaymeen';
import { Category } from '../../../src/types/content';

export default function ScholarScreen() {
  const { id } = useLocalSearchParams();

  // For now, we only have Ibn Uthaymeen's data
  const scholar = ibnUthaymeen;

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <Pressable
      style={styles.categoryItem}
      onPress={() => router.push(`/scholar/${id}/category/${item.id}`)}>
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon as any} size={24} color="#4CAF50" />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryCount}>
          {item.subCategories
            ? `${item.subCategories.length} Collections`
            : `${item.series?.length} Series`}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>{scholar.name}</Text>
      </View>

      <FlatList
        data={scholar.categories}
        renderItem={renderCategoryItem}
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
  },
  list: {
    padding: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#2C2C2E',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  categoryCount: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
});
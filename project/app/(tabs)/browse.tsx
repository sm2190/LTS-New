import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  {
    id: '1',
    title: 'Tafsir',
    icon: 'book',
  },
  {
    id: '2',
    title: 'Fiqh',
    icon: 'school',
  },
  {
    id: '3',
    title: 'Aqeedah',
    icon: 'heart',
  },
  {
    id: '4',
    title: 'Hadith',
    icon: 'document-text',
  },
];

const SCHOLARS = [
  {
    id: '1',
    name: 'Sheikh Ibn Uthaymeen',
    lectureCount: 245,
  },
  {
    id: '2',
    name: 'Sheikh Al-Albani',
    lectureCount: 189,
  },
  {
    id: '3',
    name: 'Sheikh Ibn Baz',
    lectureCount: 167,
  },
];

export default function BrowseScreen() {
  const renderCategoryItem = ({ item }) => (
    <Pressable style={styles.categoryCard}>
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon} size={24} color="#4CAF50" />
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderScholarItem = ({ item }) => (
    <Pressable style={styles.scholarItem}>
      <View style={styles.scholarInfo}>
        <Text style={styles.scholarName}>{item.name}</Text>
        <Text style={styles.lectureCount}>{item.lectureCount} lectures</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scholars</Text>
        <FlatList
          data={SCHOLARS}
          renderItem={renderScholarItem}
          contentContainerStyle={styles.scholarsList}
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
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: 120,
    height: 120,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#2C2C2E',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  scholarsList: {
    paddingHorizontal: 20,
  },
  scholarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  scholarInfo: {
    flex: 1,
  },
  scholarName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  lectureCount: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
});
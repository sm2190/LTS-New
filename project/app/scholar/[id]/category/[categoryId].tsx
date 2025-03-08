import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ibnUthaymeen } from '../../../../src/data/scholars/ibnUthaymeen';
import { Series, SubCategory } from '../../../../src/types/content';

export default function CategoryScreen() {
  const { id, categoryId } = useLocalSearchParams();

  const category = ibnUthaymeen.categories.find((c) => c.id === categoryId);
  const items = category?.subCategories || category?.series || [];

  const renderItem = ({ item }: { item: SubCategory | Series }) => {
    const isSubCategory = 'series' in item;
    const count = isSubCategory ? item.series.length : item.lectures.length;
    const subtitle = isSubCategory ? 'Series' : 'Lectures';

    return (
      <Pressable
        style={styles.item}
        onPress={() =>
          isSubCategory
            ? router.push(`/scholar/${id}/subcategory/${item.id}`)
            : router.push(`/scholar/${id}/series/${item.id}`)
        }>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemCount}>
            {count} {subtitle}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
      </Pressable>
    );
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.push(`/scholar/${id}`)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Category not found</Text>
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
        <Text style={styles.title}>{category.title}</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  itemCount: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
});
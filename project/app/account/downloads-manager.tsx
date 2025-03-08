import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function DownloadsManagerScreen() {
  const [storageUsed, setStorageUsed] = useState(78.0); // MB
  const [totalStorage, setTotalStorage] = useState(1024); // MB
  
  const downloadCategories = [
    {
      id: 'tafsir',
      name: 'Tafsir',
      size: 45.2,
      count: 12,
    },
    {
      id: 'fiqh',
      name: 'Fiqh',
      size: 22.8,
      count: 8,
    },
    {
      id: 'aqeedah',
      name: 'Aqeedah',
      size: 10.0,
      count: 3,
    },
  ];

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Downloads',
      'Are you sure you want to delete all downloaded lectures? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would delete all downloads
            setStorageUsed(0);
            Alert.alert('Success', 'All downloads have been cleared');
          }
        }
      ]
    );
  };

  const handleClearCategory = (category) => {
    Alert.alert(
      `Clear ${category.name} Downloads`,
      `Are you sure you want to delete all ${category.name} lectures? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would delete category downloads
            setStorageUsed(prev => Math.max(0, prev - category.size));
            Alert.alert('Success', `${category.name} downloads have been cleared`);
          }
        }
      ]
    );
  };

  const getStoragePercentage = () => {
    return (storageUsed / totalStorage) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Downloads Manager</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.storageCard}>
          <View style={styles.storageInfo}>
            <Text style={styles.storageTitle}>Storage Used</Text>
            <Text style={styles.storageValue}>
              {storageUsed.toFixed(1)} MB <Text style={styles.storageTotal}>of {totalStorage} MB</Text>
            </Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${getStoragePercentage()}%` }
              ]} 
            />
          </View>
          
          <Pressable 
            style={[styles.clearButton, storageUsed === 0 && styles.disabledButton]}
            onPress={handleClearAll}
            disabled={storageUsed === 0}
          >
            <Text style={styles.clearButtonText}>Clear All Downloads</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Downloaded Categories</Text>
        
        {downloadCategories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDetails}>
                {category.count} lectures · {category.size.toFixed(1)} MB
              </Text>
            </View>
            <View style={styles.categoryActions}>
              <Pressable 
                style={styles.viewButton}
                onPress={() => router.push(`/account/downloads-category/${category.id}`)}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </Pressable>
              <Pressable 
                style={styles.categoryDeleteButton}
                onPress={() => handleClearCategory(category)}
              >
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              </Pressable>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Download Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Download Quality</Text>
            <Text style={styles.settingValue}>Standard</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Download Location</Text>
            <Text style={styles.settingValue}>Internal Storage</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Auto-Delete After Listening</Text>
            <Text style={styles.settingValue}>Off</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>

        <Text style={styles.disclaimer}>
          Downloaded content is for personal use only and subject to our Terms of Service. Downloaded lectures will be available offline for as long as you maintain an active subscription.
        </Text>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  storageCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  storageInfo: {
    marginBottom: 12,
  },
  storageTitle: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 4,
  },
  storageValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  storageTotal: {
    color: '#8E8E93',
    fontWeight: 'normal',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#2C2C2E',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  clearButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDetails: {
    color: '#8E8E93',
    fontSize: 14,
  },
  categoryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  viewButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryDeleteButton: {
    padding: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  disclaimer: {
    color: '#8E8E93',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
});
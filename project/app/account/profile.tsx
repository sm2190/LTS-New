import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/auth';
import ProfileInitials from '../../src/components/ProfileInitials';
import { supabase } from '../../src/lib/supabase';

export default function ProfileScreen() {
  const { user, refreshSession } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata;
      setName(metadata?.full_name || 'User');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name }
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        await refreshSession();
        Alert.alert('Success', 'Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    router.push('/account');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={handleBackNavigation}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Edit Profile</Text>
        {isEditing ? (
          <Pressable 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.saveButtonText}>Saving...</Text>
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </Pressable>
        ) : (
          <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={24} color="#4CAF50" />
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <ProfileInitials name={name} size={120} fontSize={40} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={email}
            editable={false}
            keyboardType="email-address"
          />
          <Text style={styles.helperText}>Email cannot be changed</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Subscription</Text>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionText}>Premium</Text>
            <Pressable 
              style={styles.manageButton}
              onPress={() => router.push('/account/subscription')}
            >
              <Text style={styles.manageButtonText}>Manage</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Account Created</Text>
          <Text style={styles.staticText}>
            {user ? new Date(user.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Loading...'}
           </Text>
        </View>

        {isEditing && (
          <Pressable style={styles.changePasswordButton} onPress={() => router.push('/account/change-password')}>
            <Text style={styles.changePasswordText}>Change Password</Text>
          </Pressable>
        )}
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
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginLeft: 8,
  },
  editButton: {
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  disabledInput: {
    opacity: 0.7,
  },
  helperText: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  staticText: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
  },
  subscriptionText: {
    color: '#fff',
    fontSize: 16,
  },
  manageButton: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  manageButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  changePasswordButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  changePasswordText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
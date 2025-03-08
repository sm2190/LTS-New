import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { useAuth } from '../../src/context/auth';
import { useState, useEffect } from 'react';
import ProfileInitials from '../../src/components/ProfileInitials';

export default function AccountScreen() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    joinedDate: 'January 2023',
    subscription: 'Free',
  });

  useEffect(() => {
    if (user) {
      // Get user metadata
      const metadata = user.user_metadata;
      const fullName = metadata?.full_name || 'User';
      const createdAt = new Date(user.created_at);
      const joinedMonth = createdAt.toLocaleString('default', { month: 'long' });
      const joinedYear = createdAt.getFullYear();

      setUserData({
        name: fullName,
        email: user.email || 'No email',
        joinedDate: `${joinedMonth} ${joinedYear}`,
        subscription: 'Premium', // This would come from your subscription system
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'Edit Profile',
      icon: 'person',
      route: '/account/profile',
    },
    {
      id: 'subscription',
      title: 'Subscription',
      icon: 'card',
      route: '/account/subscription',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications',
      route: '/account/notifications',
    },
    {
      id: 'downloads',
      title: 'Downloads Manager',
      icon: 'download',
      route: '/account/downloads-manager',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle',
      route: '/account/help',
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'shield',
      route: '/account/privacy',
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: 'document-text',
      route: '/account/terms',
    },
  ];

  const socialItems = [
    {
      id: 'instagram',
      title: 'Instagram',
      icon: 'logo-instagram',
      action: () => Alert.alert('Instagram', 'Would open Instagram profile'),
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      icon: 'logo-tiktok',
      action: () => Alert.alert('TikTok', 'Would open TikTok profile'),
    },
    {
      id: 'youtube',
      title: 'YouTube',
      icon: 'logo-youtube',
      action: () => Alert.alert('YouTube', 'Would open YouTube channel'),
    },
  ];

  const renderMenuItem = (item) => (
    <Pressable 
      key={item.id}
      style={styles.menuItem}
      onPress={() => router.push(item.route)}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={20} color="#4CAF50" />
        </View>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
    </Pressable>
  );

  const renderSocialItem = (item) => (
    <Pressable 
      key={item.id}
      style={styles.socialItem}
      onPress={item.action}
    >
      <Ionicons name={item.icon} size={24} color="#4CAF50" />
      <Text style={styles.socialItemTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
        <Pressable 
          style={styles.settingsButton}
          onPress={() => router.push('/account/settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.profileCard}>
        <ProfileInitials name={userData.name} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <View style={styles.subscriptionBadge}>
            <Text style={styles.subscriptionText}>{userData.subscription}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map(renderMenuItem)}
      </View>

      <View style={styles.socialSection}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialContainer}>
          {socialItems.map(renderSocialItem)}
        </View>
      </View>

      <Pressable 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Islamic Lectures App v1.0.0</Text>
        <Pressable onPress={() => Alert.alert('Delete Account', 'Are you sure you want to delete your account?')}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </Pressable>
      </View>
    </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 8,
  },
  subscriptionBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  subscriptionText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemTitle: {
    color: '#fff',
    fontSize: 16,
  },
  socialSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialItem: {
    alignItems: 'center',
    width: '30%',
  },
  socialItemTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#1C1C1E',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 8,
  },
  deleteAccountText: {
    color: '#FF3B30',
    fontSize: 14,
  },
});
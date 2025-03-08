import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [autoDownload, setAutoDownload] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [highQualityAudio, setHighQualityAudio] = useState(false);

  const renderSettingItem = ({ icon, title, value, onValueChange, type = 'switch' }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#4CAF50" style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#3A3A3C', true: '#4CAF50' }}
          thumbColor={value ? '#fff' : '#fff'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        {renderSettingItem({
          icon: 'download',
          title: 'Auto-download on Wi-Fi',
          value: autoDownload,
          onValueChange: setAutoDownload,
        })}
        {renderSettingItem({
          icon: 'moon',
          title: 'Dark Mode',
          value: darkMode,
          onValueChange: setDarkMode,
        })}
        {renderSettingItem({
          icon: 'notifications',
          title: 'Push Notifications',
          value: notifications,
          onValueChange: setNotifications,
        })}
        {renderSettingItem({
          icon: 'play-circle',
          title: 'Auto-play Next Lecture',
          value: autoPlay,
          onValueChange: setAutoPlay,
        })}
        {renderSettingItem({
          icon: 'musical-notes',
          title: 'High Quality Audio',
          value: highQualityAudio,
          onValueChange: setHighQualityAudio,
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="trash" size={24} color="#FF3B30" style={styles.settingIcon} />
            <Text style={[styles.settingTitle, { color: '#FF3B30' }]}>Clear Downloads</Text>
          </View>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="save" size={24} color="#4CAF50" style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Download Location</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Playback</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="speedometer" size={24} color="#4CAF50" style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Default Playback Speed</Text>
          </View>
          <Text style={styles.settingValue}>1.0x</Text>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="timer" size={24} color="#4CAF50" style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Sleep Timer</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={24} color="#4CAF50" style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Version 1.0.0</Text>
          </View>
        </Pressable>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#1C1C1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
  },
  settingValue: {
    color: '#8E8E93',
    fontSize: 16,
  },
});
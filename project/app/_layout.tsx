import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AudioPlayer from '../src/components/AudioPlayer';
import { View } from 'react-native';
import { AuthProvider } from '../src/context/auth';
import { AuthGuard } from '../src/components/AuthGuard';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="account" />
          <Stack.Screen name="scholar" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <AudioPlayer />
      </View>
    </AuthProvider>
  );
}
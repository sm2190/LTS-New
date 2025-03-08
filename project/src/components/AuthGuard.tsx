import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../context/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    
    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/auth/login');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace('/');
    }
  }, [session, loading, segments]);

  return <>{children}</>;
}
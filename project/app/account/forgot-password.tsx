import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    // In a real app, this would call an API to send a reset password email
    setIsSubmitted(true);
  };

  const handleResend = () => {
    // In a real app, this would call an API to resend the reset password email
    Alert.alert('Success', 'Password reset email has been resent');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account/change-password')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      <ScrollView style={styles.content}>
        {!isSubmitted ? (
          <>
            <Text style={styles.description}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError('');
                }}
                placeholder="Enter your email"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Reset Link</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={64} color="#4CAF50" />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successDescription}>
              We've sent a password reset link to {email}. Please check your email and follow the instructions to reset your password.
            </Text>
            <Pressable style={styles.resendButton} onPress={handleResend}>
              <Text style={styles.resendButtonText}>Resend Email</Text>
            </Pressable>
            <Pressable style={styles.backToLoginButton} onPress={() => router.push('/account')}>
              <Text style={styles.backToLoginText}>Back to Account</Text>
            </Pressable>
          </View>
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
  description: {
    color: '#8E8E93',
    fontSize: 16,
    lineHeight: 24,
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
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  successDescription: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  resendButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  resendButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLoginButton: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  backToLoginText: {
    color: '#8E8E93',
    fontSize: 16,
  },
});
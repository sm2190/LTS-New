import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = () => {
    if (validateForm()) {
      // In a real app, this would call an API to change the password
      Alert.alert(
        'Success',
        'Your password has been changed successfully',
        [{ text: 'OK', onPress: () => router.push('/account') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account/profile')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Change Password</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Create a new password that is at least 8 characters long. A strong password contains a mix of letters, numbers, and symbols.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#8E8E93"
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <Ionicons
                name={showCurrentPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#8E8E93"
              />
            </Pressable>
          </View>
          {errors.currentPassword ? (
            <Text style={styles.errorText}>{errors.currentPassword}</Text>
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#8E8E93"
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}>
              <Ionicons
                name={showNewPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#8E8E93"
              />
            </Pressable>
          </View>
          {errors.newPassword ? (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#8E8E93"
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#8E8E93"
              />
            </Pressable>
          </View>
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        <Pressable
          style={styles.changePasswordButton}
          onPress={handleChangePassword}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </Pressable>

        <Pressable
          style={styles.forgotPasswordButton}
          onPress={() => router.push('/account/forgot-password')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 8,
  },
  changePasswordButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  changePasswordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});
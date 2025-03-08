import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileInitialsProps {
  name: string;
  size?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
}

export default function ProfileInitials({
  name,
  size = 70,
  fontSize = 24,
  backgroundColor = '#4CAF50',
  textColor = '#FFFFFF',
}: ProfileInitialsProps) {
  const getInitials = (name: string) => {
    if (!name) return '?';
    
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize, color: textColor }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});
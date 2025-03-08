import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: February 24, 2025</Text>
        
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to the Islamic Lectures App. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you use our application and tell you about your privacy rights.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Data We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </Text>
        <Text style={styles.bulletPoint}>• Identity Data: includes username, email address</Text>
        <Text style={styles.bulletPoint}>• Technical Data: includes device information, IP address</Text>
        <Text style={styles.bulletPoint}>• Usage Data: includes information about how you use our application</Text>
        <Text style={styles.bulletPoint}>• Preference Data: includes your preferences in receiving marketing from us</Text>
        
        <Text style={styles.sectionTitle}>3. How We Use Your Data</Text>
        <Text style={styles.paragraph}>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </Text>
        <Text style={styles.bulletPoint}>• To register you as a new user</Text>
        <Text style={styles.bulletPoint}>• To provide and improve our services</Text>
        <Text style={styles.bulletPoint}>• To manage our relationship with you</Text>
        <Text style={styles.bulletPoint}>• To personalize your experience</Text>
        
        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </Text>
        
        <Text style={styles.sectionTitle}>5. Data Retention</Text>
        <Text style={styles.paragraph}>
          We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </Text>
        
        <Text style={styles.sectionTitle}>6. Your Legal Rights</Text>
        <Text style={styles.paragraph}>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
        </Text>
        <Text style={styles.bulletPoint}>• Request access to your personal data</Text>
        <Text style={styles.bulletPoint}>• Request correction of your personal data</Text>
        <Text style={styles.bulletPoint}>• Request erasure of your personal data</Text>
        <Text style={styles.bulletPoint}>• Object to processing of your personal data</Text>
        <Text style={styles.bulletPoint}>• Request restriction of processing your personal data</Text>
        <Text style={styles.bulletPoint}>• Request transfer of your personal data</Text>
        <Text style={styles.bulletPoint}>• Right to withdraw consent</Text>
        
        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
        </Text>
        <Text style={styles.contactInfo}>Email: privacy@islamiclectures.app</Text>
        <Text style={styles.contactInfo}>Address: 123 Islamic Center, Riyadh, Saudi Arabia</Text>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Islamic Lectures App. All rights reserved.</Text>
        </View>
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
  lastUpdated: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  bulletPoint: {
    color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 15,
    marginBottom: 5,
  },
  contactInfo: {
    color: '#4CAF50',
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});
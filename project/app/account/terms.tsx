import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TermsOfServiceScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Terms of Service</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: February 24, 2025</Text>
        
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using the Islamic Lectures App, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this app.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to temporarily download one copy of the materials (information or software) on Islamic Lectures App for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </Text>
        <Text style={styles.bulletPoint}>• Modify or copy the materials</Text>
        <Text style={styles.bulletPoint}>• Use the materials for any commercial purpose</Text>
        <Text style={styles.bulletPoint}>• Attempt to decompile or reverse engineer any software contained in Islamic Lectures App</Text>
        <Text style={styles.bulletPoint}>• Remove any copyright or other proprietary notations from the materials</Text>
        <Text style={styles.bulletPoint}>• Transfer the materials to another person or "mirror" the materials on any other server</Text>
        
        <Text style={styles.sectionTitle}>3. Disclaimer</Text>
        <Text style={styles.paragraph}>
          The materials on Islamic Lectures App are provided on an 'as is' basis. Islamic Lectures App makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Text>
        
        <Text style={styles.sectionTitle}>4. Limitations</Text>
        <Text style={styles.paragraph}>
          In no event shall Islamic Lectures App or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Islamic Lectures App, even if Islamic Lectures App or a Islamic Lectures App authorized representative has been notified orally or in writing of the possibility of such damage.
        </Text>
        
        <Text style={styles.sectionTitle}>5. Accuracy of Materials</Text>
        <Text style={styles.paragraph}>
          The materials appearing on Islamic Lectures App could include technical, typographical, or photographic errors. Islamic Lectures App does not warrant that any of the materials on its app are accurate, complete or current. Islamic Lectures App may make changes to the materials contained on its app at any time without notice.
        </Text>
        
        <Text style={styles.sectionTitle}>6. Links</Text>
        <Text style={styles.paragraph}>
          Islamic Lectures App has not reviewed all of the sites linked to its app and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Islamic Lectures App of the site. Use of any such linked website is at the user's own risk.
        </Text>
        
        <Text style={styles.sectionTitle}>7. Modifications</Text>
        <Text style={styles.paragraph}>
          Islamic Lectures App may revise these terms of service for its app at any time without notice. By using this app you are agreeing to be bound by the then current version of these terms of service.
        </Text>
        
        <Text style={styles.sectionTitle}>8. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms and conditions are governed by and construed in accordance with the laws of Saudi Arabia and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </Text>
        
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
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqItems = [
    {
      question: 'How do I download lectures for offline listening?',
      answer: 'To download a lecture, navigate to the lecture page and tap the download icon. Downloaded lectures will be available in the Downloads tab.',
    },
    {
      question: 'Can I listen to lectures in the background?',
      answer: 'Yes, the app supports background playback. You can continue listening while using other apps or when your screen is locked.',
    },
    {
      question: 'How do I change the playback speed?',
      answer: 'While playing a lecture, tap on the speed button in the player controls to cycle through available playback speeds.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription by going to Account > Subscription > Cancel Subscription. Your subscription will remain active until the end of the current billing period.',
    },
    {
      question: 'What happens to my downloads if I cancel my subscription?',
      answer: 'If you cancel your Premium subscription, you will lose access to downloaded lectures at the end of your billing period.',
    },
  ];

  const filteredFaqs = searchQuery
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  const renderFaqItem = ({ question, answer }, index) => (
    <Pressable 
      key={index}
      style={styles.faqItem}
      onPress={() => {}}
    >
      <View style={styles.faqQuestion}>
        <Text style={styles.questionText}>{question}</Text>
        <Ionicons name="chevron-down" size={20} color="#8E8E93" />
      </View>
      <Text style={styles.answerText}>{answer}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/account')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help"
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.supportOptions}>
          <Pressable style={styles.supportOption}>
            <View style={styles.supportIconContainer}>
              <Ionicons name="mail" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.supportOptionText}>Contact Support</Text>
          </Pressable>
          <Pressable style={styles.supportOption}>
            <View style={styles.supportIconContainer}>
              <Ionicons name="chatbubbles" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.supportOptionText}>Live Chat</Text>
          </Pressable>
          <Pressable style={styles.supportOption}>
            <View style={styles.supportIconContainer}>
              <Ionicons name="book" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.supportOptionText}>User Guide</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(renderFaqItem)
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={48} color="#8E8E93" />
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>Try different keywords or contact support</Text>
          </View>
        )}

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactDescription}>
            Our support team is available 24/7 to assist you with any questions or issues.
          </Text>
          <Pressable style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </Pressable>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
  },
  supportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  supportOption: {
    alignItems: 'center',
    width: '30%',
  },
  supportIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  supportOptionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  answerText: {
    color: '#8E8E93',
    fontSize: 14,
    lineHeight: 20,
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
  },
  contactContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  contactTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactDescription: {
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
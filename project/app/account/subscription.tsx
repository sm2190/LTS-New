import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SubscriptionScreen() {
  const currentPlan = 'premium';
  
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Access to selected lectures',
        'Standard audio quality',
        'Ad-supported experience',
        'No offline downloads',
      ],
      isPopular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$4.99',
      period: 'month',
      features: [
        'Access to all lectures',
        'High quality audio',
        'Ad-free experience',
        'Unlimited offline downloads',
        'Background playback',
        'Sleep timer',
      ],
      isPopular: true,
    },
    {
      id: 'premium-yearly',
      name: 'Premium Yearly',
      price: '$49.99',
      period: 'year',
      features: [
        'All Premium features',
        'Save 16% compared to monthly',
        'Priority customer support',
      ],
      isPopular: false,
    },
  ];

  const renderPlanCard = (plan) => (
    <View 
      key={plan.id} 
      style={[
        styles.planCard, 
        currentPlan === plan.id && styles.currentPlanCard
      ]}
    >
      {plan.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>Most Popular</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planPeriod}>/{plan.period}</Text>
        </View>
      </View>
      
      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.featureIcon} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      {currentPlan === plan.id ? (
        <View style={styles.currentPlanButton}>
          <Text style={styles.currentPlanButtonText}>Current Plan</Text>
        </View>
      ) : (
        <Pressable style={styles.selectPlanButton}>
          <Text style={styles.selectPlanButtonText}>Select Plan</Text>
        </Pressable>
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
        <Text style={styles.title}>Subscription</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.subscriptionInfo}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80' }}
            style={styles.subscriptionImage}
          />
          <View style={styles.subscriptionDetails}>
            <Text style={styles.subscriptionTitle}>Premium Subscription</Text>
            <Text style={styles.subscriptionDescription}>
              Your subscription renews on March 24, 2025
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Benefits</Text>
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconContainer}>
              <Ionicons name="download" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.benefitText}>Unlimited Downloads</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconContainer}>
              <Ionicons name="musical-notes" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.benefitText}>High Quality Audio</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconContainer}>
              <Ionicons name="library" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.benefitText}>Full Library Access</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconContainer}>
              <Ionicons name="moon" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.benefitText}>Sleep Timer</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Plans</Text>
        {plans.map(renderPlanCard)}

        <View style={styles.actionsContainer}>
          <Pressable style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
          </Pressable>
          <Pressable style={styles.billingButton}>
            <Text style={styles.billingButtonText}>Billing History</Text>
          </Pressable>
        </View>

        <Text style={styles.disclaimer}>
          Subscriptions will automatically renew unless canceled at least 24 hours before the end of the current period. You can manage your subscriptions in your account settings.
        </Text>
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
  subscriptionInfo: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  subscriptionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  subscriptionDetails: {
    flex: 1,
  },
  subscriptionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subscriptionDescription: {
    color: '#8E8E93',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  benefitItem: {
    width: '48%',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  benefitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  currentPlanCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  planPeriod: {
    color: '#8E8E93',
    fontSize: 16,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  selectPlanButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  selectPlanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  currentPlanButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  currentPlanButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  billingButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  billingButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    color: '#8E8E93',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
});
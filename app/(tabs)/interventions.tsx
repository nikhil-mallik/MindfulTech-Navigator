import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BreathingExercise } from '@/components/BreathingExercise';
import { MindfulnessPrompt } from '@/components/MindfulnessPrompt';
import { SocialConnection } from '@/components/SocialConnection';
import { Heart, Wind, Users, Sparkles } from 'lucide-react-native';

export default function InterventionsTab() {
  const [activeIntervention, setActiveIntervention] = useState<string | null>(null);

  const interventions = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Calm your mind with guided breathing',
      icon: Wind,
      color: '#0EA5E9',
      component: BreathingExercise,
    },
    {
      id: 'mindfulness',
      title: 'Mindful Moment',
      description: 'Take a pause for reflection',
      icon: Sparkles,
      color: '#8B5CF6',
      component: MindfulnessPrompt,
    },
    {
      id: 'social',
      title: 'Connect & Share',
      description: 'Reach out to someone you care about',
      icon: Users,
      color: '#10B981',
      component: SocialConnection,
    },
  ];

  const ActiveComponent = interventions.find(i => i.id === activeIntervention)?.component;

  if (ActiveComponent) {
    return (
      <SafeAreaView style={styles.container}>
        <ActiveComponent onClose={() => setActiveIntervention(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FEF3F2', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Heart size={32} color="#DC2626" />
          <Text style={styles.title}>Wellness Tools</Text>
          <Text style={styles.subtitle}>Choose your mindful intervention</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.interventionsList}>
          {interventions.map((intervention) => {
            const IconComponent = intervention.icon;
            return (
              <TouchableOpacity
                key={intervention.id}
                style={styles.interventionCard}
                onPress={() => setActiveIntervention(intervention.id)}
                activeOpacity={0.7}>
                <LinearGradient
                  colors={[intervention.color + '10', intervention.color + '05']}
                  style={styles.cardGradient}>
                  <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: intervention.color + '20' }]}>
                      <IconComponent size={24} color={intervention.color} />
                    </View>
                    <Text style={styles.cardTitle}>{intervention.title}</Text>
                    <Text style={styles.cardDescription}>{intervention.description}</Text>
                    <View style={[styles.startButton, { backgroundColor: intervention.color }]}>
                      <Text style={styles.startButtonText}>Start</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Pro Tip</Text>
          <Text style={styles.tipText}>
            Regular micro-interventions throughout your day can significantly improve your digital wellness. 
            Try setting up automatic reminders for optimal results.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  interventionsList: {
    marginBottom: 20,
  },
  interventionCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  startButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});
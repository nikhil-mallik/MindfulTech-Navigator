import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { WellnessScore } from '@/components/WellnessScore';
import { BehaviorInsights } from '@/components/BehaviorInsights';
import { TrendChart } from '@/components/TrendChart';

const { width } = Dimensions.get('window');

export default function DashboardTab() {
  const [wellnessData, setWellnessData] = useState({
    score: 78,
    screenTime: '4h 23m',
    mindfulBreaks: 8,
    interventions: 12,
    positiveContent: 85,
  });

  const [weeklyTrend, setWeeklyTrend] = useState([
    { day: 'Mon', score: 72 },
    { day: 'Tue', score: 75 },
    { day: 'Wed', score: 68 },
    { day: 'Thu', score: 82 },
    { day: 'Fri', score: 78 },
    { day: 'Sat', score: 85 },
    { day: 'Sun', score: 78 },
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setWellnessData(prev => ({
        ...prev,
        score: Math.max(0, Math.min(100, prev.score + (Math.random() - 0.5) * 4)),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleTrendChartPress = () => {
    router.push('/insights');
  };

  const handleInsightPress = (insight: any) => {
    router.push('/insights');
  };

  const handleViewAllInsights = () => {
    router.push('/insights');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning! 🌱</Text>
          <Text style={styles.subtitle}>Your digital wellness journey</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <WellnessScore score={wellnessData.score} />
        
        <View style={styles.metricsGrid}>
          <AnalyticsCard
            title="Screen Time"
            value={wellnessData.screenTime}
            change="-23m"
            positive={true}
            icon="Clock"
          />
          <AnalyticsCard
            title="Mindful Breaks"
            value={wellnessData.mindfulBreaks}
            change="+3"
            positive={true}
            icon="Coffee"
          />
          <AnalyticsCard
            title="Interventions"
            value={wellnessData.interventions}
            change="+5"
            positive={true}
            icon="Shield"
          />
          <AnalyticsCard
            title="Positive Content"
            value={`${wellnessData.positiveContent}%`}
            change="+12%"
            positive={true}
            icon="Heart"
          />
        </View>

        <TrendChart 
          data={weeklyTrend} 
          onPress={handleTrendChartPress}
        />
        
        <BehaviorInsights 
          onInsightPress={handleInsightPress}
          onViewAllPress={handleViewAllInsights}
        />
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
    paddingVertical: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});
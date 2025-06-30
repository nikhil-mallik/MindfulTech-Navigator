import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, TrendingUp, Clock, Target, ArrowLeft, Filter } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function InsightsTab() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const detailedInsights = [
    {
      id: 'progress',
      type: 'positive',
      title: 'Mindful Break Improvement',
      description: 'You took 3 more mindful breaks today compared to yesterday',
      impact: 'High',
      confidence: 92,
      trend: '+15%',
      recommendations: [
        'Continue this positive trend',
        'Set reminders for consistent breaks',
        'Try extending break duration to 5 minutes'
      ],
      timeframe: 'Last 24 hours',
      category: 'Wellness Habits'
    },
    {
      id: 'evening-usage',
      type: 'warning',
      title: 'Late Night Screen Time Pattern',
      description: 'Screen time increased by 45 minutes after 9 PM over the past week',
      impact: 'Medium',
      confidence: 87,
      trend: '+45min',
      recommendations: [
        'Enable night mode after 8 PM',
        'Set up a digital sunset routine',
        'Try reading or meditation before bed'
      ],
      timeframe: 'Last 7 days',
      category: 'Sleep Health'
    },
    {
      id: 'stress-pattern',
      type: 'info',
      title: 'Stress-Related Usage Correlation',
      description: 'Social media usage increases by 60% on high-stress days',
      impact: 'High',
      confidence: 94,
      trend: '+60%',
      recommendations: [
        'Use breathing exercises during stress',
        'Schedule nature breaks on busy days',
        'Practice mindful social media consumption'
      ],
      timeframe: 'Last 30 days',
      category: 'Behavioral Patterns'
    },
    {
      id: 'focus-improvement',
      type: 'positive',
      title: 'Focus Session Success',
      description: 'Your focus sessions have improved by 25% in duration',
      impact: 'High',
      confidence: 89,
      trend: '+25%',
      recommendations: [
        'Gradually increase session length',
        'Try different focus techniques',
        'Reward yourself for consistency'
      ],
      timeframe: 'Last 14 days',
      category: 'Productivity'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Insights' },
    { id: 'positive', label: 'Positive' },
    { id: 'warning', label: 'Needs Attention' },
    { id: 'info', label: 'Patterns' }
  ];

  const filteredInsights = selectedFilter === 'all' 
    ? detailedInsights 
    : detailedInsights.filter(insight => insight.type === selectedFilter);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F3E8FF', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Brain size={32} color="#8B5CF6" />
            <Text style={styles.title}>Detailed Insights</Text>
            <Text style={styles.subtitle}>AI-powered behavior analysis</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.activeFilterButton
              ]}
              onPress={() => setSelectedFilter(filter.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.activeFilterText
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredInsights.map((insight) => (
          <View key={insight.id} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <View style={styles.insightTitleRow}>
                <View style={[
                  styles.typeIndicator, 
                  { backgroundColor: getInsightColor(insight.type) + '20' }
                ]}>
                  <View style={[
                    styles.typeDot,
                    { backgroundColor: getInsightColor(insight.type) }
                  ]} />
                </View>
                <Text style={styles.insightTitle}>{insight.title}</Text>
              </View>
              <View style={styles.metricsBadge}>
                <Text style={[styles.trend, { color: getInsightColor(insight.type) }]}>
                  {insight.trend}
                </Text>
              </View>
            </View>

            <Text style={styles.insightDescription}>{insight.description}</Text>

            <View style={styles.insightMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Confidence</Text>
                <View style={styles.confidenceBar}>
                  <View 
                    style={[
                      styles.confidenceFill,
                      { 
                        width: `${insight.confidence}%`,
                        backgroundColor: getInsightColor(insight.type)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.metricValue}>{insight.confidence}%</Text>
              </View>
              
              <View style={styles.metricRow}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Impact</Text>
                  <Text style={[
                    styles.impactBadge,
                    { 
                      backgroundColor: getImpactColor(insight.impact) + '20',
                      color: getImpactColor(insight.impact)
                    }
                  ]}>
                    {insight.impact}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Timeframe</Text>
                  <Text style={styles.metricValue}>{insight.timeframe}</Text>
                </View>
              </View>
            </View>

            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>Recommendations</Text>
              {insight.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <View style={styles.recommendationBullet} />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>

            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{insight.category}</Text>
            </View>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📊 Weekly Summary</Text>
          <Text style={styles.summaryText}>
            Based on your patterns, you're making excellent progress in mindfulness practices. 
            Focus on maintaining consistent evening routines to optimize your digital wellness journey.
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
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  filtersContainer: {
    paddingVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  insightCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  metricsBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trend: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  insightMetrics: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metricItem: {
    flex: 1,
    marginRight: 16,
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  confidenceBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginVertical: 4,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  impactBadge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  recommendationsSection: {
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  recommendationBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8B5CF6',
    marginTop: 8,
    marginRight: 8,
  },
  recommendationText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    flex: 1,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: '#ECFDF5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
  },
});
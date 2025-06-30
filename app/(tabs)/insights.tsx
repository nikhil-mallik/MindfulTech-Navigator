import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, TrendingUp, Clock, Target, ArrowLeft, Filter, Sparkles, RefreshCw } from 'lucide-react-native';
import { router } from 'expo-router';
import { aiAnalysisService, generatePersonalizedRecommendations } from '@/services/aiAnalysis';

const { width } = Dimensions.get('window');

export default function InsightsTab() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Responsive layout calculations
  const getResponsiveLayout = () => {
    if (width > 768) {
      // Desktop/Tablet
      return {
        containerPadding: 24,
        headerPadding: 24,
        fontSize: {
          title: 28,
          subtitle: 18,
          sectionTitle: 20,
          cardTitle: 18,
          cardText: 16,
          small: 14,
        },
        spacing: {
          section: 32,
          card: 20,
          element: 16,
        },
        cardPadding: 24,
      };
    } else if (width > 480) {
      // Large mobile
      return {
        containerPadding: 20,
        headerPadding: 20,
        fontSize: {
          title: 24,
          subtitle: 16,
          sectionTitle: 18,
          cardTitle: 16,
          cardText: 14,
          small: 12,
        },
        spacing: {
          section: 24,
          card: 16,
          element: 12,
        },
        cardPadding: 20,
      };
    } else if (width > 360) {
      // Medium mobile
      return {
        containerPadding: 16,
        headerPadding: 16,
        fontSize: {
          title: 22,
          subtitle: 15,
          sectionTitle: 16,
          cardTitle: 15,
          cardText: 13,
          small: 11,
        },
        spacing: {
          section: 20,
          card: 14,
          element: 10,
        },
        cardPadding: 16,
      };
    } else {
      // Small mobile
      return {
        containerPadding: 14,
        headerPadding: 14,
        fontSize: {
          title: 20,
          subtitle: 14,
          sectionTitle: 15,
          cardTitle: 14,
          cardText: 12,
          small: 10,
        },
        spacing: {
          section: 16,
          card: 12,
          element: 8,
        },
        cardPadding: 14,
      };
    }
  };

  const layout = getResponsiveLayout();

  const detailedInsights = [
    {
      id: 'ai-stress-correlation',
      type: 'warning',
      title: 'AI-Detected Stress-Usage Pattern',
      description: 'Machine learning analysis identified 73% correlation between calendar stress events and increased social media usage, particularly on Mondays and Thursdays.',
      impact: 'High',
      confidence: 87,
      trend: '+73%',
      recommendations: [
        'Schedule preemptive breathing breaks before stressful meetings',
        'Use app timers during high-stress periods identified by AI',
        'Practice the 5-4-3-2-1 grounding technique when stress patterns emerge'
      ],
      timeframe: 'Last 30 days',
      category: 'AI Behavioral Analysis',
      aiGenerated: true,
      dataPoints: 156
    },
    {
      id: 'ai-optimal-timing',
      type: 'info',
      title: 'Neural Network Timing Optimization',
      description: 'Deep learning models predict 2:30 PM as your peak stress time with 91% accuracy. Interventions are 40% more effective when deployed 15 minutes prior.',
      impact: 'High',
      confidence: 91,
      trend: '+40%',
      recommendations: [
        'Set automatic mindful break reminders for 2:15 PM',
        'Schedule important tasks before 2:00 PM when possible',
        'Use AI-recommended breathing exercises during this window'
      ],
      timeframe: 'Last 14 days',
      category: 'Predictive Analytics',
      aiGenerated: true,
      dataPoints: 89
    },
    {
      id: 'mindfulness-progress',
      type: 'positive',
      title: 'AI-Measured Mindfulness Efficacy',
      description: 'Deep learning analysis shows your breathing exercises are 34% more effective than baseline. Heart rate variability improved by 23% during afternoon sessions.',
      impact: 'High',
      confidence: 94,
      trend: '+34%',
      recommendations: [
        'Continue afternoon breathing practice schedule',
        'Gradually increase session duration to 7 minutes as suggested by AI',
        'Experiment with 4-7-8 breathing pattern for enhanced results'
      ],
      timeframe: 'Last 21 days',
      category: 'Performance Optimization',
      aiGenerated: true,
      dataPoints: 67
    },
    {
      id: 'evening-usage',
      type: 'warning',
      title: 'Late Night Screen Time Pattern',
      description: 'Traditional analysis shows screen time increased by 45 minutes after 9 PM over the past week',
      impact: 'Medium',
      confidence: 87,
      trend: '+45min',
      recommendations: [
        'Enable night mode after 8 PM',
        'Set up a digital sunset routine',
        'Try reading or meditation before bed'
      ],
      timeframe: 'Last 7 days',
      category: 'Sleep Health',
      aiGenerated: false,
      dataPoints: 42
    },
    {
      id: 'ai-social-prediction',
      type: 'positive',
      title: 'Social Connection Impact Prediction',
      description: 'Predictive modeling suggests reaching out to close contacts during low-mood periods increases wellness scores by 28% within 2 hours.',
      impact: 'Medium',
      confidence: 82,
      trend: '+28%',
      recommendations: [
        'Maintain a list of 3-5 trusted contacts for difficult moments',
        'Use voice calls over text messages for stronger connection',
        'Schedule regular check-ins with important relationships'
      ],
      timeframe: 'Last 45 days',
      category: 'Social Wellness AI',
      aiGenerated: true,
      dataPoints: 43
    }
  ];

  useEffect(() => {
    loadAIRecommendations();
  }, []);

  const loadAIRecommendations = async () => {
    setIsLoadingAI(true);
    try {
      const recommendations = await generatePersonalizedRecommendations({});
      setAiRecommendations(recommendations);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load AI recommendations:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const refreshAIAnalysis = async () => {
    await loadAIRecommendations();
  };

  const filters = [
    { id: 'all', label: 'All Insights' },
    { id: 'positive', label: 'Positive' },
    { id: 'warning', label: 'Needs Attention' },
    { id: 'info', label: 'Patterns' },
    { id: 'ai', label: 'AI Generated' }
  ];

  const filteredInsights = selectedFilter === 'all' 
    ? detailedInsights 
    : selectedFilter === 'ai'
    ? detailedInsights.filter(insight => insight.aiGenerated)
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

  const responsiveStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      paddingHorizontal: layout.containerPadding,
      paddingVertical: layout.headerPadding,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: layout.fontSize.title,
      fontWeight: '700',
      color: '#1F2937',
      marginTop: 8,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: layout.fontSize.subtitle,
      color: '#6B7280',
    },
    aiStatusBar: {
      flexDirection: width > 480 ? 'row' : 'column',
      justifyContent: 'space-between',
      alignItems: width > 480 ? 'center' : 'flex-start',
      paddingHorizontal: layout.containerPadding,
      paddingVertical: 12,
      backgroundColor: '#F0FDF4',
      borderBottomWidth: 1,
      borderBottomColor: '#D1FAE5',
    },
    aiStatusText: {
      fontSize: layout.fontSize.small,
      color: '#065F46',
      marginLeft: 6,
      fontWeight: '500',
    },
    dataPointsText: {
      fontSize: layout.fontSize.small,
      color: '#6B7280',
      fontWeight: '500',
      marginTop: width > 480 ? 0 : 4,
    },
    recommendationsSection: {
      paddingHorizontal: layout.containerPadding,
      paddingVertical: layout.spacing.element,
      backgroundColor: '#FAFAFA',
    },
    recommendationsTitle: {
      fontSize: layout.fontSize.sectionTitle,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: layout.spacing.element,
    },
    recommendationCard: {
      backgroundColor: '#F3E8FF',
      padding: layout.cardPadding,
      borderRadius: 12,
      marginRight: 12,
      width: Math.min(280, width * 0.8),
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    recommendationText: {
      fontSize: layout.fontSize.cardText,
      color: '#7C3AED',
      lineHeight: 18,
      marginLeft: 8,
      flex: 1,
    },
    filtersContent: {
      paddingHorizontal: layout.containerPadding,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      paddingHorizontal: layout.spacing.element,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 12,
    },
    filterText: {
      fontSize: layout.fontSize.cardText,
      fontWeight: '500',
      color: '#374151',
      marginRight: 4,
    },
    content: {
      flex: 1,
      paddingHorizontal: layout.containerPadding,
    },
    insightCard: {
      backgroundColor: '#F9FAFB',
      borderRadius: 16,
      padding: layout.cardPadding,
      marginBottom: layout.spacing.card,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    insightTitle: {
      fontSize: layout.fontSize.cardTitle,
      fontWeight: '600',
      color: '#1F2937',
      flex: 1,
    },
    insightDescription: {
      fontSize: layout.fontSize.cardText,
      color: '#6B7280',
      lineHeight: 20,
      marginBottom: layout.spacing.element,
    },
    metricLabel: {
      fontSize: layout.fontSize.small,
      color: '#9CA3AF',
      fontWeight: '500',
      marginBottom: 4,
    },
    metricValue: {
      fontSize: layout.fontSize.cardText,
      color: '#374151',
      fontWeight: '600',
    },
    recommendationText: {
      fontSize: layout.fontSize.small + 1,
      color: '#6B7280',
      lineHeight: 18,
      flex: 1,
    },
    categoryText: {
      fontSize: layout.fontSize.small,
      color: '#8B5CF6',
      fontWeight: '500',
    },
    timeframeText: {
      fontSize: layout.fontSize.small,
      color: '#9CA3AF',
      fontStyle: 'italic',
    },
    summaryTitle: {
      fontSize: layout.fontSize.sectionTitle,
      fontWeight: '600',
      color: '#065F46',
      marginBottom: 8,
    },
    summaryText: {
      fontSize: layout.fontSize.cardText,
      color: '#065F46',
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={responsiveStyles.container}>
      <LinearGradient
        colors={['#F3E8FF', '#FFFFFF']}
        style={responsiveStyles.header}>
        <View style={responsiveStyles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#8B5CF6" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Brain size={32} color="#8B5CF6" />
            <Text style={responsiveStyles.title}>AI-Powered Insights</Text>
            <Text style={responsiveStyles.subtitle}>Advanced behavioral analysis & predictions</Text>
          </View>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={refreshAIAnalysis}
            activeOpacity={0.7}
            disabled={isLoadingAI}
          >
            {isLoadingAI ? (
              <ActivityIndicator size="small" color="#8B5CF6" />
            ) : (
              <RefreshCw size={20} color="#8B5CF6" />
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* AI Status Bar */}
      <View style={responsiveStyles.aiStatusBar}>
        <View style={styles.aiStatusLeft}>
          <Sparkles size={16} color="#10B981" />
          <Text style={responsiveStyles.aiStatusText}>
            AI Analysis Active • Last updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.aiStatusRight}>
          <Text style={responsiveStyles.dataPointsText}>
            {detailedInsights.reduce((sum, insight) => sum + (insight.dataPoints || 0), 0)} data points
          </Text>
        </View>
      </View>

      {/* AI Recommendations Section */}
      <View style={responsiveStyles.recommendationsSection}>
        <Text style={responsiveStyles.recommendationsTitle}>🤖 Personalized AI Recommendations</Text>
        {isLoadingAI ? (
          <View style={styles.loadingRecommendations}>
            <ActivityIndicator size="small" color="#8B5CF6" />
            <Text style={styles.loadingText}>Generating personalized recommendations...</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.recommendationsContainer}>
              {aiRecommendations.map((recommendation, index) => (
                <View key={index} style={responsiveStyles.recommendationCard}>
                  <Sparkles size={16} color="#8B5CF6" />
                  <Text style={responsiveStyles.recommendationText}>{recommendation}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={responsiveStyles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                responsiveStyles.filterButton,
                selectedFilter === filter.id && styles.activeFilterButton
              ]}
              onPress={() => setSelectedFilter(filter.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                responsiveStyles.filterText,
                selectedFilter === filter.id && styles.activeFilterText
              ]}>
                {filter.label}
              </Text>
              {filter.id === 'ai' && (
                <Sparkles size={12} color={selectedFilter === filter.id ? '#FFFFFF' : '#8B5CF6'} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={responsiveStyles.content} showsVerticalScrollIndicator={false}>
        {filteredInsights.map((insight) => (
          <View key={insight.id} style={responsiveStyles.insightCard}>
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
                <Text style={responsiveStyles.insightTitle}>{insight.title}</Text>
                {insight.aiGenerated && (
                  <View style={styles.aiIndicator}>
                    <Sparkles size={12} color="#8B5CF6" />
                    <Text style={styles.aiIndicatorText}>AI</Text>
                  </View>
                )}
              </View>
              <View style={styles.metricsBadge}>
                <Text style={[styles.trend, { color: getInsightColor(insight.type) }]}>
                  {insight.trend}
                </Text>
              </View>
            </View>

            <Text style={responsiveStyles.insightDescription}>{insight.description}</Text>

            <View style={styles.insightMetrics}>
              <View style={styles.metricItem}>
                <Text style={responsiveStyles.metricLabel}>AI Confidence</Text>
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
                <Text style={responsiveStyles.metricValue}>{insight.confidence}%</Text>
              </View>
              
              <View style={styles.metricRow}>
                <View style={styles.metricItem}>
                  <Text style={responsiveStyles.metricLabel}>Impact</Text>
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
                  <Text style={responsiveStyles.metricLabel}>Data Points</Text>
                  <Text style={responsiveStyles.metricValue}>{insight.dataPoints || 'N/A'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>
                {insight.aiGenerated ? '🤖 AI Recommendations' : '💡 Recommendations'}
              </Text>
              {insight.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <View style={styles.recommendationBullet} />
                  <Text style={responsiveStyles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>

            <View style={styles.insightFooter}>
              <View style={styles.categoryTag}>
                <Text style={responsiveStyles.categoryText}>{insight.category}</Text>
              </View>
              <Text style={responsiveStyles.timeframeText}>{insight.timeframe}</Text>
            </View>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={responsiveStyles.summaryTitle}>🧠 AI Analysis Summary</Text>
          <Text style={responsiveStyles.summaryText}>
            Our machine learning models have analyzed {detailedInsights.reduce((sum, insight) => sum + (insight.dataPoints || 0), 0)} data points 
            from your behavior patterns. The AI has identified key optimization opportunities and predicts significant 
            wellness improvements through targeted interventions. Continue following AI recommendations for optimal results.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  aiStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiStatusRight: {},
  loadingRecommendations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  recommendationsContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  filtersContainer: {
    paddingVertical: 16,
  },
  activeFilterButton: {
    backgroundColor: '#8B5CF6',
  },
  activeFilterText: {
    color: '#FFFFFF',
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
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  aiIndicatorText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B5CF6',
    marginLeft: 4,
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
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  categoryTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  summaryCard: {
    backgroundColor: '#ECFDF5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
});
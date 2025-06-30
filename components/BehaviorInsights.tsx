import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Brain, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Info, ChevronRight } from 'lucide-react-native';

interface BehaviorInsightsProps {
  onInsightPress?: (insight: any) => void;
  onViewAllPress?: () => void;
}

export function BehaviorInsights({ onInsightPress, onViewAllPress }: BehaviorInsightsProps) {
  const insights = [
    {
      id: 'progress',
      type: 'positive',
      icon: CheckCircle,
      title: 'Great Progress!',
      message: 'You took 3 more mindful breaks today compared to yesterday.',
      color: '#10B981',
      actionable: true,
    },
    {
      id: 'evening-usage',
      type: 'warning',
      icon: AlertTriangle,
      title: 'Evening Usage Spike',
      message: 'Screen time increased by 45 minutes after 9 PM. Consider a digital sunset routine.',
      color: '#F59E0B',
      actionable: true,
    },
    {
      id: 'pattern',
      type: 'info',
      icon: Info,
      title: 'Pattern Detected',
      message: 'You tend to use social media more on stressful days. Try our breathing exercises instead.',
      color: '#3B82F6',
      actionable: true,
    },
  ];

  const handleInsightPress = (insight: any) => {
    if (onInsightPress) {
      onInsightPress(insight);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={onViewAllPress}
        activeOpacity={0.7}
      >
        <Brain size={20} color="#8B5CF6" />
        <Text style={styles.title}>AI Behavior Insights</Text>
        <ChevronRight size={16} color="#6B7280" />
      </TouchableOpacity>
      
      <View style={styles.insightsList}>
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <TouchableOpacity
              key={insight.id}
              style={styles.insightCard}
              onPress={() => handleInsightPress(insight)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: insight.color + '20' }]}>
                <IconComponent size={16} color={insight.color} />
              </View>
              <View style={styles.insightContent}>
                <View style={styles.insightHeader}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  {insight.actionable && (
                    <ChevronRight size={14} color="#9CA3AF" />
                  )}
                </View>
                <Text style={styles.insightMessage}>{insight.message}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <TouchableOpacity 
        style={styles.viewAllButton}
        onPress={onViewAllPress}
        activeOpacity={0.7}
      >
        <Text style={styles.viewAllText}>View All Insights</Text>
        <ChevronRight size={16} color="#8B5CF6" />
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by machine learning analysis of your usage patterns
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  insightsList: {
    marginBottom: 16,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  insightMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginRight: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
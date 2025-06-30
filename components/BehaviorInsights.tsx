import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Brain, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Info, ChevronRight, Sparkles } from 'lucide-react-native';

interface BehaviorInsightsProps {
  onInsightPress?: (insight: any) => void;
  onViewAllPress?: () => void;
}

interface AIInsight {
  id: string;
  type: 'positive' | 'warning' | 'info';
  icon: any;
  title: string;
  message: string;
  color: string;
  actionable: boolean;
  confidence: number;
  aiGenerated: boolean;
}

export function BehaviorInsights({ onInsightPress, onViewAllPress }: BehaviorInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateAIInsights();
  }, []);

  const generateAIInsights = async () => {
    setIsLoading(true);
    setIsGenerating(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate AI-generated insights based on user behavior patterns
    const aiInsights: AIInsight[] = [
      {
        id: 'ai-progress',
        type: 'positive',
        icon: CheckCircle,
        title: 'Mindfulness Momentum Detected',
        message: 'AI analysis shows your breathing exercises are 23% more effective in the afternoon. Your heart rate variability improved significantly.',
        color: '#10B981',
        actionable: true,
        confidence: 94,
        aiGenerated: true,
      },
      {
        id: 'ai-pattern',
        type: 'warning',
        icon: AlertTriangle,
        title: 'Stress-Scrolling Pattern Identified',
        message: 'Machine learning detected increased social media usage correlating with calendar stress events. Consider preemptive breathing breaks.',
        color: '#F59E0B',
        actionable: true,
        confidence: 87,
        aiGenerated: true,
      },
      {
        id: 'ai-optimization',
        type: 'info',
        icon: Info,
        title: 'Optimal Break Timing Prediction',
        message: 'Neural network analysis suggests 2:30 PM is your peak stress time. AI recommends scheduling automatic mindful breaks 15 minutes prior.',
        color: '#3B82F6',
        actionable: true,
        confidence: 91,
        aiGenerated: true,
      },
    ];

    setInsights(aiInsights);
    setIsLoading(false);
    setIsGenerating(false);
  };

  const handleInsightPress = (insight: AIInsight) => {
    if (onInsightPress) {
      onInsightPress(insight);
    }
  };

  const handleRegenerateInsights = () => {
    generateAIInsights();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Brain size={20} color="#8B5CF6" />
          <Text style={styles.title}>AI Behavior Insights</Text>
          <ActivityIndicator size="small" color="#8B5CF6" />
        </View>
        
        <View style={styles.loadingContainer}>
          <Sparkles size={32} color="#8B5CF6" />
          <Text style={styles.loadingTitle}>Analyzing Your Patterns</Text>
          <Text style={styles.loadingText}>
            AI is processing your behavior data to generate personalized insights...
          </Text>
          <View style={styles.loadingBar}>
            <View style={styles.loadingProgress} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={onViewAllPress}
        activeOpacity={0.7}
      >
        <Brain size={20} color="#8B5CF6" />
        <Text style={styles.title}>AI Behavior Insights</Text>
        <View style={styles.headerRight}>
          <View style={styles.aiIndicator}>
            <Sparkles size={12} color="#8B5CF6" />
            <Text style={styles.aiText}>AI</Text>
          </View>
          <ChevronRight size={16} color="#6B7280" />
        </View>
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
                  <View style={styles.confidenceContainer}>
                    <Text style={styles.confidenceText}>{insight.confidence}%</Text>
                    <ChevronRight size={14} color="#9CA3AF" />
                  </View>
                </View>
                <Text style={styles.insightMessage}>{insight.message}</Text>
                {insight.aiGenerated && (
                  <View style={styles.aiTag}>
                    <Sparkles size={10} color="#8B5CF6" />
                    <Text style={styles.aiTagText}>AI Generated</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.regenerateButton}
          onPress={handleRegenerateInsights}
          activeOpacity={0.7}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="#8B5CF6" />
          ) : (
            <Sparkles size={16} color="#8B5CF6" />
          )}
          <Text style={styles.regenerateText}>
            {isGenerating ? 'Generating...' : 'Refresh AI Analysis'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={onViewAllPress}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>View Detailed Analysis</Text>
          <ChevronRight size={16} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🤖 Powered by advanced machine learning and behavioral pattern recognition
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  aiText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B5CF6',
    marginLeft: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
    marginRight: 4,
  },
  insightMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8B5CF6',
    marginLeft: 4,
  },
  actionButtons: {
    marginBottom: 16,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  regenerateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
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
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TrendingUp, ChartBar as BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface TrendData {
  day: string;
  score: number;
}

interface TrendChartProps {
  data: TrendData[];
  onPress?: () => void;
}

export function TrendChart({ data, onPress }: TrendChartProps) {
  const chartHeight = 120;
  const maxScore = Math.max(...data.map(d => d.score));
  const chartWidth = width - 80;

  const getResponsiveLayout = () => {
    if (width > 768) {
      // Desktop/Tablet
      return {
        containerPadding: 24,
        chartHeight: 140,
        barWidth: 32,
        fontSize: {
          title: 20,
          day: 14,
          score: 12,
          trend: 16,
        },
      };
    } else if (width > 480) {
      // Large mobile
      return {
        containerPadding: 20,
        chartHeight: 120,
        barWidth: 28,
        fontSize: {
          title: 18,
          day: 12,
          score: 10,
          trend: 14,
        },
      };
    } else {
      // Small mobile
      return {
        containerPadding: 16,
        chartHeight: 100,
        barWidth: 24,
        fontSize: {
          title: 16,
          day: 10,
          score: 9,
          trend: 12,
        },
      };
    }
  };

  const layout = getResponsiveLayout();

  return (
    <TouchableOpacity 
      style={[styles.container, { padding: layout.containerPadding }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <TrendingUp size={20} color="#10B981" />
        <Text style={[styles.title, { fontSize: layout.fontSize.title }]}>
          Weekly Wellness Trend
        </Text>
        <BarChart3 size={16} color="#6B7280" />
      </View>
      
      <View style={styles.chartContainer}>
        <View style={[styles.chartArea, { height: layout.chartHeight }]}>
          {data.map((item, index) => {
            const barHeight = (item.score / maxScore) * layout.chartHeight;
            const isToday = index === data.length - 1;
            
            return (
              <View key={item.day} style={styles.barContainer}>
                <View style={[styles.barBackground, { height: layout.chartHeight }]}>
                  <View
                    style={[
                      styles.bar,
                      { 
                        height: barHeight,
                        width: layout.barWidth,
                        backgroundColor: isToday ? '#10B981' : '#D1FAE5',
                      }
                    ]}
                  />
                </View>
                <Text style={[
                  styles.dayLabel, 
                  { fontSize: layout.fontSize.day },
                  isToday && styles.todayLabel
                ]}>
                  {item.day}
                </Text>
                <Text style={[
                  styles.scoreLabel, 
                  { fontSize: layout.fontSize.score },
                  isToday && styles.todayScore
                ]}>
                  {item.score}
                </Text>
              </View>
            );
          })}
        </View>
        
        <View style={styles.chartFooter}>
          <Text style={[styles.trend, { fontSize: layout.fontSize.trend }]}>
            📈 +6% improvement this week
          </Text>
          <Text style={styles.tapHint}>Tap for detailed insights</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginLeft: 8,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  barBackground: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    borderRadius: 4,
    minHeight: 8,
  },
  dayLabel: {
    color: '#6B7280',
    marginTop: 8,
    fontWeight: '500',
  },
  todayLabel: {
    color: '#10B981',
    fontWeight: '600',
  },
  scoreLabel: {
    color: '#9CA3AF',
    marginTop: 2,
  },
  todayScore: {
    color: '#10B981',
    fontWeight: '600',
  },
  chartFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  trend: {
    color: '#059669',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});
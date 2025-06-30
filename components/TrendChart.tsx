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
  const getResponsiveLayout = () => {
    if (width > 768) {
      // Desktop/Tablet
      return {
        containerPadding: 24,
        chartHeight: 140,
        barWidth: 32,
        spacing: 16,
        fontSize: {
          title: 18,
          day: 12,
          score: 10,
          trend: 14,
        },
      };
    } else if (width > 480) {
      // Large mobile
      return {
        containerPadding: 20,
        chartHeight: 120,
        barWidth: 28,
        spacing: 12,
        fontSize: {
          title: 16,
          day: 11,
          score: 9,
          trend: 13,
        },
      };
    } else if (width > 360) {
      // Medium mobile
      return {
        containerPadding: 16,
        chartHeight: 100,
        barWidth: 24,
        spacing: 8,
        fontSize: {
          title: 15,
          day: 10,
          score: 8,
          trend: 12,
        },
      };
    } else {
      // Small mobile
      return {
        containerPadding: 14,
        chartHeight: 90,
        barWidth: 20,
        spacing: 6,
        fontSize: {
          title: 14,
          day: 9,
          score: 7,
          trend: 11,
        },
      };
    }
  };

  const layout = getResponsiveLayout();
  const maxScore = Math.max(...data.map(d => d.score));

  return (
    <TouchableOpacity 
      style={[styles.container, { padding: layout.containerPadding }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TrendingUp size={18} color="#10B981" />
          <Text style={[styles.title, { fontSize: layout.fontSize.title, marginLeft: 8 }]}>
            Weekly Wellness Trend
          </Text>
        </View>
        <BarChart3 size={14} color="#6B7280" />
      </View>
      
      <View style={[styles.chartContainer, { marginTop: layout.spacing }]}>
        <View style={[styles.chartArea, { height: layout.chartHeight }]}>
          {data.map((item, index) => {
            const barHeight = Math.max((item.score / maxScore) * layout.chartHeight * 0.8, 8);
            const isToday = index === data.length - 1;
            
            return (
              <View key={item.day} style={[styles.barContainer, { marginHorizontal: layout.spacing / 4 }]}>
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
                  { fontSize: layout.fontSize.day, marginTop: 6 },
                  isToday && styles.todayLabel
                ]}>
                  {item.day}
                </Text>
                <Text style={[
                  styles.scoreLabel, 
                  { fontSize: layout.fontSize.score, marginTop: 2 },
                  isToday && styles.todayScore
                ]}>
                  {item.score}
                </Text>
              </View>
            );
          })}
        </View>
        
        <View style={[styles.chartFooter, { marginTop: layout.spacing }]}>
          <Text style={[styles.trend, { fontSize: layout.fontSize.trend }]}>
            📈 +6% improvement this week
          </Text>
          <Text style={[styles.tapHint, { fontSize: Math.max(layout.fontSize.trend - 2, 10) }]}>
            Tap for detailed insights
          </Text>
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: '#1F2937',
    flexShrink: 1,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
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
    fontWeight: '500',
    textAlign: 'center',
  },
  todayLabel: {
    color: '#10B981',
    fontWeight: '600',
  },
  scoreLabel: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  todayScore: {
    color: '#10B981',
    fontWeight: '600',
  },
  chartFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
    width: '100%',
  },
  trend: {
    color: '#059669',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  tapHint: {
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
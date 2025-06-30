import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Coffee, Shield, Heart } from 'lucide-react-native';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
  icon: string;
}

export function AnalyticsCard({ title, value, change, positive, icon }: AnalyticsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'Clock':
        return <Clock size={20} color="#6B7280" />;
      case 'Coffee':
        return <Coffee size={20} color="#6B7280" />;
      case 'Shield':
        return <Shield size={20} color="#6B7280" />;
      case 'Heart':
        return <Heart size={20} color="#6B7280" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {getIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.changeContainer}>
        <Text style={[styles.change, { color: positive ? '#10B981' : '#EF4444' }]}>
          {change}
        </Text>
        <Text style={styles.changeLabel}>vs yesterday</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  changeLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
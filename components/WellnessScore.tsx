import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';

interface WellnessScoreProps {
  score: number;
}

export function WellnessScore({ score }: WellnessScoreProps) {
  const animatedScore = useSharedValue(0);

  useEffect(() => {
    animatedScore.value = withSpring(score, {
      damping: 15,
      stiffness: 100,
    });
  }, [score]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(animatedScore.value, [0, 100], [0, 360]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent wellness!';
    if (score >= 60) return 'Good progress';
    return 'Needs attention';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreCircle}>
        <Animated.View style={[styles.heartContainer, animatedStyle]}>
          <Heart size={32} color={getScoreColor(score)} />
        </Animated.View>
        <Text style={[styles.scoreText, { color: getScoreColor(score) }]}>
          {Math.round(score)}
        </Text>
        <Text style={styles.scoreLabel}>Wellness Score</Text>
        <Text style={[styles.scoreMessage, { color: getScoreColor(score) }]}>
          {getScoreMessage(score)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#E5E7EB',
  },
  heartContainer: {
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  scoreMessage: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
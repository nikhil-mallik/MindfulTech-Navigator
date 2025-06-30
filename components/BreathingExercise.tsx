import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import { X, Play, Pause, RotateCcw } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface BreathingExerciseProps {
  onClose: () => void;
}

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycle, setCycle] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const circleScale = useSharedValue(0.5);
  const circleOpacity = useSharedValue(0.7);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: circleOpacity.value,
  }));

  const breathingCycle = {
    inhale: 4000,  // 4 seconds
    hold: 2000,    // 2 seconds
    exhale: 6000,  // 6 seconds
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      const totalCycleTime = Object.values(breathingCycle).reduce((a, b) => a + b, 0);
      setTimeRemaining(totalCycleTime);
      
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1000) {
            // Start next cycle
            return totalCycleTime;
          }
          return prev - 1000;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      startBreathingAnimation();
    } else {
      stopBreathingAnimation();
    }
  }, [isActive, phase]);

  const startBreathingAnimation = () => {
    const runCycle = () => {
      // Inhale
      setPhase('inhale');
      circleScale.value = withTiming(1, {
        duration: breathingCycle.inhale,
        easing: Easing.inOut(Easing.ease),
      });
      
      setTimeout(() => {
        // Hold
        setPhase('hold');
        setTimeout(() => {
          // Exhale
          setPhase('exhale');
          circleScale.value = withTiming(0.5, {
            duration: breathingCycle.exhale,
            easing: Easing.inOut(Easing.ease),
          });
          
          setTimeout(() => {
            setCycle(prev => prev + 1);
            if (isActive) runCycle();
          }, breathingCycle.exhale);
        }, breathingCycle.hold);
      }, breathingCycle.inhale);
    };
    
    runCycle();
  };

  const stopBreathingAnimation = () => {
    circleScale.value = withTiming(0.5, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handlePlayPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCycle(0);
    setTimeRemaining(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe In';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#10B981';
      case 'hold':
        return '#F59E0B';
      case 'exhale':
        return '#3B82F6';
      default:
        return '#10B981';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F0F9FF', '#FEFEFE']}
        style={styles.background}>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Breathing Exercise</Text>
          <Text style={styles.subtitle}>4-2-6 Breathing Pattern</Text>

          <View style={styles.breathingArea}>
            <Animated.View style={[styles.breathingCircle, animatedStyle]}>
              <LinearGradient
                colors={[getPhaseColor() + '40', getPhaseColor() + '20']}
                style={styles.circleGradient}>
                <View style={styles.innerCircle}>
                  <Text style={[styles.phaseText, { color: getPhaseColor() }]}>
                    {getPhaseInstruction()}
                  </Text>
                  {isActive && (
                    <Text style={styles.timerText}>
                      {Math.ceil(timeRemaining / 1000)}s
                    </Text>
                  )}
                </View>
              </LinearGradient>
            </Animated.View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{cycle}</Text>
              <Text style={styles.statLabel}>Cycles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{Math.ceil(cycle * 12 / 60)}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleReset}
              activeOpacity={0.7}>
              <RotateCcw size={24} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.playButton, { backgroundColor: getPhaseColor() }]}
              onPress={handlePlayPause}
              activeOpacity={0.8}>
              {isActive ? (
                <Pause size={32} color="#FFFFFF" />
              ) : (
                <Play size={32} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            
            <View style={styles.controlButton} />
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>How it works:</Text>
            <Text style={styles.instructionText}>
              • Inhale for 4 seconds{'\n'}
              • Hold for 2 seconds{'\n'}
              • Exhale for 6 seconds{'\n'}
              • Repeat for optimal relaxation
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
  },
  breathingArea: {
    width: width * 0.7,
    height: width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  breathingCircle: {
    width: '100%',
    height: '100%',
  },
  circleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: '70%',
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  instructions: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
  },
});
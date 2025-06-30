import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Slider } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TreePine, Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react-native';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

const { width } = Dimensions.get('window');

export default function NatureTab() {
  const [currentBreak, setCurrentBreak] = useState(0);
  const [audioState, audioControls] = useAudioPlayer();

  const natureBreaks = [
    {
      id: 1,
      title: 'Forest Serenity',
      description: 'Immerse yourself in a peaceful woodland setting',
      image: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '5 min',
      sounds: ['Birds chirping', 'Gentle breeze', 'Rustling leaves'],
      audioUrl: 'https://www.soundjay.com/misc/sounds/forest.mp3', // Placeholder URL
    },
    {
      id: 2,
      title: 'Ocean Waves',
      description: 'Let the rhythmic sound of waves calm your mind',
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '7 min',
      sounds: ['Ocean waves', 'Seagulls', 'Gentle wind'],
      audioUrl: 'https://www.soundjay.com/misc/sounds/ocean.mp3', // Placeholder URL
    },
    {
      id: 3,
      title: 'Mountain Vista',
      description: 'Find peace in the majestic mountain landscape',
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '10 min',
      sounds: ['Alpine wind', 'Distant birds', 'Mountain stream'],
      audioUrl: 'https://www.soundjay.com/misc/sounds/mountain.mp3', // Placeholder URL
    },
    {
      id: 4,
      title: 'Meadow Tranquility',
      description: 'Relax in a sun-drenched wildflower meadow',
      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 min',
      sounds: ['Buzzing bees', 'Gentle breeze', 'Grasshopper chirps'],
      audioUrl: 'https://www.soundjay.com/misc/sounds/meadow.mp3', // Placeholder URL
    },
  ];

  const handlePlayPause = async () => {
    if (audioState.isPlaying) {
      audioControls.pause();
    } else {
      await audioControls.play();
    }
  };

  const handlePrevious = () => {
    const newIndex = currentBreak > 0 ? currentBreak - 1 : natureBreaks.length - 1;
    setCurrentBreak(newIndex);
    audioControls.stop();
  };

  const handleNext = () => {
    const newIndex = currentBreak < natureBreaks.length - 1 ? currentBreak + 1 : 0;
    setCurrentBreak(newIndex);
    audioControls.stop();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentNatureBreak = natureBreaks[currentBreak];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ECFDF5', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TreePine size={32} color="#065F46" />
          <Text style={styles.title}>Nature Breaks</Text>
          <Text style={styles.subtitle}>Reconnect with the natural world</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredBreak}>
          <Image
            source={{ uri: currentNatureBreak.image }}
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>{currentNatureBreak.title}</Text>
              <Text style={styles.featuredDescription}>{currentNatureBreak.description}</Text>
              
              <View style={styles.soundsList}>
                {currentNatureBreak.sounds.map((sound, index) => (
                  <View key={index} style={styles.soundItem}>
                    <Volume2 size={14} color="#FFFFFF" />
                    <Text style={styles.soundText}>{sound}</Text>
                  </View>
                ))}
              </View>

              {/* Audio Progress Bar */}
              {audioState.duration > 0 && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${(audioState.currentTime / audioState.duration) * 100}%` }
                      ]} 
                    />
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(audioState.currentTime)}</Text>
                    <Text style={styles.timeText}>{formatTime(audioState.duration)}</Text>
                  </View>
                </View>
              )}

              {/* Audio Controls */}
              <View style={styles.audioControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handlePrevious}
                  activeOpacity={0.7}>
                  <SkipBack size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayPause}
                  activeOpacity={0.8}
                  disabled={audioState.isLoading}>
                  {audioState.isLoading ? (
                    <Text style={styles.loadingText}>...</Text>
                  ) : audioState.isPlaying ? (
                    <Pause size={24} color="#FFFFFF" />
                  ) : (
                    <Play size={24} color="#FFFFFF" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handleNext}
                  activeOpacity={0.7}>
                  <SkipForward size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Volume Control */}
              <View style={styles.volumeContainer}>
                <Volume2 size={16} color="#FFFFFF" />
                <View style={styles.volumeSlider}>
                  <View style={styles.volumeTrack}>
                    <View 
                      style={[
                        styles.volumeFill,
                        { width: `${audioState.volume * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => audioControls.setVolume(audioState.volume > 0 ? 0 : 1)}
                  activeOpacity={0.7}>
                  <Text style={styles.volumeText}>
                    {Math.round(audioState.volume * 100)}%
                  </Text>
                </TouchableOpacity>
              </View>

              {audioState.error && (
                <Text style={styles.errorText}>{audioState.error}</Text>
              )}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.breaksList}>
          <Text style={styles.sectionTitle}>Choose Your Break</Text>
          <View style={styles.breaksGrid}>
            {natureBreaks.map((natureBreak, index) => (
              <TouchableOpacity
                key={natureBreak.id}
                style={[
                  styles.breakCard,
                  currentBreak === index && styles.activeBreakCard
                ]}
                onPress={() => {
                  setCurrentBreak(index);
                  audioControls.stop();
                }}
                activeOpacity={0.7}>
                <Image
                  source={{ uri: natureBreak.image }}
                  style={styles.breakImage}
                />
                <View style={styles.breakInfo}>
                  <Text style={styles.breakTitle}>{natureBreak.title}</Text>
                  <Text style={styles.breakDuration}>{natureBreak.duration}</Text>
                </View>
                {currentBreak === index && audioState.isPlaying && (
                  <View style={styles.playingIndicator}>
                    <View style={styles.playingDot} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>🌿 Nature Break Benefits</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Reduces stress and anxiety</Text>
            <Text style={styles.benefitItem}>• Improves focus and concentration</Text>
            <Text style={styles.benefitItem}>• Lowers cortisol levels</Text>
            <Text style={styles.benefitItem}>• Enhances creativity</Text>
            <Text style={styles.benefitItem}>• Boosts mood and well-being</Text>
          </View>
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
    paddingVertical: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#065F46',
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  featuredBreak: {
    height: 400,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredContent: {
    alignItems: 'flex-start',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: '#F3F4F6',
    marginBottom: 16,
    lineHeight: 22,
  },
  soundsList: {
    marginBottom: 20,
  },
  soundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  soundText: {
    fontSize: 14,
    color: '#F3F4F6',
    marginLeft: 8,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: '#F3F4F6',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 12,
  },
  volumeTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  volumeText: {
    fontSize: 12,
    color: '#F3F4F6',
    minWidth: 35,
    textAlign: 'right',
  },
  errorText: {
    fontSize: 12,
    color: '#FCA5A5',
    textAlign: 'center',
  },
  breaksList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  breaksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  breakCard: {
    width: (width - 52) / 2,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  activeBreakCard: {
    borderColor: '#10B981',
  },
  breakImage: {
    width: '100%',
    height: 100,
  },
  breakInfo: {
    padding: 12,
  },
  breakTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  breakDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  playingIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  benefitsCard: {
    backgroundColor: '#F0FDF4',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
  },
});
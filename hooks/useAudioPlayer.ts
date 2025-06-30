import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

interface AudioPlayerControls {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
}

export function useAudioPlayer(audioUrl?: string): [AudioPlayerState, AudioPlayerControls] {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web' && audioUrl) {
      // Initialize audio element for web
      audioRef.current = new Audio(audioUrl);
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setState(prev => ({
          ...prev,
          duration: audio.duration,
          isLoading: false,
        }));
      };

      const handleError = () => {
        setState(prev => ({
          ...prev,
          error: 'Failed to load audio',
          isLoading: false,
        }));
      };

      const handleEnded = () => {
        setState(prev => ({
          ...prev,
          isPlaying: false,
          currentTime: 0,
        }));
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('error', handleError);
      audio.addEventListener('ended', handleEnded);

      setState(prev => ({ ...prev, isLoading: true }));

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('ended', handleEnded);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [audioUrl]);

  const startTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setState(prev => ({
          ...prev,
          currentTime: audioRef.current?.currentTime || 0,
        }));
      }
    }, 1000);
  };

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const play = async (): Promise<void> => {
    if (Platform.OS === 'web' && audioRef.current) {
      try {
        await audioRef.current.play();
        setState(prev => ({ ...prev, isPlaying: true, error: null }));
        startTimeTracking();
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to play audio',
          isPlaying: false,
        }));
      }
    } else {
      // For mobile platforms, we'll simulate audio playback
      setState(prev => ({ ...prev, isPlaying: true, duration: 300 })); // 5 minutes
      startTimeTracking();
    }
  };

  const pause = () => {
    if (Platform.OS === 'web' && audioRef.current) {
      audioRef.current.pause();
    }
    setState(prev => ({ ...prev, isPlaying: false }));
    stopTimeTracking();
  };

  const stop = () => {
    if (Platform.OS === 'web' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    stopTimeTracking();
  };

  const setVolume = (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (Platform.OS === 'web' && audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    setState(prev => ({ ...prev, volume: clampedVolume }));
  };

  const seekTo = (time: number) => {
    if (Platform.OS === 'web' && audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setState(prev => ({ ...prev, currentTime: time }));
  };

  return [
    state,
    {
      play,
      pause,
      stop,
      setVolume,
      seekTo,
    },
  ];
}
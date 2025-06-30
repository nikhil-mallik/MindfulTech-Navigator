export interface WellnessMetrics {
  score: number;
  screenTime: string;
  mindfulBreaks: number;
  interventions: number;
  positiveContent: number;
}

export interface TrendData {
  day: string;
  score: number;
}

export interface BehaviorInsight {
  type: 'positive' | 'warning' | 'info';
  title: string;
  message: string;
  color: string;
}

export interface InterventionType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  component: React.ComponentType<any>;
}

export interface NatureBreak {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  sounds: string[];
}

export interface WellnessGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  type: 'daily' | 'weekly' | 'monthly';
}

export interface UserPreferences {
  notifications: boolean;
  smartInterventions: boolean;
  nightMode: boolean;
  soundEnabled: boolean;
  socialReminders: boolean;
  interventionFrequency: 'low' | 'medium' | 'high';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}
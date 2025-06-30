import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, Shield, Target, Smartphone, Users, Moon, Volume2, Clock, ChevronRight, X, Save } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

interface WellnessGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

export default function SettingsTab() {
  const { theme, setNightMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [smartInterventions, setSmartInterventions] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [socialReminders, setSocialReminders] = useState(true);
  const [interventionFrequency, setInterventionFrequency] = useState<'low' | 'medium' | 'high'>('medium');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');
  
  // Modal states
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const [showQuietHoursModal, setShowQuietHoursModal] = useState(false);

  // Wellness goals state
  const [wellnessGoals, setWellnessGoals] = useState<WellnessGoal[]>([
    { id: '1', title: 'Daily Mindful Breaks', target: 10, current: 8, unit: 'breaks' },
    { id: '2', title: 'Screen Time Limit', target: 6, current: 4.5, unit: 'hours' },
    { id: '3', title: 'Breathing Sessions', target: 3, current: 2, unit: 'sessions' },
    { id: '4', title: 'Nature Breaks', target: 2, current: 1, unit: 'breaks' },
  ]);

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    if (value) {
      Alert.alert(
        'Notifications Enabled',
        'You will receive mindful reminders and wellness alerts.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Notifications Disabled',
        'You will no longer receive automatic reminders. You can still access all features manually.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSmartInterventionsToggle = (value: boolean) => {
    setSmartInterventions(value);
    if (value) {
      Alert.alert(
        'Smart Interventions Enabled',
        'AI will analyze your behavior patterns and suggest timely interventions.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSocialRemindersToggle = (value: boolean) => {
    setSocialReminders(value);
    if (value) {
      Alert.alert(
        'Social Reminders Enabled',
        'You will receive gentle prompts to connect with friends and family.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleNightModeToggle = (value: boolean) => {
    setNightMode(value);
    Alert.alert(
      value ? 'Night Mode Enabled' : 'Night Mode Disabled',
      value 
        ? 'Dark theme activated to reduce eye strain and improve sleep quality.'
        : 'Light theme activated for better daytime visibility.',
      [{ text: 'OK' }]
    );
  };

  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value);
    if (!value) {
      Alert.alert(
        'Sound Effects Disabled',
        'Audio feedback for breathing exercises and notifications has been turned off.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleGoalUpdate = (goalId: string, newTarget: number) => {
    setWellnessGoals(goals => 
      goals.map(goal => 
        goal.id === goalId ? { ...goal, target: newTarget } : goal
      )
    );
  };

  const handleFrequencyChange = (frequency: 'low' | 'medium' | 'high') => {
    setInterventionFrequency(frequency);
    setShowFrequencyModal(false);
    
    const messages = {
      low: 'You will receive 2-3 gentle interventions per day.',
      medium: 'You will receive 4-6 balanced interventions per day.',
      high: 'You will receive 7-10 proactive interventions per day.'
    };
    
    Alert.alert(
      'Intervention Frequency Updated',
      messages[frequency],
      [{ text: 'OK' }]
    );
  };

  const handleQuietHoursSave = () => {
    setShowQuietHoursModal(false);
    Alert.alert(
      'Quiet Hours Updated',
      `Interventions will be paused from ${quietHoursStart} to ${quietHoursEnd}.`,
      [{ text: 'OK' }]
    );
  };

  const settingSections = [
    {
      title: 'Interventions',
      icon: Shield,
      items: [
        {
          title: 'Smart Interventions',
          description: 'AI-powered prompts based on your behavior patterns',
          value: smartInterventions,
          onToggle: handleSmartInterventionsToggle,
        },
        {
          title: 'Notifications',
          description: 'Mindful reminders and wellness alerts',
          value: notifications,
          onToggle: handleNotificationToggle,
        },
        {
          title: 'Social Reminders',
          description: 'Prompts to connect with friends and family',
          value: socialReminders,
          onToggle: handleSocialRemindersToggle,
        },
        {
          title: 'Intervention Frequency',
          description: `Currently set to ${interventionFrequency}`,
          isAction: true,
          onPress: () => setShowFrequencyModal(true),
        },
        {
          title: 'Quiet Hours',
          description: quietHoursEnabled ? `${quietHoursStart} - ${quietHoursEnd}` : 'Disabled',
          value: quietHoursEnabled,
          onToggle: setQuietHoursEnabled,
          hasSettings: true,
          onSettingsPress: () => setShowQuietHoursModal(true),
        },
      ],
    },
    {
      title: 'Experience',
      icon: Smartphone,
      items: [
        {
          title: 'Night Mode',
          description: 'Reduce blue light for better sleep',
          value: theme.isDark,
          onToggle: handleNightModeToggle,
        },
        {
          title: 'Sound Effects',
          description: 'Audio feedback for breathing exercises',
          value: soundEnabled,
          onToggle: handleSoundToggle,
        },
      ],
    },
  ];

  const quickActions = [
    {
      title: 'Wellness Goals',
      description: 'Set your daily wellness targets',
      icon: Target,
      color: '#10B981',
      onPress: () => setShowGoalsModal(true),
    },
    {
      title: 'Usage Insights',
      description: 'View detailed behavior analytics',
      icon: Smartphone,
      color: '#0EA5E9',
      onPress: () => router.push('/insights'),
    },
    {
      title: 'Privacy Center',
      description: 'Manage your data and privacy settings',
      icon: Shield,
      color: '#8B5CF6',
      onPress: () => setShowPrivacyModal(true),
    },
  ];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      marginTop: 12,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginLeft: 8,
    },
    settingsCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: 4,
    },
    settingDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    actionCard: {
      width: '48%',
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    actionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 4,
    },
    actionDescription: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 16,
    },
    aboutCard: {
      backgroundColor: theme.isDark ? '#1F2937' : '#F0FDF4',
      padding: 20,
      borderRadius: 16,
      marginBottom: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    aboutTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.isDark ? '#34D399' : '#065F46',
      marginBottom: 12,
    },
    aboutText: {
      fontSize: 14,
      color: theme.isDark ? '#34D399' : '#065F46',
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 12,
    },
    aboutFooter: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      padding: 24,
      width: '90%',
      maxWidth: 400,
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    modalText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <LinearGradient
        colors={theme.isDark ? ['#1F2937', '#111827'] : ['#F8FAFC', '#FFFFFF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Settings size={32} color={theme.colors.textSecondary} />
          <Text style={dynamicStyles.title}>Settings</Text>
          <Text style={dynamicStyles.subtitle}>Customize your wellness experience</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionHeader}>
                <SectionIcon size={20} color={theme.colors.textSecondary} />
                <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
              </View>
              
              <View style={dynamicStyles.settingsCard}>
                {section.items.map((item, itemIndex) => (
                  <View
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < section.items.length - 1 && { 
                        borderBottomWidth: 1, 
                        borderBottomColor: theme.colors.border 
                      },
                    ]}>
                    <View style={styles.settingInfo}>
                      <Text style={dynamicStyles.settingTitle}>{item.title}</Text>
                      <Text style={dynamicStyles.settingDescription}>{item.description}</Text>
                    </View>
                    <View style={styles.settingControls}>
                      {item.isAction ? (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={item.onPress}
                          activeOpacity={0.7}>
                          <ChevronRight size={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                      ) : (
                        <>
                          <Switch
                            value={item.value}
                            onValueChange={item.onToggle}
                            trackColor={{ false: theme.colors.border, true: theme.colors.primary + '40' }}
                            thumbColor={item.value ? theme.colors.primary : theme.colors.surface}
                          />
                          {item.hasSettings && (
                            <TouchableOpacity
                              style={[styles.settingsButton, { marginLeft: 8 }]}
                              onPress={item.onSettingsPress}
                              activeOpacity={0.7}>
                              <Settings size={16} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={20} color={theme.colors.textSecondary} />
            <Text style={dynamicStyles.sectionTitle}>Quick Actions</Text>
          </View>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={dynamicStyles.actionCard}
                  onPress={action.onPress}
                  activeOpacity={0.7}>
                  <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                    <ActionIcon size={24} color={action.color} />
                  </View>
                  <Text style={dynamicStyles.actionTitle}>{action.title}</Text>
                  <Text style={dynamicStyles.actionDescription}>{action.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={dynamicStyles.aboutCard}>
          <Text style={dynamicStyles.aboutTitle}>About MindfulTech Navigator</Text>
          <Text style={dynamicStyles.aboutText}>
            Version 1.0.0{'\n\n'}
            Empowering healthier digital habits through intelligent, non-intrusive interventions 
            and behavioral science.
          </Text>
          <Text style={dynamicStyles.aboutFooter}>
            Built with ❤️ for digital wellness
          </Text>
        </View>
      </ScrollView>

      {/* Wellness Goals Modal */}
      <Modal
        visible={showGoalsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGoalsModal(false)}>
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={dynamicStyles.modalTitle}>Wellness Goals</Text>
              <TouchableOpacity onPress={() => setShowGoalsModal(false)}>
                <X size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {wellnessGoals.map((goal) => (
                <View key={goal.id} style={styles.goalItem}>
                  <Text style={[styles.goalTitle, { color: theme.colors.text }]}>{goal.title}</Text>
                  <View style={styles.goalProgress}>
                    <Text style={[styles.goalCurrent, { color: theme.colors.textSecondary }]}>
                      {goal.current} / {goal.target} {goal.unit}
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }
                        ]} 
                      />
                    </View>
                  </View>
                  <View style={styles.goalControls}>
                    <TouchableOpacity
                      style={styles.goalButton}
                      onPress={() => handleGoalUpdate(goal.id, Math.max(1, goal.target - 1))}>
                      <Text style={styles.goalButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={[styles.goalTarget, { color: theme.colors.text }]}>{goal.target}</Text>
                    <TouchableOpacity
                      style={styles.goalButton}
                      onPress={() => handleGoalUpdate(goal.id, goal.target + 1)}>
                      <Text style={styles.goalButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Intervention Frequency Modal */}
      <Modal
        visible={showFrequencyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFrequencyModal(false)}>
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={dynamicStyles.modalTitle}>Intervention Frequency</Text>
              <TouchableOpacity onPress={() => setShowFrequencyModal(false)}>
                <X size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={dynamicStyles.modalText}>
              Choose how often you'd like to receive mindful interventions throughout your day.
            </Text>
            {(['low', 'medium', 'high'] as const).map((frequency) => (
              <TouchableOpacity
                key={frequency}
                style={[
                  styles.frequencyOption,
                  { 
                    backgroundColor: interventionFrequency === frequency 
                      ? theme.colors.primary + '20' 
                      : theme.colors.surface,
                    borderColor: interventionFrequency === frequency 
                      ? theme.colors.primary 
                      : theme.colors.border
                  }
                ]}
                onPress={() => handleFrequencyChange(frequency)}>
                <Text style={[
                  styles.frequencyTitle,
                  { 
                    color: interventionFrequency === frequency 
                      ? theme.colors.primary 
                      : theme.colors.text 
                  }
                ]}>
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                </Text>
                <Text style={[styles.frequencyDescription, { color: theme.colors.textSecondary }]}>
                  {frequency === 'low' && '2-3 gentle interventions per day'}
                  {frequency === 'medium' && '4-6 balanced interventions per day'}
                  {frequency === 'high' && '7-10 proactive interventions per day'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Quiet Hours Modal */}
      <Modal
        visible={showQuietHoursModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQuietHoursModal(false)}>
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={dynamicStyles.modalTitle}>Quiet Hours</Text>
              <TouchableOpacity onPress={() => setShowQuietHoursModal(false)}>
                <X size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={dynamicStyles.modalText}>
              Set times when you don't want to receive interventions or notifications.
            </Text>
            <View style={styles.timeInputContainer}>
              <View style={styles.timeInput}>
                <Text style={[styles.timeLabel, { color: theme.colors.text }]}>Start Time</Text>
                <TextInput
                  style={[styles.timeField, { 
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border
                  }]}
                  value={quietHoursStart}
                  onChangeText={setQuietHoursStart}
                  placeholder="22:00"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>
              <View style={styles.timeInput}>
                <Text style={[styles.timeLabel, { color: theme.colors.text }]}>End Time</Text>
                <TextInput
                  style={[styles.timeField, { 
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.border
                  }]}
                  value={quietHoursEnd}
                  onChangeText={setQuietHoursEnd}
                  placeholder="07:00"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleQuietHoursSave}>
              <Save size={16} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Quiet Hours</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Privacy Center Modal */}
      <Modal
        visible={showPrivacyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPrivacyModal(false)}>
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={dynamicStyles.modalTitle}>Privacy Center</Text>
              <TouchableOpacity onPress={() => setShowPrivacyModal(false)}>
                <X size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={dynamicStyles.modalText}>
                Your privacy is our priority. Here's how we protect your data:
              </Text>
              <View style={styles.privacySection}>
                <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>🔒 Data Encryption</Text>
                <Text style={[styles.privacyText, { color: theme.colors.textSecondary }]}>
                  All your wellness data is encrypted both in transit and at rest using industry-standard encryption.
                </Text>
              </View>
              <View style={styles.privacySection}>
                <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>🏠 Local Processing</Text>
                <Text style={[styles.privacyText, { color: theme.colors.textSecondary }]}>
                  AI analysis happens locally on your device whenever possible to protect your privacy.
                </Text>
              </View>
              <View style={styles.privacySection}>
                <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>🚫 No Selling</Text>
                <Text style={[styles.privacyText, { color: theme.colors.textSecondary }]}>
                  We never sell your personal data to third parties. Your wellness journey is yours alone.
                </Text>
              </View>
              <View style={styles.privacySection}>
                <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>🗑️ Data Control</Text>
                <Text style={[styles.privacyText, { color: theme.colors.textSecondary }]}>
                  You can export or delete all your data at any time through the app settings.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Usage Insights Modal */}
      <Modal
        visible={showInsightsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInsightsModal(false)}>
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={dynamicStyles.modalTitle}>Usage Insights</Text>
              <TouchableOpacity onPress={() => setShowInsightsModal(false)}>
                <X size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={dynamicStyles.modalText}>
              View detailed analytics about your digital wellness journey, including AI-powered insights and behavioral patterns.
            </Text>
            <TouchableOpacity
              style={[styles.insightsButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                setShowInsightsModal(false);
                router.push('/insights');
              }}>
              <Text style={styles.insightsButtonText}>Open Insights</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
  },
  settingsButton: {
    padding: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalItem: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  goalProgress: {
    marginBottom: 12,
  },
  goalCurrent: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  goalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  goalButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  goalTarget: {
    fontSize: 18,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  frequencyOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  frequencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  frequencyDescription: {
    fontSize: 14,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  timeField: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  privacySection: {
    marginBottom: 16,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  insightsButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  insightsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
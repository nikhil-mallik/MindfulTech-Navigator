import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, Shield, Target, Smartphone, Users, Moon, Volume2 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsTab() {
  const { theme, setNightMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [smartInterventions, setSmartInterventions] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [socialReminders, setSocialReminders] = useState(true);

  const handleNightModeToggle = (value: boolean) => {
    setNightMode(value);
  };

  const settingSections = [
    {
      title: 'Interventions',
      icon: Shield,
      items: [
        {
          title: 'Smart Interventions',
          description: 'AI-powered prompts based on your behavior',
          value: smartInterventions,
          onToggle: setSmartInterventions,
        },
        {
          title: 'Notifications',
          description: 'Mindful reminders and wellness alerts',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          title: 'Social Reminders',
          description: 'Prompts to connect with friends and family',
          value: socialReminders,
          onToggle: setSocialReminders,
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
          onToggle: setSoundEnabled,
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
    },
    {
      title: 'Usage Insights',
      description: 'View detailed behavior analytics',
      icon: Smartphone,
      color: '#0EA5E9',
    },
    {
      title: 'Privacy Center',
      description: 'Manage your data and privacy settings',
      icon: Shield,
      color: '#8B5CF6',
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
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: theme.colors.border, true: theme.colors.primary + '40' }}
                      thumbColor={item.value ? theme.colors.primary : theme.colors.surface}
                    />
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
});
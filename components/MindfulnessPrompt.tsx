import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Sparkles, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface MindfulnessPromptProps {
  onClose: () => void;
}

export function MindfulnessPrompt({ onClose }: MindfulnessPromptProps) {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  const prompts = [
    {
      question: "How are you feeling right now?",
      description: "Take a moment to check in with your emotional state",
      options: [
        "Calm and centered",
        "Energized and focused",
        "Overwhelmed or stressed",
        "Tired but content",
        "Anxious or worried",
        "Grateful and peaceful"
      ]
    },
    {
      question: "What's one thing you're grateful for today?",
      description: "Focusing on gratitude helps shift perspective to the positive",
      options: [
        "My health and well-being",
        "People I care about",
        "A small moment of joy",
        "Progress I've made",
        "Something in nature",
        "A comfortable space"
      ]
    },
    {
      question: "What does your body need right now?",
      description: "Listen to your physical sensations and needs",
      options: [
        "Movement or stretching",
        "Rest and relaxation",
        "Fresh air or sunlight",
        "Hydration or nourishment",
        "A warm embrace",
        "Deep, calm breathing"
      ]
    }
  ];

  const handleResponseSelect = (response: string) => {
    setSelectedResponse(response);
  };

  const handleNext = () => {
    if (selectedResponse) {
      setResponses([...responses, selectedResponse]);
      setSelectedResponse(null);
      
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
      } else {
        // Complete the session
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  const getCurrentPrompt = () => prompts[currentPrompt];
  const isLastPrompt = currentPrompt === prompts.length - 1;
  const isComplete = currentPrompt >= prompts.length;

  // Responsive layout calculations
  const getResponsiveStyles = () => {
    const isTablet = width > 768;
    const isLargePhone = width > 400;
    
    return {
      containerPadding: isTablet ? 40 : 20,
      headerPadding: isTablet ? 40 : 20,
      buttonPadding: isTablet ? 20 : 18,
      fontSize: {
        title: isTablet ? 32 : 28,
        subtitle: isTablet ? 18 : 16,
        question: isTablet ? 26 : 22,
        description: isTablet ? 18 : 16,
        option: isTablet ? 18 : 16,
        button: isTablet ? 20 : 18,
      },
      spacing: {
        section: isTablet ? 40 : 30,
        element: isTablet ? 20 : 16,
      }
    };
  };

  const responsive = getResponsiveStyles();

  if (isComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#F3E8FF', '#FEFEFE']}
          style={styles.background}>
          <View style={[styles.completeContent, { padding: responsive.containerPadding }]}>
            <CheckCircle size={64} color="#8B5CF6" />
            <Text style={[styles.completeTitle, { fontSize: responsive.fontSize.title }]}>
              Mindful Moment Complete
            </Text>
            <Text style={[styles.completeSubtitle, { fontSize: responsive.fontSize.subtitle }]}>
              Thank you for taking time to check in with yourself
            </Text>
            <View style={styles.summaryCard}>
              <Text style={[styles.summaryTitle, { fontSize: responsive.fontSize.description }]}>
                Your Reflection:
              </Text>
              {responses.map((response, index) => (
                <Text key={index} style={[styles.summaryItem, { fontSize: responsive.fontSize.option }]}>
                  • {response}
                </Text>
              ))}
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F3E8FF', '#FEFEFE']}
        style={styles.background}>
        
        <TouchableOpacity 
          style={[styles.closeButton, { top: responsive.headerPadding + 20 }]} 
          onPress={onClose}
        >
          <X size={24} color="#6B7280" />
        </TouchableOpacity>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: responsive.headerPadding + 60 }}
        >
          <View style={[styles.header, { paddingHorizontal: responsive.containerPadding }]}>
            <Sparkles size={32} color="#8B5CF6" />
            <Text style={[styles.title, { fontSize: responsive.fontSize.title }]}>
              Mindful Moment
            </Text>
            <Text style={[styles.subtitle, { fontSize: responsive.fontSize.subtitle }]}>
              Question {currentPrompt + 1} of {prompts.length}
            </Text>
          </View>

          <View style={[styles.progressContainer, { marginHorizontal: responsive.containerPadding }]}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentPrompt + 1) / prompts.length) * 100}%` }
                ]} 
              />
            </View>
          </View>

          <View style={[styles.promptCard, { margin: responsive.containerPadding }]}>
            <Text style={[styles.question, { fontSize: responsive.fontSize.question }]}>
              {getCurrentPrompt().question}
            </Text>
            <Text style={[styles.description, { fontSize: responsive.fontSize.description }]}>
              {getCurrentPrompt().description}
            </Text>
          </View>

          <View style={[styles.optionsContainer, { paddingHorizontal: responsive.containerPadding }]}>
            {getCurrentPrompt().options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { paddingVertical: responsive.buttonPadding },
                  selectedResponse === option && styles.selectedOption
                ]}
                onPress={() => handleResponseSelect(option)}
                activeOpacity={0.7}>
                <Text style={[
                  styles.optionText,
                  { fontSize: responsive.fontSize.option },
                  selectedResponse === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.buttonContainer, { paddingHorizontal: responsive.containerPadding }]}>
            <TouchableOpacity
              style={[
                styles.nextButton,
                { paddingVertical: responsive.buttonPadding },
                !selectedResponse && styles.nextButtonDisabled
              ]}
              onPress={handleNext}
              disabled={!selectedResponse}
              activeOpacity={0.8}>
              <Text style={[
                styles.nextButtonText,
                { fontSize: responsive.fontSize.button },
                !selectedResponse && styles.nextButtonTextDisabled
              ]}>
                {isLastPrompt ? 'Complete' : 'Next'}
              </Text>
              <ArrowRight 
                size={20} 
                color={selectedResponse ? '#FFFFFF' : '#9CA3AF'} 
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    right: 20,
    zIndex: 1000,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  question: {
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 28,
    textAlign: 'center',
  },
  description: {
    color: '#6B7280',
    lineHeight: 22,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  optionText: {
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  selectedOptionText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  nextButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  nextButtonText: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  nextButtonTextDisabled: {
    color: '#9CA3AF',
  },
  completeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeTitle: {
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  completeSubtitle: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
  },
  summaryTitle: {
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryItem: {
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 22,
  },
});
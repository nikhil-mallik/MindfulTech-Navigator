import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Users, MessageCircle, Phone, Mail, Heart, Send } from 'lucide-react-native';

interface SocialConnectionProps {
  onClose: () => void;
}

export function SocialConnection({ onClose }: SocialConnectionProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const connectionActions = [
    {
      id: 'call',
      title: 'Make a Call',
      description: 'Have a voice conversation with someone you care about',
      icon: Phone,
      color: '#10B981',
    },
    {
      id: 'message',
      title: 'Send a Message',
      description: 'Reach out with a thoughtful text or message',
      icon: MessageCircle,
      color: '#3B82F6',
    },
    {
      id: 'email',
      title: 'Write an Email',
      description: 'Send a longer, more detailed message',
      icon: Mail,
      color: '#8B5CF6',
    },
    {
      id: 'gratitude',
      title: 'Express Gratitude',
      description: 'Let someone know you appreciate them',
      icon: Heart,
      color: '#EF4444',
    },
  ];

  const suggestedContacts = [
    'Family Member',
    'Close Friend',
    'Colleague',
    'Mentor',
    'Someone You Miss',
  ];

  const messageTemplates = [
    "Hey! I was just thinking about you and wanted to check in. How are you doing?",
    "I hope you're having a great day! Just wanted to say hi and send some good vibes your way.",
    "I'm grateful to have you in my life. Thank you for being such an amazing person.",
    "I saw something today that reminded me of you and it made me smile. Hope you're well!",
    "Just wanted to reach out and let you know I'm thinking of you. How have you been?"
  ];

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId);
  };

  const handleContactSelect = (contact: string) => {
    setSelectedContact(contact);
  };

  const handleTemplateSelect = (template: string) => {
    setMessage(template);
  };

  const handleSend = () => {
    // In a real app, this would integrate with messaging/calling apps
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (selectedAction === 'message' || selectedAction === 'email' || selectedAction === 'gratitude') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#F0FDF4', '#FEFEFE']}
          style={styles.background}>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Users size={32} color="#10B981" />
              <Text style={styles.title}>
                {selectedAction === 'gratitude' ? 'Express Gratitude' : 
                 selectedAction === 'email' ? 'Write an Email' : 'Send a Message'}
              </Text>
              <Text style={styles.subtitle}>Choose who to connect with</Text>
            </View>

            <View style={styles.contactSelection}>
              <Text style={styles.sectionTitle}>Who would you like to reach out to?</Text>
              <View style={styles.contactButtons}>
                {suggestedContacts.map((contact, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.contactButton,
                      selectedContact === contact && styles.selectedContactButton
                    ]}
                    onPress={() => handleContactSelect(contact)}
                    activeOpacity={0.7}>
                    <Text style={[
                      styles.contactButtonText,
                      selectedContact === contact && styles.selectedContactButtonText
                    ]}>
                      {contact}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.messageSection}>
              <Text style={styles.sectionTitle}>Your message</Text>
              <TextInput
                style={styles.messageInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message here..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              
              <Text style={styles.templateTitle}>Or use a template:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.templatesContainer}>
                  {messageTemplates.map((template, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.templateCard}
                      onPress={() => handleTemplateSelect(template)}
                      activeOpacity={0.7}>
                      <Text style={styles.templateText} numberOfLines={3}>
                        {template}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                (!selectedContact || !message) && styles.sendButtonDisabled
              ]}
              onPress={handleSend}
              disabled={!selectedContact || !message}
              activeOpacity={0.8}>
              <Text style={[
                styles.sendButtonText,
                (!selectedContact || !message) && styles.sendButtonTextDisabled
              ]}>
                Send Message
              </Text>
              <Send size={20} color={(!selectedContact || !message) ? '#9CA3AF' : '#FFFFFF'} />
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F0FDF4', '#FEFEFE']}
        style={styles.background}>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Users size={32} color="#10B981" />
            <Text style={styles.title}>Connect & Share</Text>
            <Text style={styles.subtitle}>Strengthen your relationships</Text>
          </View>

          <View style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>💚 Connection Benefits</Text>
            <Text style={styles.benefitsText}>
              Social connections reduce stress, boost mood, and improve overall well-being. 
              Taking time to connect with others is one of the most powerful wellness practices.
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>How would you like to connect?</Text>
            {connectionActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => handleActionSelect(action.id)}
                  activeOpacity={0.7}>
                  <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                    <IconComponent size={24} color={action.color} />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Connection Tip</Text>
            <Text style={styles.tipText}>
              Even a simple "thinking of you" message can brighten someone's day and strengthen your bond. 
              Authentic connection doesn't require grand gestures - small, consistent efforts matter most.
            </Text>
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
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  benefitsCard: {
    backgroundColor: '#ECFDF5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
  },
  benefitsText: {
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  contactSelection: {
    marginBottom: 30,
  },
  contactButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedContactButton: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedContactButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  messageSection: {
    marginBottom: 30,
  },
  messageInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 120,
    marginBottom: 20,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  templatesContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  templateCard: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    width: 200,
    marginRight: 12,
  },
  templateText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 18,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 18,
    borderRadius: 16,
    marginBottom: 40,
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  sendButtonTextDisabled: {
    color: '#9CA3AF',
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});
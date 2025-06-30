# MindfulTech Navigator

A comprehensive digital wellness application built with React Native and Expo, designed to promote healthier technology usage through AI-powered interventions, mindfulness practices, and behavioral insights.

## 🌟 Features

### Core Functionality
- **AI-Powered Behavior Analysis**: Advanced machine learning algorithms analyze usage patterns and provide personalized insights
- **Smart Interventions**: Contextual wellness prompts including breathing exercises, mindfulness moments, and social connections
- **Real-time Wellness Scoring**: Dynamic wellness metrics based on screen time, mindful breaks, and positive content consumption
- **Nature Breaks**: Immersive nature experiences with ambient sounds and guided relaxation
- **Comprehensive Analytics**: Detailed insights dashboard with trend analysis and behavioral pattern recognition

### Key Components
- **Dashboard**: Central hub displaying wellness score, metrics, and AI-generated insights
- **Interventions**: Guided wellness activities including breathing exercises, mindfulness prompts, and social connection tools
- **Nature Breaks**: Curated nature experiences with audio playback and ambient soundscapes
- **Insights**: Advanced analytics powered by AI with personalized recommendations
- **Settings**: Comprehensive customization options with theme support and privacy controls

## 🏗️ Architecture

### Technology Stack
- **Framework**: React Native with Expo SDK 53.0.0
- **Navigation**: Expo Router 5.0.2 with tab-based architecture
- **Animations**: React Native Reanimated 3.17.4
- **Styling**: StyleSheet with responsive design patterns
- **Icons**: Lucide React Native for consistent iconography
- **State Management**: React hooks with context providers
- **AI/ML**: Simulated machine learning analysis (production-ready for TensorFlow.js integration)

### Project Structure
```
app/
├── _layout.tsx                 # Root layout with theme provider
├── (tabs)/                     # Tab-based navigation
│   ├── _layout.tsx            # Tab configuration
│   ├── index.tsx              # Dashboard/Home screen
│   ├── interventions.tsx      # Wellness tools
│   ├── nature.tsx             # Nature breaks
│   ├── insights.tsx           # AI-powered analytics
│   └── settings.tsx           # User preferences
├── api/                       # Server-side API routes
│   ├── behavior+api.ts        # Behavior tracking endpoints
│   └── wellness+api.ts        # Wellness metrics endpoints
└── +not-found.tsx             # 404 error page

components/
├── AnalyticsCard.tsx          # Metric display cards
├── BehaviorInsights.tsx       # AI insights component
├── BreathingExercise.tsx      # Guided breathing interface
├── MindfulnessPrompt.tsx      # Mindfulness questionnaire
├── SocialConnection.tsx       # Social interaction tools
├── TrendChart.tsx             # Data visualization
└── WellnessScore.tsx          # Central wellness indicator

contexts/
└── ThemeContext.tsx           # Theme management and dark mode

hooks/
├── useAudioPlayer.ts          # Audio playback management
└── useFrameworkReady.ts       # Framework initialization

services/
└── aiAnalysis.ts              # AI/ML analysis simulation

types/
└── wellness.ts                # TypeScript type definitions

utils/
└── mlAnalysis.ts              # Machine learning utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindful-tech-navigator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   - Web: Open http://localhost:8081 in your browser
   - iOS: Press `i` in the terminal or scan QR code with Expo Go
   - Android: Press `a` in the terminal or scan QR code with Expo Go

### Environment Setup

Create environment files for different environments:

```bash
# .env (development)
EXPO_PUBLIC_API_URL=http://localhost:8081
EXPO_PUBLIC_AI_ANALYSIS_ENABLED=true

# .env.production
EXPO_PUBLIC_API_URL=https://your-production-api.com
EXPO_PUBLIC_AI_ANALYSIS_ENABLED=true
```

## 📱 Platform Support

### Web (Primary Platform)
- Full feature support
- Responsive design for desktop and mobile browsers
- Progressive Web App capabilities
- Audio playback with HTML5 Audio API

### Mobile (iOS/Android)
- Native performance with Expo managed workflow
- Platform-specific adaptations for audio and haptics
- Native navigation patterns
- Device-specific optimizations

### Platform-Specific Features
```typescript
import { Platform } from 'react-native';

// Example of platform-specific implementation
const triggerHapticFeedback = () => {
  if (Platform.OS !== 'web') {
    // Native haptic feedback
    Haptics.impactAsync();
  } else {
    // Web alternative (visual feedback)
    // Implementation for web browsers
  }
};
```

## 🤖 AI & Machine Learning

### Current Implementation
The app includes a sophisticated AI analysis simulation that demonstrates:

- **Behavioral Pattern Recognition**: Identifies usage patterns and stress correlations
- **Predictive Analytics**: Forecasts optimal intervention timing
- **Personalized Recommendations**: Generates contextual wellness suggestions
- **Real-time Analysis**: Provides immediate feedback on user behavior

### Production Integration
For production deployment, the AI system is designed to integrate with:

- **TensorFlow.js**: Client-side machine learning
- **Cloud ML Services**: Server-side analysis for complex patterns
- **Real-time Data Processing**: Continuous behavior monitoring
- **Privacy-First Design**: Local processing where possible

### AI Features
```typescript
// Example AI analysis usage
const insights = await aiAnalysisService.generateInsights(userId);
const prediction = await aiAnalysisService.predictOptimalIntervention(userId);
const realTimeAnalysis = await aiAnalysisService.analyzeRealTimeBehavior(action, context);
```

## 🎨 Design System

### Theme Architecture
- **Light/Dark Mode**: Comprehensive theme switching
- **Responsive Design**: Adaptive layouts for all screen sizes
- **Color System**: Consistent color palette with semantic naming
- **Typography**: Scalable font system with proper hierarchy

### Design Principles
- **Apple-level Aesthetics**: Premium visual design with attention to detail
- **Micro-interactions**: Subtle animations and feedback
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Progressive Disclosure**: Layered information architecture

### Responsive Breakpoints
```typescript
// Responsive layout calculations
const getResponsiveLayout = () => {
  if (width > 768) return tabletLayout;
  if (width > 480) return largePhoneLayout;
  if (width > 360) return mediumPhoneLayout;
  return smallPhoneLayout;
};
```

## 🔧 API Architecture

### Server Routes
The app includes server-side API routes for:

- **Behavior Tracking**: `/api/behavior` - Log and analyze user behavior
- **Wellness Metrics**: `/api/wellness` - Retrieve and update wellness data
- **AI Analysis**: Integrated within behavior and wellness endpoints

### API Usage Examples
```typescript
// Behavior logging
const response = await fetch('/api/behavior', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'breathing_exercise',
    timestamp: new Date().toISOString(),
    duration: 300,
    context: { stressLevel: 7 }
  })
});

// Wellness metrics
const wellness = await fetch('/api/wellness').then(res => res.json());
```

## 🔒 Privacy & Security

### Data Protection
- **Local Processing**: AI analysis performed on-device when possible
- **Encryption**: All data encrypted in transit and at rest
- **No Data Selling**: Strict policy against selling user data
- **User Control**: Complete data export and deletion capabilities

### Privacy Features
- **Quiet Hours**: Disable notifications during specified times
- **Data Minimization**: Collect only necessary information
- **Transparent Analytics**: Clear explanation of data usage
- **Opt-out Options**: Granular control over data collection

## 🧪 Testing

### Development Testing
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Component testing (when implemented)
npm test
```

### Platform Testing
- **Web**: Test in Chrome, Firefox, Safari
- **iOS**: Test on iOS Simulator and physical devices
- **Android**: Test on Android Emulator and physical devices

## 📦 Deployment

### Web Deployment
```bash
# Build for web
npm run build:web

# Deploy to hosting service
# (Netlify, Vercel, etc.)
```

### Mobile Deployment
```bash
# Build for app stores
eas build --platform all

# Submit to stores
eas submit --platform all
```

### Environment Configuration
```json
{
  "expo": {
    "web": {
      "output": "server"
    },
    "plugins": [
      ["expo-router", {
        "origin": "https://your-domain.com/"
      }]
    ]
  }
}
```

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow TypeScript best practices
2. **Component Structure**: Use functional components with hooks
3. **File Organization**: Maintain clear separation of concerns
4. **Responsive Design**: Ensure all components work across screen sizes
5. **Accessibility**: Include proper ARIA labels and semantic markup

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Implement changes with proper testing
4. Update documentation as needed
5. Submit pull request with detailed description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
- **Audio not playing**: Check browser permissions and HTTPS requirements
- **Responsive layout issues**: Verify screen size calculations
- **Theme not persisting**: Check localStorage availability

### Getting Help
- Create an issue for bugs or feature requests
- Check existing documentation and code comments
- Review the Expo documentation for platform-specific issues

## 🔮 Future Enhancements

### Planned Features
- **Wearable Integration**: Apple Watch and Android Wear support
- **Advanced ML Models**: Real TensorFlow.js implementation
- **Social Features**: Community challenges and sharing
- **Biometric Integration**: Heart rate and stress monitoring
- **Offline Support**: Full offline functionality with sync

### Technical Roadmap
- **Performance Optimization**: Bundle splitting and lazy loading
- **Advanced Analytics**: More sophisticated behavioral insights
- **Real-time Collaboration**: Shared wellness goals with friends
- **Integration APIs**: Connect with popular wellness apps

---

**Built with ❤️ for digital wellness**

*MindfulTech Navigator - Empowering healthier digital habits through intelligent, non-intrusive interventions and behavioral science.*
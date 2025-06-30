export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, timestamp, duration, context } = body;

    // Simple behavior pattern analysis
    const behaviorData = {
      action,
      timestamp: new Date(timestamp),
      duration: duration || 0,
      context: context || {},
      patterns: analyzePatterns(action, timestamp),
    };

    // In a real app, this would save to a database
    console.log('Behavior logged:', behaviorData);

    return Response.json({
      success: true,
      intervention: determineIntervention(behaviorData),
      insights: generateInsights(behaviorData),
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to analyze behavior' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const timeframe = url.searchParams.get('timeframe') || '7d';

  // Mock analytics data - in production, this would query a real database
  const mockData = {
    wellnessScore: 78,
    screenTime: '4h 23m',
    interventions: 12,
    mindfulBreaks: 8,
    weeklyTrend: [
      { day: 'Mon', score: 72 },
      { day: 'Tue', score: 75 },
      { day: 'Wed', score: 68 },
      { day: 'Thu', score: 82 },
      { day: 'Fri', score: 78 },
      { day: 'Sat', score: 85 },
      { day: 'Sun', score: 78 },
    ],
    insights: [
      {
        type: 'positive',
        title: 'Great Progress!',
        message: 'You took 3 more mindful breaks today compared to yesterday.',
      },
      {
        type: 'warning',
        title: 'Evening Usage Spike',
        message: 'Screen time increased by 45 minutes after 9 PM. Consider a digital sunset routine.',
      },
    ],
  };

  return Response.json(mockData);
}

function analyzePatterns(action: string, timestamp: string): any {
  const hour = new Date(timestamp).getHours();
  const isLateNight = hour > 22 || hour < 6;
  const isWorkHours = hour >= 9 && hour <= 17;

  return {
    timeOfDay: isLateNight ? 'late-night' : isWorkHours ? 'work-hours' : 'leisure',
    frequency: 'normal', // Would calculate based on historical data
    context: {
      isLateNight,
      isWorkHours,
      weekday: new Date(timestamp).getDay() < 6,
    },
  };
}

function determineIntervention(behaviorData: any): any {
  const { patterns, action } = behaviorData;

  // Simple rule-based intervention logic
  if (patterns.timeOfDay === 'late-night') {
    return {
      type: 'breathing',
      priority: 'high',
      message: 'Late night usage detected. Try a calming breathing exercise.',
    };
  }

  if (action === 'excessive-scrolling') {
    return {
      type: 'mindfulness',
      priority: 'medium',
      message: 'Take a mindful moment to check in with yourself.',
    };
  }

  if (patterns.frequency === 'high') {
    return {
      type: 'nature',
      priority: 'medium',
      message: 'Consider taking a nature break to reset your focus.',
    };
  }

  return null;
}

function generateInsights(behaviorData: any): any[] {
  // Generate AI-powered insights based on behavior patterns
  return [
    {
      type: 'pattern',
      title: 'Usage Pattern Detected',
      description: `Your ${behaviorData.action} activity shows increased frequency during ${behaviorData.patterns.timeOfDay}.`,
      recommendation: 'Consider setting up automatic reminders for these times.',
    },
  ];
}
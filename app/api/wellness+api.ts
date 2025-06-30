export async function GET(request: Request) {
  const url = new URL(request.url);
  const metric = url.searchParams.get('metric');

  // Mock wellness data - in production, this would come from user analytics
  const wellnessData = {
    score: Math.floor(Math.random() * 30) + 70, // 70-100 range
    screenTime: {
      today: '4h 23m',
      yesterday: '4h 46m',
      weekAverage: '4h 15m',
    },
    mindfulBreaks: {
      today: 8,
      target: 10,
      streak: 3,
    },
    interventions: {
      today: 12,
      successful: 9,
      types: {
        breathing: 4,
        mindfulness: 3,
        social: 2,
        nature: 3,
      },
    },
    insights: [
      {
        type: 'positive',
        title: 'Breathing Practice Improving',
        message: 'Your heart rate variability improved by 15% during breathing exercises this week.',
        confidence: 0.87,
      },
      {
        type: 'suggestion',
        title: 'Optimal Break Timing',
        message: 'Based on your patterns, 2:30 PM would be an ideal time for a mindful break.',
        confidence: 0.73,
      },
    ],
  };

  if (metric) {
    return Response.json(wellnessData[metric as keyof typeof wellnessData] || null);
  }

  return Response.json(wellnessData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, value, timestamp } = body;

    // Log wellness activity
    const logEntry = {
      action,
      value,
      timestamp: new Date(timestamp),
      processed: true,
    };

    // In production, save to database and update user metrics
    console.log('Wellness activity logged:', logEntry);

    // Return updated metrics
    return Response.json({
      success: true,
      message: 'Wellness activity recorded',
      updatedMetrics: {
        score: calculateWellnessScore(action, value),
        streak: updateStreak(action),
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to log wellness activity' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

function calculateWellnessScore(action: string, value: any): number {
  // Simple scoring algorithm - in production, this would be more sophisticated
  const baseScore = 75;
  const actionBonus = {
    breathing_exercise: 5,
    mindful_break: 3,
    social_connection: 4,
    nature_break: 4,
    positive_content: 2,
  };

  return baseScore + (actionBonus[action as keyof typeof actionBonus] || 0);
}

function updateStreak(action: string): number {
  // Mock streak calculation
  return Math.floor(Math.random() * 10) + 1;
}
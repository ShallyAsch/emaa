import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getPreferences } from '@/src/lib/db';
import { groqJSON } from '@/src/lib/groq';

interface Suggestion {
  id: string;
  message: string;
  image: string;
  action: string;
}

interface SuggestionsResponse {
  suggestions: Suggestion[];
}

const suggestionPrompt = (prefs: string) => `You are Emama Zinashe, a warm and intuitive AI concierge at Kuriftu African Village resort.

GUEST PROFILE:
${prefs}

CURRENT CONTEXT:
- It's currently mid-day at the resort
- Weather is warm and pleasant
- The guest is on-site and available

TASK: Generate exactly 3 personalized suggestions for this guest based on their preferences.
Each suggestion should be a warm, personal message offering a specific experience.

RESPONSE FORMAT (JSON ONLY):
{
  "suggestions": [
    {
      "id": "1",
      "message": "A warm, personalized message suggesting a specific experience",
      "image": "a relevant image filename from: /buna-ceremony.jpg, /spa-wellness.jpg, /dining-hall.jpg, /pool-garden.jpg, /cozy-room.jpg, /sunset-view.jpg, /coffee-detail.jpg, /gomen.jpg, /shiro.jpg, /kitfo.jpg",
      "action": "A short action label like 'Book Massage', 'Join Coffee Ceremony', 'Reserve Table'"
    }
  ]
}`;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const prefs = await getPreferences(userId);

    let prefsStr = 'No preferences set yet';
    if (prefs) {
      const foods = prefs.favorite_foods?.join(', ') || 'not set';
      const activities = prefs.activities?.join(', ') || 'not set';
      const hobbies = prefs.hobbies?.join(', ') || 'not set';
      const personality = prefs.personality_type || 'not set';
      const travelCtx = prefs.travel_context || 'not set';
      const times = prefs.time_preferences?.join(', ') || 'not set';
      const dietary = prefs.dietary_notes || 'none';
      prefsStr = `Foods: ${foods}. Activities: ${activities}. Hobbies: ${hobbies}. Personality: ${personality}. Traveling: ${travelCtx}. Active times: ${times}. Dietary: ${dietary}`;
    }

    const result = await groqJSON<SuggestionsResponse>(suggestionPrompt(prefsStr), 'Generate personalized suggestions for this guest.');
    return NextResponse.json(result);
  } catch (err) {
    console.error('Suggestions API error:', err);
    // Fallback suggestions
    return NextResponse.json({
      suggestions: [
        { id: '1', message: 'Would you like a refreshing drink and a foot massage? The weather is perfect today.', image: '/pool-garden.jpg', action: 'Book' },
        { id: '2', message: 'Your favorite Ethiopian coffee is ready in the lobby. Come enjoy it with the family!', image: '/coffee-detail.jpg', action: 'Join' },
        { id: '3', message: 'The sunset from the garden terrace is beautiful tonight. A perfect walk before dinner.', image: '/sunset-view.jpg', action: 'Explore' },
      ]
    });
  }
}

// Example API integration points for Ende Bete Neuro dashboard
// Replace mock data with real backend calls

import { Guest, Activity, Message, ProactiveOffer, Memory } from './types';

/**
 * GUEST PROFILE API
 * Fetch current guest information
 */
export async function fetchGuestProfile(guestId: string): Promise<Guest> {
  try {
    const response = await fetch(`/api/guests/${guestId}`);
    if (!response.ok) throw new Error('Failed to fetch guest');
    return response.json();
  } catch (error) {
    console.error('Error fetching guest profile:', error);
    // Fallback to mock data in development
    return Promise.reject(error);
  }
}

/**
 * ACTIVITIES API
 * Fetch daily activities and experiences
 */
export async function fetchDailyActivities(
  date: string,
  resortId: string
): Promise<Activity[]> {
  try {
    const response = await fetch(
      `/api/activities?date=${date}&resort=${resortId}`
    );
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    return Promise.reject(error);
  }
}

/**
 * ACTIVITY RESERVATION
 * Reserve an activity
 */
export async function reserveActivity(
  guestId: string,
  activityId: string
): Promise<{ success: boolean; reservationId: string }> {
  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestId, activityId }),
    });
    if (!response.ok) throw new Error('Failed to reserve activity');
    return response.json();
  } catch (error) {
    console.error('Error reserving activity:', error);
    return Promise.reject(error);
  }
}

/**
 * MESSAGES API
 * Fetch chat history
 */
export async function fetchChatHistory(
  guestId: string
): Promise<Message[]> {
  try {
    const response = await fetch(`/api/chat/${guestId}`);
    if (!response.ok) throw new Error('Failed to fetch chat');
    return response.json();
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return Promise.reject(error);
  }
}

/**
 * SEND MESSAGE
 * Send a message to the host
 */
export async function sendMessage(
  guestId: string,
  content: string,
  sessionId: string
): Promise<Message> {
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestId, content, sessionId }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    return Promise.reject(error);
  }
}

/**
 * PROACTIVE OFFERS API
 * Get AI-generated personalized suggestions
 */
export async function fetchProactiveOffers(
  guestId: string
): Promise<ProactiveOffer[]> {
  try {
    const response = await fetch(`/api/offers/${guestId}`);
    if (!response.ok) throw new Error('Failed to fetch offers');
    return response.json();
  } catch (error) {
    console.error('Error fetching proactive offers:', error);
    return Promise.reject(error);
  }
}

/**
 * ROOM CONTROLS API
 * Update room settings (temperature, lighting)
 */
export async function updateRoomControl(
  roomId: string,
  controlType: 'temperature' | 'lighting',
  value: number | string
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`/api/rooms/${roomId}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: controlType, value }),
    });
    if (!response.ok) throw new Error('Failed to update room control');
    return response.json();
  } catch (error) {
    console.error('Error updating room control:', error);
    return Promise.reject(error);
  }
}

/**
 * QUICK REQUEST API
 * Submit quick requests (pillows, towels, etc.)
 */
export async function submitQuickRequest(
  roomId: string,
  requestType: string
): Promise<{ success: boolean; requestId: string }> {
  try {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, type: requestType }),
    });
    if (!response.ok) throw new Error('Failed to submit request');
    return response.json();
  } catch (error) {
    console.error('Error submitting quick request:', error);
    return Promise.reject(error);
  }
}

/**
 * MEMORIES API
 * Fetch guest memories and photos
 */
export async function fetchMemories(guestId: string): Promise<Memory[]> {
  try {
    const response = await fetch(`/api/memories/${guestId}`);
    if (!response.ok) throw new Error('Failed to fetch memories');
    return response.json();
  } catch (error) {
    console.error('Error fetching memories:', error);
    return Promise.reject(error);
  }
}

/**
 * UPDATE FAMILY PROFILE
 * Save guest family profile preferences
 */
export async function updateFamilyProfile(
  guestId: string,
  profile: any
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`/api/guests/${guestId}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  } catch (error) {
    console.error('Error updating family profile:', error);
    return Promise.reject(error);
  }
}

/**
 * ROOM STATUS API
 * Get room preparation and status
 */
export async function fetchRoomStatus(roomId: string): Promise<any> {
  try {
    const response = await fetch(`/api/rooms/${roomId}/status`);
    if (!response.ok) throw new Error('Failed to fetch room status');
    return response.json();
  } catch (error) {
    console.error('Error fetching room status:', error);
    return Promise.reject(error);
  }
}

/**
 * VOICE COMMAND API
 * Send voice input for natural language processing
 */
export async function processVoiceCommand(
  guestId: string,
  audioBlob: Blob
): Promise<{ command: string; response: string }> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('guestId', guestId);

    const response = await fetch('/api/voice-command', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to process voice command');
    return response.json();
  } catch (error) {
    console.error('Error processing voice command:', error);
    return Promise.reject(error);
  }
}

/**
 * WEATHER API
 * Get current weather and forecast
 */
export async function fetchWeather(locationId: string): Promise<any> {
  try {
    const response = await fetch(`/api/weather/${locationId}`);
    if (!response.ok) throw new Error('Failed to fetch weather');
    return response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    return Promise.reject(error);
  }
}

// ============================================
// USAGE EXAMPLES IN COMPONENTS
// ============================================

/**
 * Example 1: Fetch guest profile in a component
 *
 * useEffect(() => {
 *   fetchGuestProfile(guestId).then(data => {
 *     setGuest(data);
 *   });
 * }, [guestId]);
 */

/**
 * Example 2: Submit reservation
 *
 * const handleReserve = async (activityId: string) => {
 *   try {
 *     const result = await reserveActivity(guestId, activityId);
 *     console.log('Reserved:', result.reservationId);
 *   } catch (error) {
 *     console.error('Reservation failed:', error);
 *   }
 * };
 */

/**
 * Example 3: Send message to host
 *
 * const handleSendMessage = async (content: string) => {
 *   try {
 *     const message = await sendMessage(guestId, content, sessionId);
 *     setMessages([...messages, message]);
 *   } catch (error) {
 *     console.error('Message failed:', error);
 *   }
 * };
 */

/**
 * Example 4: Update room temperature
 *
 * const handleTemperatureChange = async (temp: number) => {
 *   try {
 *     await updateRoomControl(roomId, 'temperature', temp);
 *     setTemperature(temp);
 *   } catch (error) {
 *     console.error('Update failed:', error);
 *   }
 * };
 */

export default {
  fetchGuestProfile,
  fetchDailyActivities,
  reserveActivity,
  fetchChatHistory,
  sendMessage,
  fetchProactiveOffers,
  updateRoomControl,
  submitQuickRequest,
  fetchMemories,
  updateFamilyProfile,
  fetchRoomStatus,
  processVoiceCommand,
  fetchWeather,
};

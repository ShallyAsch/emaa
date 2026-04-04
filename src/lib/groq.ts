import Groq from 'groq-sdk';

const MODEL = 'llama-3.3-70b-versatile';

function getGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is missing from .env');
  return new Groq({ apiKey });
}

export async function groqChat(systemPrompt: string, userMessage: string): Promise<string> {
  const groq = getGroq();
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    model: MODEL,
    temperature: 0.7,
    max_tokens: 500,
  });
  return completion.choices[0]?.message?.content || '';
}

export async function groqJSON<T>(systemPrompt: string, userMessage: string): Promise<T> {
  const raw = await groqChat(systemPrompt, userMessage);
  // Strip markdown code blocks if present
  const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(`Failed to parse JSON from AI response: ${cleaned.slice(0, 200)}`);
  }
}

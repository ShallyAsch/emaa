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
  let cleaned = raw.trim();
  // Remove ```json or ``` wrappers
  cleaned = cleaned.replace(/^```(?:json)?\s*/gm, '').replace(/```\s*$/gm, '').trim();
  // Try to find JSON object in response
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]) as T;
    } catch {}
  }
  throw new Error(`Failed to parse JSON from AI response: ${cleaned.slice(0, 300)}`);
}

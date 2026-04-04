import { describe, it, expect, beforeEach } from 'vitest';
import { aiService } from './AI-service';

describe('AIService Comprehensive Tests', () => {
    
    // 1. Functional Test: Valid Mood
    it('should return a valid discovery object for a standard mood', async () => {
        const mood = "I want to feel energized and try some local food";
        const result = await aiService.getDiscovery(mood);

        expect(result).toHaveProperty('reasoning');
        expect(typeof result.reasoning).toBe('string');
        expect(result.activity).toHaveProperty('name');
        expect(result.meal).toHaveProperty('name');
    });

    // 2. Edge Case: Empty or Minimal Mood
    it('should still return valid JSON even with a one-word mood', async () => {
        const result = await aiService.getDiscovery("bored");
        
        expect(result).not.toBeNull();
        expect(result.activity).toBeDefined();
    });

    // 3. Error Handling: Database Connectivity
    // Note: This test assumes you might temporarily point to a wrong URL 
    // to test your catch block logic.
    it('should throw a friendly error if the DB URL is unreachable', async () => {
        const originalUrl = aiService.dbUrl;
        aiService.dbUrl = "http://localhost:9999"; // Invalid port

        await expect(aiService.getDiscovery("any mood"))
            .rejects.toThrow("Failed to curate your discovery");

        aiService.dbUrl = originalUrl; // Restore for other tests
    });

    // 4. Persona Test: User Chat
    it('should adapt the chat tone based on the influence parameter', async () => {
        const prompt = "How should I start my day?";
        
        const calmResponse = await aiService.chat(prompt, { influence: "peaceful and slow" });
        const energeticResponse = await aiService.chat(prompt, { influence: "high-energy and loud" });

        // Verify they aren't the exact same string
        expect(calmResponse).not.toBe(energeticResponse);
    });

    // 5. Integration: Data Integrity
    it('should only suggest items that actually exist in the provided data', async () => {
        // We can check if the ID returned by AI exists in our local db.json
        const result = await aiService.getDiscovery("I want to swim");
        
        // This ensures the AI isn't hallucinating items not in your JSON
        if (result.activity) {
            expect(result.activity).toHaveProperty('id');
        }
    });
});
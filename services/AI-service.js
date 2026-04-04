import axios from 'axios';
import { DiscoverySuggester } from './ai/DiscoverySuggester.js';
import { HospitalityPersona } from './ai/HospitalityPersona.js';
import { UserPersona } from './ai/UserPersona.js';
import { FeelingParser } from './ai/FeelingParser.js';
class AIService {
    constructor() {
        // Environment variables prefixed with VITE_ for Vite compatibility
        this.dbUrl = import.meta.env.VITE_DB_URL;
        
        if (!this.dbUrl) {
            console.error("CRITICAL: VITE_DB_URL is not defined in your .env file.");
        }

        // Initialize all persona instances
        this.models = {
            discovery: new DiscoverySuggester(),
            hospitality: new HospitalityPersona(),
            parser: new FeelingParser(),
            user: new UserPersona()
        };
    }

    /**
     * Core logic: Fetches real-time data from your JSON server 
     * and passes it to the AI for a curated recommendation.
     */
    async getDiscovery(userMood) {
        try {
            const [menuRes, offeringsRes] = await Promise.all([
                axios.get(`${this.dbUrl}/menu`),
                axios.get(`${this.dbUrl}/offerings`)
            ]);

            const aiResponse = await this.models.discovery.generateResponse(
                `Guest vibe: ${userMood}`, 
                { 
                    menu: menuRes.data, 
                    offerings: offeringsRes.data 
                }
            );

            // Returns a clean object: { reasoning, activity, meal }
            return JSON.parse(aiResponse);
        } catch (error) {
            console.error("AI-Service [Discovery] Error:", error.message);
            throw new Error("Failed to curate your discovery. Please check your connection.");
        }
    }

    /**
     * Helper for general chat interactions
     */
    async chat(message, context = {}) {
        return await this.models.user.generateResponse(message, context);
    }
}

// Export a singleton instance so the whole app shares the same service
export const aiService = new AIService();
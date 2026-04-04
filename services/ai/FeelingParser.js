import { BaseAiService } from './BaseAiService';

export class FeelingParser extends BaseAiService {
    getSystemInstruction() {
        return `You are a linguistic analysis tool. 
        TASK:
        Extract the intent and key details from the user's request.
        
        OUTPUT FORMAT (JSON ONLY):
        {
            "intent": "booking" | "service_request" | "general_inquiry",
            "action": "What the user wants to do",
            "entities": { "time": "...", "people": "...", "item": "..." }
        }`;
    }
}
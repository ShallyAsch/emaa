import Groq from "groq-sdk";

export class BaseAiService {
    constructor() {
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;

        if (!apiKey) {
            throw new Error("VITE_GROQ_API_KEY is missing from .env");
        }

        this.groq = new Groq({ 
            apiKey,
            dangerouslyAllowBrowser: true 
        });
        this.model = "llama-3.3-70b-versatile";
    }

    /**
     * @param {any} _data - Use underscore to tell the linter it's okay 
     * if the base class doesn't use it yet.
     */
    getSystemInstruction() {
        return "You are a helpful, concise AI assistant.";
    }

    async generateResponse(userInput, data = {}) {
        try {
            // We pass 'data' here. This ensures it's "used" in the function call.
            const systemContent = this.getSystemInstruction(data);

            const completion = await this.groq.chat.completions.create({
                messages: [
                    { 
                        role: "system", 
                        content: systemContent 
                    },
                    { role: "user", content: userInput }
                ],
                model: this.model,
            });
            return completion.choices[0]?.message?.content || "";
        } catch (err) {
            // Re-throwing with context
            throw new Error(`${this.constructor.name} Error: ${err.message}`);
        }
    }
}
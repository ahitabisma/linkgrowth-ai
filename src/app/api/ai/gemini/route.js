import { GoogleGenAI } from "@google/genai";

const MODEL = 'gemini-2.0-flash';

export async function POST(request) {
    try {
        const data = await request.json();
        const prompt = data.prompt;

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
        }

        const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await gemini.models.generateContent({
            model: MODEL,
            contents: prompt
        });

        const summary = response.text;

        return new Response(JSON.stringify({ summary }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message ?? 'Internal Server Error' }), { status: 500 });
    }
}
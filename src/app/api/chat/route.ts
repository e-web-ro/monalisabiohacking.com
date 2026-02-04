import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { chatKnowledge } from '@/lib/chat-knowledge';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { message, lang } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not defined in process.env");
        }

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const currentLang = (lang as string) || 'ro';
        // Fallback to 'ro' if knowledge for lang doesn't exist
        const knowledge = chatKnowledge[currentLang as keyof typeof chatKnowledge] || chatKnowledge['ro'];

        // Format knowledge for the system prompt
        // We map it to make it more readable for the LLM
        const knowledgeText = knowledge.map(k => `Topic/Keywords: ${k.keywords.join(', ')}\nInfo: ${k.answer}`).join('\n\n');

        const systemPrompt = `
You are a helpful, professional, and friendly virtual assistant for Monalisa Biohacking.
Your goal is to assist users with information about services, pricing, booking, and biohacking topics.

The user is browsing in language code: "${currentLang}". 
Please respond in the same language as the user's message.

Use the following Context Information to answer questions. 
This information contains facts (prices, service names, links) that you MUST respect.
You should incorporate this information naturally into a conversation. Do not just blindly copy-paste if a smoother sentence is possible, but keep the links and prices exact.

Context Information:
${knowledgeText}

Important rules:
1. Always provide relevant links from the context (e.g., /ro/servicii) when discussing services or contact info.
2. If the user asks about something not in the context (like specific medical diagnoses), clarify that you are an AI assistant and not a doctor, but you can share general info if it's about biohacking.
3. Be concise, warm, and engaging.
4. Keep responses under 3-4 sentences unless a detailed explanation is requested.
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error('OpenAI API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

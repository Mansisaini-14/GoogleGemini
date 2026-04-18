

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

export async function generateResponse(prompt) {
  const trimmed = prompt?.trim()
  if (!trimmed) {
    throw new Error('Prompt is required')
  }

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: trimmed,
  });

  return result.text;
}

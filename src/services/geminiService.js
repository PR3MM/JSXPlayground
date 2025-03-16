import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const getCodeSuggestion = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(`Generate React code for: ${prompt}`);
    return result.response.text();
  } catch (error) {
    console.error('Error getting code suggestion:', error);
    throw error;
  }
};
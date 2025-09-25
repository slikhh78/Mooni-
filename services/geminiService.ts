
import { GoogleGenAI } from "@google/genai";
import { SleepData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume the key is always present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateContent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm having a little trouble thinking right now. Please try again in a moment.";
    }
};

export const getSleepCoachingTip = async (sleepData: SleepData): Promise<string> => {
    const { totalSleepTime, stages, sleepScore, awakenings } = sleepData;

    const totalMinutes = (type: string) => stages
        .filter(s => s.stage === type)
        .reduce((acc, curr) => acc + curr.duration, 0);

    const deepSleepMinutes = totalMinutes('DEEP');
    const lightSleepMinutes = totalMinutes('LIGHT');
    const remSleepMinutes = totalMinutes('REM');
    
    const prompt = `
        Act as a friendly, empathetic, and knowledgeable AI sleep coach named Mooni.
        Analyze the following sleep data for a user and provide a short, encouraging, and actionable suggestion (2-3 sentences max) to improve their sleep quality.
        Do not repeat the data back to the user. Focus on one key insight.
        
        Sleep Data:
        - Overall Sleep Score: ${sleepScore}/100
        - Total Sleep Time: ${Math.floor(totalSleepTime / 60)} hours and ${totalSleepTime % 60} minutes
        - Deep Sleep: ${deepSleepMinutes} minutes
        - REM Sleep: ${remSleepMinutes} minutes
        - Light Sleep: ${lightSleepMinutes} minutes
        - Awakenings: ${awakenings}

        Provide a gentle and positive suggestion based on this data. For example, if deep sleep is low, suggest a relaxing pre-bed activity. If awakenings are high, suggest limiting liquids before bed.
    `;
    
    return generateContent(prompt);
};


export const getMoonPhaseTip = async (phaseName: string): Promise<string> => {
    const prompt = `
        Provide a very short (one sentence) and soothing sleep tip related to the current moon phase: ${phaseName}.
        The tone should be calm and mystical, like a gentle whisper from the moon itself.
    `;
    return generateContent(prompt);
};


import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, FinancialAdvice } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const categorizeTransaction = async (text: string): Promise<{ description: string; amount: number; category: string; type: 'income' | 'expense' }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this transaction text and extract details: "${text}". If the date isn't mentioned, assume today.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING },
          amount: { type: Type.NUMBER },
          category: { type: Type.STRING, description: "Broad category like Food, Rent, Salary, Entertainment, Transport, etc." },
          type: { type: Type.STRING, enum: ["income", "expense"] }
        },
        required: ["description", "amount", "category", "type"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getFinancialInsights = async (transactions: Transaction[]): Promise<FinancialAdvice> => {
  const ai = getAI();
  const historyString = transactions.map(t => `${t.date}: ${t.type} of ${t.amount} for ${t.description} (${t.category})`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Acting as a professional financial advisor, analyze these transactions and provide advice. Transactions:\n${historyString}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A concise overview of the user's financial status." },
          tips: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Actionable tips for saving money or better budgeting."
          },
          warnings: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Potential risks or high-spending areas."
          }
        },
        required: ["summary", "tips", "warnings"]
      }
    }
  });

  return JSON.parse(response.text || '{"summary": "No data", "tips": [], "warnings": []}');
};

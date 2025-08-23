import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-2.5-pro';
const tools = [{ googleSearch: {} }];
const config = {
  thinkingConfig: { thinkingBudget: -1 },
  tools,
};

export const generateInterviewQA = async (inputPrompt) => {
  const contents = [
    {
      role: 'user',
      parts: [{ text: inputPrompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  return response;
};

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "你是一个名为'豆包'的AI助手。你的回答应该简洁、友好、专业，并且使用中文。你擅长文学创作、代码编写和日常问答。",
      }
    });
    return response.text || "抱歉，我现在无法回答。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接助手时出现了一些问题，请稍后再试。";
  }
}

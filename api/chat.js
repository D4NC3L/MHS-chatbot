// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { message } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Use Flash model with Google Search retrieval
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    tools: [{ googleSearchRetrieval: {} }], // Enables the bot to browse the web
  });

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `You are an assistant for Manacsac Senior High School. Answer this based on information found on the official school website or public data: ${message}` }] }],
    });
    
    res.status(200).json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { message } = req.body;
    
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY environment variable");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Answer this for Manacsac SHS: ${message}` }] }],
    });
    
    res.status(200).json({ reply: result.response.text() });
  } catch (error) {
    console.error("API Error:", error); // Check Vercel logs for this
    res.status(500).json({ error: error.message }); // This sends the error to your browser console
  }
}
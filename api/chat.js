import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Diagnostics: Log the status to the Vercel Logs
  console.log("--- Server Log Check ---");
  const hasKey = !!process.env.GEMINI_API_KEY;
  console.log("Does GEMINI_API_KEY exist?", hasKey);
  
  if (!hasKey) {
    return res.status(500).json({ 
        error: "CRITICAL: GEMINI_API_KEY is undefined on the server. Check your Vercel Environment Variables." 
    });
  }

  // 2. If it passes, proceed with chat
  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });
    
    res.status(200).json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message });
  }
}
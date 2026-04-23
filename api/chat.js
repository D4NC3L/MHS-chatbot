import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // --- KNOWLEDGE BASE SECTION ---
    const systemInstruction = `
      You are the official AI Assistant for Manacsac Senior High School. 
      Your goal is to answer FAQs about enrollment, strands, and school events.
      
      KNOWLEDGE BASE:
      - School Name: Manacsac Senior High School
      - Website: [INSERT YOUR SCHOOL WEBSITE LINK HERE]
      - Location: [Insert Location if known]
      
      CORE FAQs:
      1. Enrollment: Requires Grade 10 completion, PSA Birth Certificate, and Form 138.
      2. Strands Offered: [List them here, e.g., STEM, ABM, HUMSS, GAS, TVL].
      3. Schedule: Monday to Friday, 7:00 AM - 5:00 PM.
      
      Always be polite and helpful. If you don't know an answer, tell them to visit the 
      official website at [LINK] or visit the Registrar's office.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction, // This locks the AI into its role
    });

    const result = await model.generateContent(message);
    res.status(200).json({ reply: result.response.text() });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
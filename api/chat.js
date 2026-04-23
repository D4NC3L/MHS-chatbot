// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // Replace your existing catch/response logic in script.js with this:
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();

        if (response.ok) {
            messages.innerHTML += `<div class="message bot">${data.reply}</div>`;
        } else {
            // This shows the actual error from your backend
            messages.innerHTML += `<div class="message bot" style="color:red;">Error: ${data.error || "Unknown error"}</div>`;
        }
        messages.scrollTop = messages.scrollHeight;
    } catch (error) {
        messages.innerHTML += `<div class="message bot" style="color:red;">Failed to connect to server.</div>`;
    }
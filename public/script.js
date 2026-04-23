async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const messages = document.getElementById('messages');
    const userText = inputField.value.trim();

    if (!userText) return;

    // Add user message
    messages.innerHTML += `<div class="message user">${userText}</div>`;
    inputField.value = '';
    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        
        // Add bot message
        messages.innerHTML += `<div class="message bot">${data.reply || "Sorry, I couldn't process that."}</div>`;
        messages.scrollTop = messages.scrollHeight;
    } catch (error) {
        messages.innerHTML += `<div class="message bot">Error: Could not connect to server.</div>`;
    }
}

// Allow "Enter" key to send
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
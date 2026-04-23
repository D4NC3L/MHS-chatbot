async function sendMessage() {
    const input = document.getElementById('userInput').value;
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p><b>You:</b> ${input}</p>`;

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    messages.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
}
document.getElementById('chat-icon').addEventListener('click', function() {
    document.getElementById('chat-popup').style.display = 'flex';
});

document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chat-popup').style.display = 'none';
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessageToChatBox('user', userInput);
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('http://localhost:8082/chat/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        addMessageToChatBox('bot', data.reply);
    } catch (error) {
        console.error('Error:', error);
        addMessageToChatBox('bot', 'Sorry, there was a technical issue. Please try again later.');
    }
}

function addMessageToChatBox(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender} card-panel`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

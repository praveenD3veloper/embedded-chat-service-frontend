document.getElementById('chat-icon').addEventListener('click', function() {
    const chatPopup = document.getElementById('chat-popup');
    const chatArrow = document.getElementById('chat-arrow');
    
    if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
        chatPopup.style.display = 'flex';
        chatArrow.style.display = 'none'; // Hide the arrow when chat is open
    } else {
        chatPopup.style.display = 'none';
        chatArrow.style.display = 'block'; // Show the arrow when chat is closed
    }
});

document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chat-popup').style.display = 'none';
    document.getElementById('chat-arrow').style.display = 'block'; // Show the arrow when chat is closed
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessageToChatBox('user', userInput);
    document.getElementById('user-input').value = '';

    try {
        // Encode the userInput to be safely included in the URL
        const encodedMessage = encodeURIComponent(userInput);
        const response = await fetch(`http://localhost:8082/chat/generate?message=${encodedMessage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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

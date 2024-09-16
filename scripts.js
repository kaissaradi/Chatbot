let apiKey = '';
let chatHistory = [];

// Function to prompt for API key
function promptForApiKey() {
    apiKey = prompt("Please enter your GROQ API key:");
    if (!apiKey) {
        alert("API key is required to use the chatbot.");
        promptForApiKey();
    } else {
        localStorage.setItem('groq_api_key', apiKey);
    }
}

// Function to send message to GROQ API
async function sendMessageToGroq(message) {
    console.log("Sending message to GROQ API:", message);
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                ...chatHistory,
                { role: "user", content: message }
            ]
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    }

    const data = await response.json();
    console.log("Received response from GROQ API:", data);
    return data.choices[0].message.content;
}

// Function to add message to chat
function addMessageToChat(role, content) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${role}-message`);
    messageDiv.textContent = content;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to handle sending message
async function handleSendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        addMessageToChat('user', message);
        chatHistory.push({ role: "user", content: message });
        userInput.value = '';

        document.getElementById('loading').style.display = 'block';

        try {
            const response = await sendMessageToGroq(message);
            addMessageToChat('assistant', response);
            chatHistory.push({ role: "assistant", content: response });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request. Please try again.');
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
        promptForApiKey();
    }

    document.getElementById('send-button').addEventListener('click', handleSendMessage);

    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
});

// Clear API key when window is closed
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('groq_api_key');
});

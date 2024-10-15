// Constants
const MAX_TOKENS = 8192;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Local Storage
const storageKey = 'groq_api_key';

// Markdown
const md = window.markdownit();

// Chat History
let chatHistory = [];

// API Key
let apiKey = '';

// Get API Key from Local Storage
function getApiKeyFromStorage() {
  return localStorage.getItem(storageKey);
}

// Set API Key in Local Storage
function setApiKeyInStorage(key) {
  localStorage.setItem(storageKey, key);
}

// Prompt for API Key
function promptForApiKey() {
  apiKey = prompt('Please enter your GROQ API key:');
  if (!apiKey) {
    alert('API key is required to use the chatbot.');
    promptForApiKey();
  } else {
    setApiKeyInStorage(apiKey);
  }
}

// Send Message to GROQ API
async function sendMessageToGroq(message, model) {
  if (typeof model !== 'string') {
    throw new Error('Model must be a string');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...chatHistory,
          { role: 'user', content: message },
        ],
        stream: true,
        max_tokens: MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let partialResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const jsonData = line.slice(5);
          if (jsonData.trim() === '[DONE]') continue;

          try {
            const parsedData = JSON.parse(jsonData);
            const content = parsedData.choices[0].delta.content;
            if (content) {
              partialResponse += content;
              updateAssistantMessage(partialResponse);
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    }

    return partialResponse;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Add Message to Chat
function addMessageToChat(role, content) {
  const chatContainer = document.getElementById('chat-container');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${role}-message`);
  if (role === 'assistant') {
    messageDiv.id = 'assistant-message-' + Date.now();
  }
  messageDiv.innerHTML = md.render(content);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Update Assistant Message
function updateAssistantMessage(content) {
  const assistantMessage = document.querySelector('.assistant-message:last-child');
  if (assistantMessage) {
    assistantMessage.innerHTML = md.render(content);
    document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
  }
}

// Adjust Textarea Height
function adjustTextareaHeight() {
  const textarea = document.getElementById('user-input');
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// Handle Send Message
async function handleSendMessage() {
  try {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
      addMessageToChat('user', message);
      chatHistory.push({ role: 'user', content: message });
      userInput.value = '';
      adjustTextareaHeight();

      document.getElementById('loading').classList.remove('d-none');
      addMessageToChat('assistant', ''); // Add an empty assistant message to start

      const model = document.getElementById('model-selector').value;
      const response = await sendMessageToGroq(message, model);
      chatHistory.push({ role: 'assistant', content: response });
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while processing your request. Please try again.');
  } finally {
    document.getElementById('loading').classList.add('d-none');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  apiKey = getApiKeyFromStorage();
  if (!apiKey) {
    promptForApiKey();
  }

  document.getElementById('send-button').addEventListener('click', handleSendMessage);

  const userInput = document.getElementById('user-input');
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });
  userInput.addEventListener('input', adjustTextareaHeight);
});

// Remove API Key on Unload
window.addEventListener('beforeunload', () => {
  localStorage.removeItem(storageKey);
});
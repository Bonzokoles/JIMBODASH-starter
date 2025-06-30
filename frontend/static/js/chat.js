// JIMBODASH Chat Module

class ChatModule {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-chat');
        this.init();
    }

    init() {
        console.log('Chat module initializing...');
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }

        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Clear input
        this.chatInput.value = '';

        // Add user message to chat
        this.addMessage(message, 'user');

        // Show typing indicator
        this.showTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            
            // Remove typing indicator
            this.hideTyping();
            
            // Add AI response to chat
            this.addMessage(data.response, 'bot');
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message fade-in`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `<strong>You:</strong> ${this.escapeHtml(text)}`;
        } else {
            messageDiv.innerHTML = `<strong>JIMBO:</strong> ${this.escapeHtml(text)}`;
        }

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<strong>JIMBO:</strong> <span class="spinner"></span>Thinking...';
        typingDiv.id = 'typing-indicator';
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearChat() {
        this.chatMessages.innerHTML = '<div class="message bot-message"><strong>JIMBO:</strong> Hello! How can I help you today?</div>';
    }
}

// Initialize chat module when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatModule = new ChatModule();
});
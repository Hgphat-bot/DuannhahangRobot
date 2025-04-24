import React, { useState } from 'react';
import './ChatbotPage.css';

function ChatbotPage() {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi là Chatbot của nhà hàng.", sender: 'bot' },
    { text: "Tôi có thể giúp gì cho bạn?", sender: 'bot' },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (inputMessage.trim()) {
      const userMessage = inputMessage.trim();

      setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
      setInputMessage('');

      try {
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMessages(prevMessages => [...prevMessages, { text: data.reply, sender: 'bot' }]);

      } catch (error) {
        console.error('Lỗi khi gửi tin nhắn đến backend:', error);
        setMessages(prevMessages => [...prevMessages, { text: "Lỗi kết nối đến Chatbot.", sender: 'bot error' }]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Trò chuyện với Chatbot AI</h1>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}

      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Nhập tin nhắn của bạn..."
          className="message-input"
        />
        <button type="submit" className="send-button">Gửi</button>
      </form>
    </div>
  );
}

export default ChatbotPage;
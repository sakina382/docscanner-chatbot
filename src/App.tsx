import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App(){ 
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am a chatbot. How can I help you today?' },
    { id: 2, type: 'user', text: 'Hi there!' }
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        type: 'user',
        text: input
      };
      setMessages([...messages, newUserMessage]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: 'Thinking...'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 500);
    }
  };

  return (
    <div className="chatbot-container">
      <div className='chat-header'>
        <div className='header-info'>
          <h2 className='logo-text'>Chatbot Assistant</h2>
          <p className='header-subtitle'>Always here to help</p>
        </div>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}-message`}>
            <div className="message-bubble">
              <p className="message-text">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
  
      <div className="chat-footer">
        <form onSubmit={handleSendMessage} className='chat-form'>
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type="submit" className="send-button">Send</button>      
        </form>
      </div>
    </div>
  );
};

export default App
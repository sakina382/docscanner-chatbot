import React, { useState, useEffect, useRef } from 'react'
import { getBotResponse } from '../services/openaiService'
import Markdown from 'react-markdown';

export function Chatbot() {
  const [messages, setMessages] = useState<{ id: number; type: string; text: string | React.ReactElement }[]>([
    { id: 1, type: 'bot', text: 'Hello! I am a chatbot. How can I help you today?' },
    { id: 2, type: 'user', text: 'Hi there!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        type: 'user',
        text: input
      };
      setMessages([...messages, newUserMessage]);
      const userInput = input;
      setInput('');
      setIsLoading(true);
      
      try {
        const botResponseText = await getBotResponse(userInput);
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: <Markdown>{botResponseText}</Markdown>
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        const errorResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again.'
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
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
              <div className="message-text">{message.text}</div>
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
          <button type="submit" className="send-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>      
        </form>
      </div>
    </div>
  );
}

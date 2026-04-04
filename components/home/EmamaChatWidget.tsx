'use client';

import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function EmamaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Selam! I am Emama Zinashe. I know everything about your stay here. How can I help you today, my dear?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: inputValue }]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I understand. Let me help you with that. How else can I assist you?',
        },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-primary shadow-warm hover:shadow-warm-md transition-smooth flex items-center justify-center md:bottom-8 md:right-8"
        aria-label="Chat with Emama Zinashe"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-24px)] h-96 bg-background rounded-2xl shadow-2xl flex flex-col glass border border-border md:bottom-28 md:right-8">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-lg">
              👵
            </div>
            <div>
              <h3 className="font-semibold">Emama Zinashe</h3>
              <p className="text-xs text-primary-foreground/70">She knows everything ❤️</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-accent text-primary rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 rounded-b-2xl flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-accent hover:bg-accent/90 text-primary p-2 rounded-lg transition-smooth"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

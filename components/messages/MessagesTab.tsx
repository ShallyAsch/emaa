'use client';

import React, { useState, useRef, useEffect } from 'react';
import { mockChatMessages } from '@/lib/mockData';
import { Message as MessageType } from '@/lib/types';
import { Send } from 'lucide-react';

const quickReplies = [
  'Thank you!',
  'That sounds wonderful',
  'Can you help me with...',
  'See you soon',
  'Perfect timing',
];

export default function MessagesTab() {
  const [messages, setMessages] = useState<MessageType[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add guest message
    const guestMessage: MessageType = {
      id: String(messages.length + 1),
      sender: 'guest',
      content: text,
      timestamp: new Date(),
      avatar: '👩‍🦱',
    };

    setMessages([...messages, guestMessage]);
    setNewMessage('');

    // Simulate host response after delay
    setTimeout(() => {
      const hostMessage: MessageType = {
        id: String(messages.length + 2),
        sender: 'host',
        content:
          'Thank you for reaching out! We will take care of that right away.',
        timestamp: new Date(),
        avatar: '👵',
      };
      setMessages((prev) => [...prev, hostMessage]);
    }, 1000);
  };

  return (
    <div className="w-full md:pr-24 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 max-w-2xl mx-auto w-full space-y-4">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-b from-background to-background/80 backdrop-blur py-3 -mx-4 md:-mx-6 px-4 md:px-6 mb-4">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-1">
            Chat with your host
          </h1>
          <p className="text-sm text-muted-foreground">
            👵 Mama Almaz is here to help
          </p>
        </div>

        {/* Messages */}
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 items-end ${
                msg.sender === 'guest' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="text-2xl flex-shrink-0">
                {msg.avatar || (msg.sender === 'host' ? '👵' : '👤')}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  msg.sender === 'guest'
                    ? 'bg-accent/20 text-foreground rounded-br-none'
                    : 'glass rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'guest'
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 md:px-6 pb-4 max-w-2xl mx-auto w-full space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSendMessage(reply)}
              className="px-3 py-2 bg-secondary/20 text-foreground rounded-full text-xs font-medium hover:bg-secondary/30 transition-smooth border border-secondary/30"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(newMessage);
              }
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-2xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={() => handleSendMessage(newMessage)}
            className="p-3 rounded-full bg-accent/20 text-accent hover:bg-accent/30 transition-smooth"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

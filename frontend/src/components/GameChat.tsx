import React, { useState, useRef, useEffect } from 'react';

const GameChat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };

  // Auto-scroll to the bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col font-mono bg-white rounded-xl shadow-md w-fit max-w-[320px] max-h-[400px] text-slate-700">
      <h2 className="text-lg font-bold mb-2 text-center border-b border-gray-200 py-2 w-full">
        Chat
      </h2>

      <div className="flex-1 overflow-y-auto p-3 w-full max-h-[300px] border-b border-gray-200 rounded-md scroll-smooth">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="mb-2 wrap-break-word border-b-2 border-gray-300 pb-1"
            >
              {msg}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic text-center">
            No messages yet...
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-2 w-full bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
              handleSendMessage(e.currentTarget.value.trim());
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default GameChat;

'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'ขอโทษครับ AI ตอบไม่ได้ตอนนี้ ลองใหม่นะครับ' }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-2xl"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-black border border-gray-800 rounded-lg w-80 md:w-96 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">The Master BMX AI</h3>
              <p className="text-white/70 text-xs">ถามเรื่องคอร์ส ราคา สินค้าได้เลย!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-950">
            <div className="bg-gray-800 rounded-lg p-3 text-sm">
              <p className="text-white">สวัสดีครับ! 👋 ผมคือ AI ของ The Master BMX ถามเรื่องคอร์สเรียน ราคา หรือสินค้าได้เลยครับ!</p>
            </div>
            
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-lg p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-red-600/20 ml-8 text-white'
                    : 'bg-gray-800 mr-8 text-white'
                }`}
              >
                <p>{msg.content}</p>
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gray-800 rounded-lg p-3 text-sm mr-8">
                <p className="text-white/70">กำลังพิมพ์...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-black border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-red-600"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-bold transition-colors"
              >
                ส่ง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

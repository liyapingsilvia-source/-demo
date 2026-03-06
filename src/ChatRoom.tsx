import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Phone, 
  Volume2, 
  Mic, 
  Plus, 
  Send, 
  Copy, 
  RotateCcw, 
  Bookmark, 
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { getChatResponse } from './services/gemini';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

interface ChatRoomProps {
  onBack: () => void;
}

export default function ChatRoom({ onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: '你好！我是豆包，你的智能助手。有什么我可以帮你的吗？',
      timestamp: Date.now(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getChatResponse(text, history);
    
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleVoiceStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsRecording(true);
  };

  const handleVoiceEnd = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate voice to text
      handleSend("这是一段模拟的语音输入内容");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Header */}
      <header className="relative flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors z-20">
          <Menu size={24} />
        </button>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-base font-semibold">豆包</h1>
          <span className="text-[10px] text-gray-400 font-normal leading-none">内容由 AI 生成</span>
        </div>

        <div className="flex items-center gap-4 z-20">
          <Phone size={20} className="text-gray-600" />
          <Volume2 size={20} className="text-gray-600" />
        </div>
      </header>

      {/* Chat Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 pb-40 space-y-6 scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <img 
                src="https://picui.ogmua.cn/s1/2026/03/06/69aa5e4607ad2.webp" 
                className="w-12 h-12 rounded-full flex-shrink-0 object-cover border border-gray-50"
                referrerPolicy="no-referrer"
              />
            )}
            <div className={`max-w-[75%] group relative`}>
              <div className={`
                px-4 py-3 rounded-2xl text-[15px] leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-doubao-blue text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'}
              `}>
                {msg.text}
              </div>
              
              {msg.role === 'model' && (
                <div className="flex items-center gap-4 mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  <Volume2 size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  <Bookmark size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  <Share2 size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  <RotateCcw size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-start gap-3">
            <img 
              src="https://picui.ogmua.cn/s1/2026/03/06/69aa5e4607ad2.webp" 
              className="w-12 h-12 rounded-full flex-shrink-0 object-cover border border-gray-50"
              referrerPolicy="no-referrer"
            />
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                />
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                />
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="absolute bottom-6 left-0 right-0 px-4 pt-2 bg-transparent z-20 pointer-events-none">
        <div className="flex flex-nowrap gap-2 mb-3 overflow-x-auto no-scrollbar pointer-events-auto">
          {['快速', 'AI 创作', '照片动起来', '帮我写作'].map(tag => (
            <button key={tag} className="shrink-0 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 whitespace-nowrap bg-white hover:bg-gray-50">
              {tag === '快速' ? '⚡️ 快速' : tag === 'AI 创作' ? '✨ AI 创作' : tag === '照片动起来' ? '🎬 照片动起来' : '📝 帮我写作'}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-auto">
          <button 
            onMouseDown={handleVoiceStart}
            onMouseUp={handleVoiceEnd}
            onTouchStart={handleVoiceStart}
            onTouchEnd={handleVoiceEnd}
            className="p-1 text-gray-500 hover:text-doubao-blue transition-colors active:scale-90"
          >
            <Mic size={24} />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="发消息或按住说话..."
            className="flex-1 bg-transparent outline-none text-[15px] py-1"
          />
          <div className="flex items-center gap-2">
            {inputValue ? (
              <button 
                onClick={() => handleSend()}
                className="p-1.5 bg-doubao-blue text-white rounded-full transition-transform active:scale-90"
              >
                <Send size={18} />
              </button>
            ) : (
              <Plus size={24} className="text-gray-400" />
            )}
          </div>
        </div>
      </footer>

      {/* Voice Overlay */}
      <AnimatePresence>
        {isRecording && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleVoiceEnd}
            className="absolute inset-0 z-50 flex flex-col items-center justify-end pb-24 bg-gradient-to-b from-transparent via-doubao-blue/40 to-doubao-blue cursor-pointer"
          >
            <div className="text-white mb-12 text-center">
              <p className="text-lg font-medium mb-2">点击任意处发送</p>
              <div className="flex items-center justify-center gap-1 h-12">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="wave-bar" 
                    style={{ animationDelay: `${i * 0.05}s`, height: `${Math.random() * 20 + 10}px` }} 
                  />
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
            >
              <Mic size={40} className="text-doubao-blue" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

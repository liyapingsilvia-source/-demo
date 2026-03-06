import React from 'react';
import { Search, Edit3, MessageCircle, Sparkles, PenTool, Bell, User, Scan } from 'lucide-react';

interface ChatListProps {
  onSelectChat: (id: string) => void;
}

const CHATS = [
  {
    id: 'doubao',
    name: '豆包',
    avatar: 'https://picui.ogmua.cn/s1/2026/03/06/69aa5e4607ad2.webp',
    lastMsg: '“走散”一般是指原本在一起的人，因为各种原因...',
    time: '10:44',
    isOfficial: true,
  },
  {
    id: '2',
    name: '新对话',
    lastMsg: '[豆包过年红包]',
    time: '昨天',
  },
  {
    id: '3',
    name: '家政意外险购买咨询',
    lastMsg: '家政保的综合意外险适合给家里阿姨购买，且...',
    time: '星期三',
  },
  {
    id: '4',
    name: '江南大学地址查询',
    lastMsg: '中文 用户与需求洞察 研究腾讯广告平台用户...',
    time: '2月28日',
  },
  {
    id: '5',
    name: 'Guide Tiktok 10k Users to Create B...',
    lastMsg: '构思这类标题，需突出创建行为带来的价值，...',
    time: '2月27日',
  },
  {
    id: '6',
    name: '解释 Bulletin Board',
    lastMsg: '“FYF”有多种含义，常见的有以下几种：- Fr...',
    time: '2月26日',
  },
  {
    id: '7',
    name: '解释 local communities',
    lastMsg: '“进度条”的英文是 “progress bar”。例如：T...',
    time: '2月25日',
  },
  {
    id: '8',
    name: '口红保质期',
    lastMsg: '口红的保质期一般为3年，但开封后建议在1年内...',
    time: '2月24日',
  }
];

const MACARON_COLORS = [
  '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2', '#FFFFD8'
];

export default function ChatList({ onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white sticky top-0 z-10">
        <Scan size={24} className="text-gray-700" />
        <h1 className="text-lg font-semibold">对话</h1>
        <div className="flex items-center gap-4">
          <Search size={24} className="text-gray-700" />
          <Edit3 size={24} className="text-gray-700" />
        </div>
      </header>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {CHATS.map((chat, index) => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="relative">
              {index === 0 ? (
                <img 
                  src={chat.avatar} 
                  alt={chat.name}
                  className="w-14 h-14 rounded-full object-cover border border-gray-100"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border border-gray-100"
                  style={{ backgroundColor: MACARON_COLORS[index % MACARON_COLORS.length] }}
                >
                  💬
                </div>
              )}
              {chat.isOfficial && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <div className="bg-doubao-blue w-3.5 h-3.5 rounded-full border border-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 border-b border-gray-50 py-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 truncate">{chat.name}</span>
                  {chat.isOfficial && (
                    <span className="text-[10px] bg-blue-50 text-doubao-blue px-1.5 py-0.5 rounded font-medium">
                      doubao.com
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400 truncate leading-tight">
                {chat.lastMsg}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <footer className="flex items-center justify-around py-2 border-t border-gray-100 bg-white safe-area-bottom">
        <div className="flex flex-col items-center gap-1 text-doubao-blue">
          <MessageCircle size={24} />
          <span className="text-[10px] font-medium">对话</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Sparkles size={24} />
          <span className="text-[10px] font-medium">智能体</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <div className="bg-gray-100 p-1.5 rounded-xl">
            <PenTool size={20} />
          </div>
          <span className="text-[10px] font-medium">创作</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Bell size={24} />
          <span className="text-[10px] font-medium">通知</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <User size={24} />
          <span className="text-[10px] font-medium">我的</span>
        </div>
      </footer>
    </div>
  );
}

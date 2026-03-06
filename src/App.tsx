import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

export default function App() {
  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list');

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="h-screen w-[390px] bg-white shadow-xl overflow-hidden flex flex-col relative">
        {currentView === 'list' ? (
          <ChatList onSelectChat={(id) => id === 'doubao' && setCurrentView('chat')} />
        ) : (
          <ChatRoom onBack={() => setCurrentView('list')} />
        )}
      </div>
    </div>
  );
}

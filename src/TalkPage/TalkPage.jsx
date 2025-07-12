import React from 'react';
import Header from '../components/header';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const TalkPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <Header />

      {/* Main Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-[300px] border-r border-gray-200">
          <ChatSidebar />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default TalkPage;

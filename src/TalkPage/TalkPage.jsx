import React, { useState } from 'react';
import Header from '../components/header';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const TalkPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#FDFBFC]">
      <Header />

      <div className="flex flex-1 overflow-hidden w-full max-w-7xl mx-auto px-[4rem] pb-4 gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-[300px]">
          <ChatSidebar onSelectChat={setSelectedChat} />
        </div>

        {/* Chat window */}
        <div className="flex-1 overflow-hidden">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkPage;

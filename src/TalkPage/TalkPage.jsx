import { useEffect, useState } from 'react';
import Header from '../components/header';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const TalkPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) setMyId(parseInt(storedId));
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#FDFBFC]">
      <Header />
      <div className="flex flex-1 overflow-hidden w-full max-w-7xl mx-auto px-[4rem] pb-4 gap-4">
        <div className="w-full md:w-[300px]">
          <ChatSidebar onSelectChat={setSelectedChat} />
        </div>
        <div className="flex-1 overflow-hidden">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} myId={myId} /> // ✅ ส่ง myId
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

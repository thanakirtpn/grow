import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';

const ChatSidebar = ({ onSelectChat }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedChat, setSelectedChat] = useState({ tab: '', index: -1 });

  const tabs = [
    { label: 'Inbox', key: 'inbox' },
    { label: 'Following', key: 'following' },
    { label: 'Request', key: 'request', badge: 12 },
  ];

  const chatData = {
    inbox: [
      {
        name: 'John Doe',
        time: '10:00',
        message: 'Hello from inbox...',
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
        unread: 2,
        online: true,
      },
      {
        name: 'Emma Watson',
        time: '11:15',
        message: 'Are we still on for today?',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        unread: 0,
        online: false,
      },
    ],
    request: [
      {
        name: 'McKinsey Vermillion',
        time: '12:25',
        message: 'Enter your message description here...Enter your message description here...Enter your message description here...',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        unread: 2,
        online: true,
      },
    ],
    following: [
      {
        name: 'Alice Smith',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        online: true,
      },
    ],
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm h-full">
        {/* Header + Search */}
        <div className="p-4 pb-0">
          <div className="flex items-center mb-4">
            <HiDotsHorizontal className="text-gray-500 mr-2 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">Chats</h2>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </div>
        </div>

        {/* Tabs */}
        <div className="relative">
          <div className="w-full border-b border-gray-300">
            <div className="grid grid-cols-3 text-sm font-medium relative z-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`relative flex items-center justify-center gap-1 pb-2 pt-1 transition-all duration-200 !bg-transparent z-10 ${
                    activeTab === tab.key
                      ? '!text-black'
                      : '!text-black text-opacity-50'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSelectedChat({ tab: '', index: -1 });
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.badge && tab.key === 'request' && (
                    <span className="bg-[#FFE5E9] text-[#FF5B35] rounded-full text-[9px] min-w-[1rem] h-4 font-semibold flex items-center justify-center leading-none">
                      {tab.badge}
                    </span>
                  )}
                  {activeTab === tab.key && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#FF5B35] rounded-t-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto pt-0">
          <ul className="text-sm">
            {chatData[activeTab].map((chat, index) => {
              const isSelected =
                selectedChat.tab === activeTab && selectedChat.index === index;

              return (
                <li
                  key={index}
                  className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${
                    isSelected ? 'bg-[#FFF1EC]' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedChat({ tab: activeTab, index });

                    // ส่งข้อมูลแชทไปยัง ChatWindow
                    if (onSelectChat) {
                      onSelectChat({
                        name: chat.name,
                        avatar: chat.avatar,
                        lastSeen: chat.time || 'recently',
                        messages: [
                          { from: 'me', text: 'Hey, how are you?', time: '12:25' },
                          { from: 'them', text: chat.message || 'Hello!', time: chat.time || '12:25' },
                          { from: 'them', text: 'Let’s catch up soon.', time: '02:25' }
                        ]
                      });
                    }
                  }}
                >
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <img
                      src={chat.avatar}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-semibold text-gray-800 truncate pr-2">
                        {chat.name}
                      </p>
                      {activeTab !== 'following' && chat.time && (
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                          {chat.time}
                        </span>
                      )}
                    </div>

                    {activeTab !== 'following' && chat.message && (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-xs font-normal truncate pr-2">
                          {chat.message}
                        </p>
                        {chat.unread > 0 && (
                          <span className="text-white bg-[#FF5B35] text-[9px] font-semibold rounded-full min-w-[1rem] h-4 flex-shrink-0 flex items-center justify-center leading-none">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}

            {chatData[activeTab].length === 0 && (
              <li className="px-4 text-sm text-gray-400">No messages</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;

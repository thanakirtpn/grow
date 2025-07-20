import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import defaultAvatar from '../assets/no_pic.jpg';

const ChatSidebar = ({ onSelectChat }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedChat, setSelectedChat] = useState({ tab: '', index: -1 });
  const [chatData, setChatData] = useState({ inbox: [], request: [], following: [] });

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchData = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) return navigate('/login');

  const headers = {
    Authorization: `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true',
  };

  try {
    const baseURL = API_BASE_URL.replace(/\/$/, ''); // ตัด '/' ท้ายสุด

    const resInbox = await fetch(`${API_BASE_URL}/api/talk/chats`, { headers });
    if (resInbox.status === 401) return navigate('/login');
    const dataInbox = await resInbox.json();

    const formattedInbox = (dataInbox?.chats || []).map(chat => {
      const avatar =
        chat.avatar &&
        chat.avatar !== 'null' &&
        chat.avatar !== 'undefined'
          ? `${baseURL}${chat.avatar.startsWith('/') ? '' : '/'}${chat.avatar}`
          : null;

      return {
        id: chat.userId,
        name: chat.username,
        avatar,
        message: chat.lastMessage,
        time: new Date(chat.lastMessageTime).toISOString(),
        unread: 0,
        online: true,
        status: chat.status,
      };
    });

    const resRequest = await fetch(`${API_BASE_URL}/api/talk/requests`, { headers });
    if (resRequest.status === 401) return navigate('/login');
    const dataRequest = await resRequest.json();
    const senderMap = new Map();
    (dataRequest?.requests || []).forEach((r) => {
      const existing = senderMap.get(r.senderId);
      if (!existing) {
        senderMap.set(r.senderId, {
          senderId: r.senderId,
          senderUsername: r.senderUsername,
          senderAvatar: r.senderAvatar || null,
          message: r.message,
          created_at: r.created_at,
          status: r.status,
          count: 1,
        });
      } else {
        existing.count += 1;
        if (new Date(r.created_at) > new Date(existing.created_at)) {
          existing.message = r.message;
          existing.created_at = r.created_at;
        }
      }
    });

    const formattedRequest = [];
    senderMap.forEach((r) => {
      const avatar =
        r.senderAvatar &&
        r.senderAvatar !== 'null' &&
        r.senderAvatar !== 'undefined'
          ? `${baseURL}${r.senderAvatar.startsWith('/') ? '' : '/'}${r.senderAvatar}`
          : null;

      formattedRequest.push({
        id: r.senderId,
        name: r.senderUsername,
        avatar,
        message: r.message,
        time: new Date(r.created_at).toISOString(),
        unread: r.count,
        online: true,
        status: r.status,
      });
    });

    setChatData(prev => ({
      ...prev,
      inbox: formattedInbox,
      request: formattedRequest,
    }));
  } catch (err) {
    console.error('Error fetching chats:', err);
  }
};

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const tabs = [
    { label: 'Inbox', key: 'inbox' },
    { label: 'Following', key: 'following' },
    { label: 'Request', key: 'request', badge: chatData.request.length || 0 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm h-full">
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

        <div className="relative">
          <div className="w-full border-b border-gray-300">
            <div className="grid grid-cols-3 text-sm font-medium relative z-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`relative flex items-center justify-center gap-1 pb-2 pt-1 transition-all duration-200 !bg-transparent z-10 ${
                    activeTab === tab.key ? '!text-black' : '!text-black text-opacity-50'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSelectedChat({ tab: '', index: -1 });
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.badge > 0 && tab.key === 'request' && (
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

        <div className="flex-1 overflow-y-auto pt-0">
          <ul className="text-sm">
            {chatData[activeTab].map((chat, index) => {
              const isSelected = selectedChat.tab === activeTab && selectedChat.index === index;
              const avatarSrc = chat.avatar || defaultAvatar;

              return (
                <li
                  key={index}
                  className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${
                    isSelected ? 'bg-[#FFF1EC]' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedChat({ tab: activeTab, index });
                    if (onSelectChat) {
                      onSelectChat({
                        id: chat.id,
                        userId: chat.id,
                        name: chat.name,
                        avatar: avatarSrc,
                        lastSeen: chat.time,
                        messages: [],
                        status: chat.status,
                      });
                    }
                  }}
                >
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <img src={avatarSrc} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-semibold text-gray-800 truncate pr-2">{chat.name}</p>
                      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {new Date(chat.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {chat.message && (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-xs font-normal truncate pr-2">{chat.message}</p>
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

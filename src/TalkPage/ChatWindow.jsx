import React, { useEffect, useState, useRef } from 'react';
import {
  FiSend,
  FiPaperclip,
  FiImage,
  FiSmile,
  FiPhone,
  FiVideo,
} from 'react-icons/fi';
import defaultAvatar from '../assets/no_pic.jpg';

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!chat?.userId) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`${API_BASE_URL}/api/talk/messages/${chat.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const data = await res.json();
        const myId = parseInt(localStorage.getItem('userId'));

        const formatted = (data.messages || []).map((msg) => ({
          text: msg.content,
          time: msg.sent_at,
          fromSelf: msg.sender_id === myId,
          isRequest: msg.is_request,
        }));

        setMessages(formatted);
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    };

    fetchMessages();
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ✅ เพิ่มฟังก์ชันนี้เข้าไปเพื่อดึงสถานะ connection สดจาก backend
  const fetchConnectionStatus = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_BASE_URL}/api/talk/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!res.ok) {
      console.warn('Failed to fetch chat status');
      return 'UNKNOWN';
    }

    const data = await res.json();
    const match = data.chats.find((c) => c.userId === chat.userId);
    return match?.status || 'UNKNOWN';
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      const status = await fetchConnectionStatus();

      const token = localStorage.getItem('authToken');
      const url =
        status === 'PENDING'
          ? `${API_BASE_URL}/api/talk/requests`
          : `${API_BASE_URL}/api/talk/messages`;

      const body =
        status === 'PENDING'
          ? { receiverId: chat.userId, message: input.trim() }
          : { receiverId: chat.userId, content: input.trim() };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('Send failed:', result.message || 'Unknown error');
        return;
      }

      const now = new Date().toISOString();

      setMessages((prev) => [
        ...prev,
        {
          text: input.trim(),
          time: now,
          fromSelf: true,
          isRequest: status === 'PENDING',
        },
      ]);

      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleAccept = async () => {
    const token = localStorage.getItem('authToken');
    const senderId = chat.userId;

    try {
      const res = await fetch(`${API_BASE_URL}/api/talk/requests/from/${senderId}/accept`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const error = await res.json();
        console.error('Accept failed:', error.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Accept error:', err);
    }
  };

  const handleDecline = async () => {
    const token = localStorage.getItem('authToken');
    const senderId = chat.userId;

    try {
      const res = await fetch(`${API_BASE_URL}/api/talk/requests/from/${senderId}/decline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const error = await res.json();
        console.error('Decline failed:', error.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Decline error:', err);
    }
  };

  const formatTime = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (isoStr) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  const avatarSrc =
    chat.avatar && chat.avatar !== 'null' && chat.avatar !== 'undefined'
      ? chat.avatar
      : defaultAvatar;

  let lastDate = null;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col flex-1 rounded-xl border border-gray-200 shadow-sm bg-[#FDFBFC] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <img src={avatarSrc} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
            <div>
              <div className="font-semibold text-sm text-gray-900">{chat.name}</div>
              <div className="text-xs text-gray-500">
                Online – Last seen, {formatTime(chat.lastSeen)}
              </div>
            </div>
          </div>
          <div className="flex gap-2 pr-1">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <FiPhone size={18} className="text-[#C53678]" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <FiVideo size={18} className="text-[#C53678]" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6 text-sm text-gray-800 bg-[#FDFBFC]">
          {messages.length === 0 && (
            <div className="text-center text-sm text-gray-400">No messages yet</div>
          )}
          {messages.map((msg, i) => {
            const currentDate = new Date(msg.time).toDateString();
            const showDate = currentDate !== lastDate;
            lastDate = currentDate;

            return (
              <React.Fragment key={i}>
                {showDate && (
                  <div className="text-center text-xs text-gray-400">{formatDate(msg.time)}</div>
                )}
                <div className={`flex flex-col ${msg.fromSelf ? 'items-end' : 'items-start'} gap-1`}>
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[80%] shadow-sm ${
                      msg.fromSelf ? 'bg-[#FF6250] text-white' : 'bg-white text-gray-900'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-[10px] text-gray-400">{formatTime(msg.time)}</div>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        {chat.status === 'PENDING' ? (
          <div className="border-t border-gray-200 bg-[#FFF2F4] text-center p-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">New Conversation Request</h3>
            <p className="text-sm text-gray-600">
              {chat.name} wants to connect and share knowledge with you.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleDecline}
                className="no-style border border-[#C53678] text-[#C53678] !bg-transparent px-6 py-2 rounded-full text-sm hover:!bg-[#ffe6ef] hover:!text-[#C53678]"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="bg-[#C53678] text-white px-6 py-2 rounded-full hover:opacity-90 text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        ) : (
          <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center gap-3">
            <input
              type="text"
              placeholder="Write a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-[#F3F4F6] border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
            />
            <FiPaperclip className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <FiImage className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <FiSmile className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <button
              onClick={handleSendMessage}
              className="bg-[#C53678] text-white rounded-full p-2 hover:opacity-90"
            >
              <FiSend />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;

import React from 'react';
import {
  FiSend,
  FiPaperclip,
  FiImage,
  FiSmile,
  FiPhone,
  FiVideo,
} from 'react-icons/fi';

const ChatWindow = ({ chat }) => {
  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  const handleCallClick = () => {
    console.log(`Calling ${chat.name}...`);
  };

  const handleVideoClick = () => {
    console.log(`Starting video call with ${chat.name}...`);
  };

  const formatTo12Hour = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formattedLastSeen = formatTo12Hour(chat.lastSeen);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col flex-1 rounded-xl border border-gray-200 shadow-sm bg-[#FDFBFC] overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <img src={chat.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
            <div>
              <div className="font-semibold text-sm text-gray-900">{chat.name}</div>
              <div className="text-xs text-gray-500">Online – Last seen, {formattedLastSeen}</div>
            </div>
          </div>
          <div className="flex gap-2 pr-1">
            <button onClick={handleCallClick} className="!bg-transparent p-2 rounded-full hover:bg-gray-100 transition">
              <FiPhone size={18} className="text-[#C53678]" />
            </button>
            <button onClick={handleVideoClick} className="!bg-transparent p-2 rounded-full hover:bg-gray-100 transition">
              <FiVideo size={18} className="text-[#C53678]" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6 text-sm text-gray-800 bg-[#FDFBFC]">
          <div className="text-center text-xs text-gray-400">25 April</div>

          {chat.messages.map((msg, i) => {
            const isMe = msg.from === 'me';
            const time = formatTo12Hour(msg.time);

            return (
              <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1`}>
                {isMe ? (
                  <>
                    <div className="px-4 py-2 rounded-xl max-w-[80%] shadow-sm relative flex flex-col bg-[#FF6250] text-white">
                      <span>{msg.text}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 pr-1">
                      {time}
                      {msg.status && (
                        <span className="ml-1">
                          {msg.status === 'sent' && 'Sent'}
                          {msg.status === 'delivered' && '✓ Delivered'}
                          {msg.status === 'read' && '✓✓ Read'}
                          {msg.status === 'failed' && '⚠ Failed'}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 rounded-xl max-w-[80%] shadow-sm bg-white text-gray-900">
                      <span>{msg.text}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 pl-1">{time}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center gap-3">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 bg-[#F3F4F6] border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
          />
          <FiPaperclip className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          <FiImage className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          <FiSmile className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          <button className="bg-[#C53678] text-white rounded-full p-2 hover:opacity-90">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

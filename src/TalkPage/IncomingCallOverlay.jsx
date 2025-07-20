import { useEffect, useState } from 'react';
import { FiPhone, FiX, FiMic, FiVolume2, FiPhoneOff } from 'react-icons/fi';
import defaultAvatar from '../assets/no_pic.jpg';

const IncomingCallOverlay = () => {
  const [incoming, setIncoming] = useState(null);
  const [visible, setVisible] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [duration, setDuration] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🧠 Poll incoming call every 3 seconds
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const pollIncoming = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/talk/call/incoming-call`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const data = await res.json();
        if (data.call) {
          // 🧠 Reset call state for new incoming call
          setDuration(0);
          setStartedAt(null);
          setCallAccepted(false);

          const avatar =
            data.call.callerAvatar &&
            data.call.callerAvatar !== 'null' &&
            data.call.callerAvatar !== 'undefined'
              ? new URL(data.call.callerAvatar, API_BASE_URL).href
              : defaultAvatar;

          setIncoming({
            ...data.call,
            callerAvatar: avatar,
          });

          setVisible(true);
        }
      } catch (err) {
        console.error('Polling incoming call failed:', err);
      }
    };

    const interval = setInterval(pollIncoming, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async () => {
    const token = localStorage.getItem('authToken');

    // ✅ Reset duration before accepting
    setDuration(0);
    setStartedAt(null);

    const res = await fetch(`${API_BASE_URL}/api/talk/call/${incoming.id}/accept`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    const data = await res.json();
    if (res.ok && data.started_at) {
      const startTime = new Date(data.started_at);
      setStartedAt(startTime);
      setCallAccepted(true);
    }
  };

  const handleDecline = async () => {
    const token = localStorage.getItem('authToken');
    await fetch(`${API_BASE_URL}/api/talk/call/${incoming.id}/decline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });
    setVisible(false);
  };

  const handleEndCall = async () => {
    const token = localStorage.getItem('authToken');
    await fetch(`${API_BASE_URL}/api/talk/call/end/${incoming.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });
    setVisible(false);
    setCallAccepted(false);
    setStartedAt(null);
    setDuration(0);
  };

  // ⏱️ Update call duration
  useEffect(() => {
    let interval;
    if (callAccepted && startedAt) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
        setDuration(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callAccepted, startedAt]);

  // 🧠 Poll call status in case caller hangs up
  useEffect(() => {
    if (!callAccepted || !incoming?.id) return;
    const token = localStorage.getItem('authToken');

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/talk/call/${incoming.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const data = await res.json();
        if (data.status === 'CANCELED' || data.status === 'ENDED') {
          setVisible(false);
          setCallAccepted(false);
          setDuration(0);
          setStartedAt(null);
        }
      } catch (err) {
        console.error('Polling call status failed:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [callAccepted, incoming]);

  const formatDuration = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  if (!visible || !incoming) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
      <img
        src={incoming.callerAvatar}
        alt="caller"
        className="w-28 h-28 rounded-full mb-4 shadow-lg object-cover"
      />
      <h2 className="text-white text-xl font-semibold">{incoming.callerName}</h2>
      <p className="text-white mt-1 mb-4 text-sm">
        {callAccepted ? formatDuration(duration) : 'Incoming call...'}
      </p>

      <div className="flex gap-6">
        {callAccepted ? (
          <>
            <button className="bg-white text-gray-700 p-4 rounded-full shadow hover:bg-gray-100">
              <FiMic size={20} />
            </button>
            <button className="bg-white text-gray-700 p-4 rounded-full shadow hover:bg-gray-100">
              <FiVolume2 size={20} />
            </button>
            <button
              onClick={handleEndCall}
              className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700"
            >
              <FiPhoneOff size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAccept}
              className="bg-green-600 text-white p-4 rounded-full hover:bg-green-700"
            >
              <FiPhone size={20} />
            </button>
            <button
              onClick={handleDecline}
              className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700"
            >
              <FiX size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IncomingCallOverlay;

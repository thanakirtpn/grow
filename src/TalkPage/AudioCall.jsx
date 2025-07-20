import React, { useEffect, useState } from 'react';
import { FiMic, FiVolume2, FiPhoneOff, FiX, FiPhone } from 'react-icons/fi';
import defaultAvatar from '../assets/no_pic.jpg';

const AudioCall = () => {
  const [callId, setCallId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverName, setReceiverName] = useState('Unknown');
  const [receiverAvatar, setReceiverAvatar] = useState(null);
  const [callStatus, setCallStatus] = useState('RINGING');
  const [callEndedByCaller, setCallEndedByCaller] = useState(false);
  const [callEndedByOther, setCallEndedByOther] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('data');
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        setReceiverId(parsed.receiverId);
        setReceiverName(parsed.receiverName);
        setReceiverAvatar(parsed.receiverAvatar);
      } catch (e) {
        console.error('Failed to parse call data:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!receiverId) return;

    const startCall = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`${API_BASE_URL}/api/talk/call/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({ receiverId, type: 'VOICE' }),
        });

        const data = await res.json();
        if (res.ok) {
          setCallId(data.callId);
          setCallStatus(data.status);
        } else {
          console.error('Start call failed:', data.message);
        }
      } catch (err) {
        console.error('Start call error:', err);
      }
    };

    startCall();
  }, [receiverId]);

  useEffect(() => {
    if (!callId || callEndedByCaller) return;
    const token = localStorage.getItem('authToken');

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/talk/call/${callId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.warn('Unexpected call status response:', text);
          return;
        }

        const data = await res.json();
        setCallStatus(data.status);

        if (data.status === 'ONGOING' && data.started_at) {
          const start = new Date(data.started_at);
          setStartedAt(start);
        } else if (
          data.status === 'CANCELED' ||
          data.status === 'DECLINED' ||
          data.status === 'ENDED'
        ) {
          clearInterval(interval);
          setCallEndedByOther(true);
        }
      } catch (err) {
        console.error('Poll call status failed:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [callId, callEndedByCaller]);

  useEffect(() => {
    let timer;
    if (callStatus === 'ONGOING' && startedAt) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now - startedAt) / 1000);
        setDuration(diff);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus, startedAt]);

  const handleEndCall = async () => {
    try {
      if (callId) {
        const token = localStorage.getItem('authToken');
        await fetch(`${API_BASE_URL}/api/talk/call/${callId}/cancel`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });
      }
    } catch (err) {
      console.error('Cancel call failed:', err);
    } finally {
      setCallEndedByCaller(true);
    }
  };

  const handleCallAgain = () => {
    const data = {
      receiverId,
      receiverName,
      receiverAvatar,
    };
    const url = `/audio-call?data=${encodeURIComponent(JSON.stringify(data))}`;
    window.open(url, '_blank');
    window.close();
  };

  const formatDuration = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  const avatarSrc =
    receiverAvatar && receiverAvatar !== 'null' && receiverAvatar !== 'undefined'
      ? receiverAvatar
      : defaultAvatar;

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img src={avatarSrc} alt="avatar" className="w-28 h-28 rounded-full shadow-lg object-cover" />
        <h2 className="mt-4 text-lg font-semibold text-gray-800">{receiverName}</h2>
      </div>
      <div className="flex flex-col items-center gap-6 mt-12">
        <p className="text-sm text-gray-500">
          {callStatus === 'ONGOING'
            ? formatDuration(duration)
            : callEndedByCaller
            ? 'Call ended'
            : callEndedByOther
            ? 'Call ended'
            : 'Calling...'}
        </p>

        {callEndedByOther ? (
          <div className="flex gap-6">
            <button
              onClick={handleCallAgain}
              className="bg-green-600 text-white p-4 rounded-full shadow hover:bg-green-700"
            >
              <FiPhone size={20} />
            </button>
            <button
              onClick={() => window.close()}
              className="bg-gray-400 text-white p-4 rounded-full shadow hover:bg-gray-500"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : callEndedByCaller ? (
          <div className="flex justify-center">
            <button
              onClick={() => window.close()}
              className="bg-gray-400 text-white p-4 rounded-full shadow hover:bg-gray-500"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-10">
            <button className="bg-white text-gray-600 p-4 rounded-full shadow hover:bg-gray-100">
              <FiMic size={20} />
            </button>
            <button className="bg-white text-gray-600 p-4 rounded-full shadow hover:bg-gray-100">
              <FiVolume2 size={20} />
            </button>
            <button
              onClick={handleEndCall}
              className="bg-red-600 text-white p-4 rounded-full shadow hover:bg-red-700"
            >
              <FiPhoneOff size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioCall;

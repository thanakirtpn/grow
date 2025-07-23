import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';
import myImageL from '../assets/Login.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://efad2ca833e0.ngrok-free.app'; // สอดคล้องกับ Homepost.jsx
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    console.log('Login successful, Token:', data.token);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.user.id); // ✅ จำเป็นมาก เพื่อให้ ChatSidebar และ ChatWindow ทำงานได้ เรื่อง bubble
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    }
    navigate('/Homepost');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen login-container bg-white">
      <nav className="p-4 sm:p-6 md:p-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900">
            <img src={myImageG} alt="GlowTogather Logo" className="h-5 sm:h-10 md:h-12 object-contain" />
          </Link>
          <div className="flex items-center space-x-8 poppins-font">
            <Link to="/" className="text-[#333537] font-normal text-lg hover:text-[#C53678]" style={{ fontWeight: 300 }}>
              Home
            </Link>
            <Link
              to="/JoinNow"
              className="text-[#333537] hover:text-[#C53678] font-normal text-lg px-10 py-2 flex rounded-full"
              style={{ fontWeight: 300 }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center">
        <div className="flex flex-row justify-center items-center pr-90 pl-80">
          <img src={myImageL} alt="Login" className="h-100 sm:h-110 md:h-120 object-contain" />
          <div className="text-[#333333] poppins-font whitespace-nowrap p-20">
            <p className="text-[32px] font-semibold pl-1">Nice to Meet You Again</p>
            <p className="text-base font-normal">Let’s Continue Sharing and Learning Together Every Day!</p>
            <form onSubmit={handleLogin} className="mt-8">
              <div>
                <p className="text-base font-medium">Please enter your email</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[#7E7E7E] bg-[#FEF4F4] p-3 rounded-2xl w-full max-w-2xl mb-2 pl-6 mt-2"
                />
              </div>
              <div>
                <p className="text-base font-medium">Please enter your Password</p>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[#7E7E7E] bg-[#FEF4F4] p-3 rounded-2xl w-full max-w-2xl mb-2 pl-6 mt-2"
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center ml-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#C53678] focus:ring-[#C53678] border-[#7E7E7E] rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-[#333537] font-normal">
                      Remember Me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-[#FF6250] font-normal underline">
                    Forget your password?
                  </Link>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#C53678] text-white w-[450px] h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F] disabled:bg-gray-400 ml-1 mt-5"
                style={{ fontWeight: 400 }}
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';

const Homepost = () => {
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setToken(authToken || '');

    const fetchPosts = async () => {
      if (!authToken) {
        setError('No authentication token found. Please log in.');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('https://4010-49-237-38-131.ngrok-free.app/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch posts');
        }
        setPosts(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchPosts();
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-white p-4 sm:p-6 md:p-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900"
            aria-label="Go to homepage"
          >
            <img src={myImageG} alt="GlowTogather Logo" className="h-5 sm:h-10 md:h-12 object-contain" />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="text-[#333333] px-4 py-2 rounded-lg hover:bg-gray-100 text-lg font-normal"
              style={{ fontWeight: 300 }}
            >
              Home
            </Link>
            <Link
              to="/Login"
              className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F]"
              style={{ fontWeight: 400 }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-10">
        <h1 className="text-[#333333] text-3xl font-semibold poppins-font">Welcome to Homepost</h1>
        {token ? (
          <p className="text-[#333333] text-base poppins-font mt-2">
            Authentication Token: <span className="font-mono">{token}</span>
          </p>
        ) : (
          <p className="text-red-500 text-base poppins-font mt-2">No token found. Please complete registration.</p>
        )}
        {error && <p className="text-red-500 text-base poppins-font mt-2">{error}</p>}
        {loading ? (
          <p className="text-[#333333] text-base poppins-font mt-4">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-[#333333] text-2xl font-medium poppins-font">Posts</h2>
            <ul className="mt-2 space-y-2">
              {posts.map((post) => (
                <li key={post.id} className="text-[#333333] text-base poppins-font">
                  {post.title || 'Untitled Post'}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[#333333] text-base poppins-font mt-4">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Homepost;
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';
import myImageW from '../assets/Warn.png';
import myImageS from '../assets/Setup.png';
import myImageL from '../assets/Left2.png';
import myImageR from '../assets/Right.png';
import Post from './Post';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import Header from '../components/header';
=======
import PostModal from './PostModel';
>>>>>>> Stashed changes
=======
import PostModal from './PostModel';
>>>>>>> Stashed changes

const Homepost = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);
  const [isMomentActive, setIsMomentActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [category, setCategory] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [postImageFile, setPostImageFile] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [userName, setUserName] = useState('User');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      console.warn('No auth token found');
      return {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      };
    }
    return {
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Authorization': `Bearer ${token}`,
    };
  };

  const getCategoryIcon = (categoryName) => {
    const emojis = {
      All: '📚',
      'Language and Communication': '🗣️',
      'Music and Arts': '🎵',
      'Technology and Innovation': '💻',
      'Cooking and Baking': '🍳',
      'Business and Management': '📈',
      'Science and General Knowledge': '🔬',
      'Handicrafts & DIY': '🛠️',
      'Photography and Videography': '📸',
      'Writing and Editing': '✍️',
      'Design and Creativity': '🎨',
    };
    return emojis[categoryName] || '🏷️';
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const response = await fetch('https://0b02e4248cf5.ngrok-free.app/moment/categories', {
          headers: { Accept: 'application/json', 'ngrok-skip-browser-warning': 'true' },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
=======
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://0b02e4248cf5.ngrok-free.app';
        const response = await fetch(`${API_BASE_URL}/moment/categories`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
>>>>>>> Stashed changes
=======
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://0b02e4248cf5.ngrok-free.app';
        const response = await fetch(`${API_BASE_URL}/moment/categories`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
>>>>>>> Stashed changes
        const data = await response.json();
        console.log('Categories API Response:', JSON.stringify(data, null, 2));
        const apiCategories = data.map((category) => ({
          id: category.id,
          name: category.name,
          path: `/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
        }));
        const allCategories = [{ id: null, name: 'All', path: '/all' }, ...apiCategories];
        const categoriesWithIcons = allCategories.map((category) => ({
          ...category,
          icon: getCategoryIcon(category.name),
        }));
        setCategories(categoriesWithIcons);
      } catch (err) {
        console.error('Fetch Categories Error:', err.message);
        setErrorCategories(err.message || 'Failed to fetch categories');
        setCategories([
          { id: null, name: 'All', icon: getCategoryIcon('All'), path: '/all' },
          { id: 1, name: 'Language and Communication', icon: getCategoryIcon('Language and Communication'), path: '/language' },
          { id: 2, name: 'Music and Arts', icon: getCategoryIcon('Music and Arts'), path: '/music' },
          { id: 3, name: 'Technology and Innovation', icon: getCategoryIcon('Technology and Innovation'), path: '/technology' },
          { id: 4, name: 'Cooking and Baking', icon: getCategoryIcon('Cooking and Baking'), path: '/cooking' },
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      setErrorPosts(null);
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('No auth token found, skipping posts fetch');
        setErrorPosts('ไม่มีโทเคนการยืนยันตัวตน');
        setPosts([]);
        setLoadingPosts(false);
        return;
      }
      try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        let url = 'https://0b02e4248cf5.ngrok-free.app/api/posts';
=======
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://efad2ca833e0.ngrok-free.app';
        let url = `${API_BASE_URL}/api/posts`;
>>>>>>> Stashed changes
=======
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://efad2ca833e0.ngrok-free.app';
        let url = `${API_BASE_URL}/api/posts`;
>>>>>>> Stashed changes
        if (selectedCategoryId !== null) {
          url += `?categoryId=${selectedCategoryId}`;
        }
        const response = await fetch(url, { headers: getAuthHeaders() });
        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            alert('กรุณาล็อกอินใหม่');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Posts API Response:', JSON.stringify(data, null, 2)); // Debug
        // แปลง image_url ให้เป็น full URL
        const formattedPosts = data.map((post) => ({
          ...post,
          image_url: post.image_url
            ? post.image_url.startsWith('http')
              ? post.image_url
              : `${API_BASE_URL}${post.image_url.startsWith('/') ? '' : '/'}${post.image_url}`
            : null,
        }));
        setPosts(formattedPosts);
      } catch (err) {
        console.error('Fetch Posts Error:', err.message);
        setErrorPosts(err.message || 'ไม่สามารถดึงโพสต์ได้');
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [selectedCategoryId]);

 useEffect(() => {
  const fetchProfileImage = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No auth token found, skipping profile fetch');
      setProfileImageUrl(null);
      setUserName('User');
      setLoadingImage(false);
      return;
    }
    setLoadingImage(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const profileResponse = await fetch(`${API_BASE_URL}/api/profile/me`, { headers });
      if (!profileResponse.ok) {
        throw new Error(`HTTP error! Status: ${profileResponse.status}`);
      }
      const profileData = await profileResponse.json();
      console.log('Profile Data:', profileData);

      const name = profileData.name || profileData.username || profileData.display_name || 'User';
      setUserName(name);

      let profileImageUrl = null;
      if (profileData.profileImage) {
        profileImageUrl = `${API_BASE_URL}${profileData.profileImage.startsWith('/') ? '' : '/'}${profileData.profileImage}`;
      } else if (profileData.profile_picture) {
        profileImageUrl = `${API_BASE_URL}${profileData.profile_picture.startsWith('/') ? '' : '/'}${profileData.profile_picture}`;
      } else if (profileData.profilePicture) {
        profileImageUrl = `${API_BASE_URL}${profileData.profilePicture.startsWith('/') ? '' : '/'}${profileData.profilePicture}`;
      } else {
        console.log('No profile image found in profileData, using default');
        setProfileImageUrl(null);
        return;
      }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      setLoadingImage(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      };
      try {
        const profileResponse = await fetch('https://0b02e4248cf5.ngrok-free.app/api/profile/me', { headers });
        if (!profileResponse.ok) {
          throw new Error(`HTTP error! Status: ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();
        console.log('Profile Data:', profileData);

        const name = profileData.name || profileData.username || profileData.display_name || 'User';
        setUserName(name);

        let profileImage = null;
        const storedProfileUrl = localStorage.getItem('profilePictureUrl');
        if (storedProfileUrl) {
          profileImage = storedProfileUrl;
        } else if (profileData.profileImage) {
          profileImage = `https://0b02e4248cf5.ngrok-free.app${profileData.profileImage.startsWith('/') ? '' : '/'}${profileData.profileImage}`;
        } else if (profileData.profile_picture) {
          profileImage = `https://0b02e4248cf5.ngrok-free.app${profileData.profile_picture.startsWith('/') ? '' : '/'}${profileData.profile_picture}`;
        } else if (posts.length > 0 && posts[0]?.user?.profile_picture) {
          profileImage = `https://0b02e4248cf5.ngrok-free.app${posts[0].user.profile_picture.startsWith('/') ? '' : '/'}${posts[0].user.profile_picture}`;
=======

=======

>>>>>>> Stashed changes
      if (profileImageUrl) {
        const imageResponse = await fetch(profileImageUrl, { headers });
        if (!imageResponse.ok) {
          console.error(`Image fetch error: Status ${imageResponse.status}, URL: ${profileImageUrl}`);
          throw new Error(`Image fetch failed with status ${imageResponse.status}`);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        }
        const imageBlob = await imageResponse.blob();
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setProfileImageUrl(imageObjectUrl);
        localStorage.setItem('profilePictureUrl', imageObjectUrl);
      } else {
        console.warn('No valid profile image URL found');
        setProfileImageUrl(null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      setProfileImageUrl(null);
      setUserName('User');
    } finally {
      setLoadingImage(false);
    }
  };
  fetchProfileImage();

  return () => {
    if (profileImageUrl && profileImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(profileImageUrl);
    }
  };
}, [posts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ไฟล์ภาพใหญ่เกินไป (สูงสุด 5MB)');
        setPostImageFile(null);
        setPostImagePreview(null);
        return;
      }
      setPostImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPostImagePreview(fileUrl);
    } else {
      alert('กรุณาเลือกไฟล์ที่เป็นภาพ (เช่น .jpg, .png)');
      setPostImageFile(null);
      setPostImagePreview(null);
    }
  };

  const handlePostSubmit = async (formData, submittedTitle, submittedText, submittedCategory, submittedImageFile) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No auth token found, cannot submit post');
      alert('กรุณาล็อกอินเพื่อสร้างโพสต์!');
      return;
    }

    try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      const response = await fetch('https://0b02e4248cf5.ngrok-free.app/api/posts', {
=======
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://efad2ca833e0.ngrok-free.app';
      console.log('Posting to:', `${API_BASE_URL}/api/posts`);
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
>>>>>>> Stashed changes
=======
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://efad2ca833e0.ngrok-free.app';
      console.log('Posting to:', `${API_BASE_URL}/api/posts`);
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
>>>>>>> Stashed changes
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      if (response.ok) {
        const newPost = await response.json();
        setPosts([
          {
            id: newPost.id,
            title: newPost.title,
            text: newPost.text,
            category: selectedCat?.name || category,
            image_url: newPost.image_url
              ? `https://0b02e4248cf5.ngrok-free.app${newPost.image_url.startsWith('/') ? '' : '/'}${newPost.image_url}`
              : null,
            user: { name: userName, profile_picture: profileImageUrl },
          },
          ...posts,
        ]);
        setPostTitle('');
        setPostText('');
        setCategory('');
        setPostImageFile(null);
        setPostImagePreview(null);
        setShowPostModal(false);
        alert('โพสต์สำเร็จ!');
      } else {
        const errorData = await response.json();
        console.error('Post creation failed:', JSON.stringify(errorData, null, 2));
        alert(`ไม่สามารถสร้างโพสต์ได้: ${errorData.message || 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์'}`);
=======
=======
>>>>>>> Stashed changes
      console.log('Post Response Status:', response.status, response.statusText);
      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('Post creation error details:', JSON.stringify(errorData, null, 2));
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      }

      const newPost = await response.json();
      console.log('New Post Response:', JSON.stringify(newPost, null, 2));

      const newPostForState = {
        id: newPost.id,
        title: newPost.text || submittedTitle,
        text: newPost.text || submittedText,
        category: categories.find((cat) => cat.id === newPost.categoryId) || { name: submittedCategory },
        images: newPost.images
          ? newPost.images.startsWith('http')
            ? newPost.images
            : `${API_BASE_URL}${newPost.images.startsWith('/') ? '' : '/'}${newPost.images}`
          : null,
        user: {
          name: userName,
          profile_picture: profileImageUrl,
        },
      };

      setPosts([newPostForState, ...posts]);
      alert('โพสต์สำเร็จ!');
    } catch (error) {
      console.error('Error posting:', error.message);
      throw error;
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleFindClick = () => {
    console.log('Find clicked');
  };

  const handleMomentClick = () => {
    console.log('Moment clicked, showCategories:', !showCategories);
    setShowCategories(!showCategories);
    setIsMomentActive(!showCategories);
  };

  const handleTalkClick = () => {
    console.log('Talk clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' });

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!scrollRef.current || touchStart === null) return;
    const touchCurrent = e.touches[0].clientX;
    const diff = touchStart - touchCurrent;
    scrollRef.current.scrollLeft += diff;
    setTouchStart(touchCurrent);
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // JSX เดิมจากโค้ดชุดที่สอง (รวม PostModal)
  return (
    <div className="bg-white min-h-screen">
      {/* <nav className="bg-white p-4 sm:p-6 md:p-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900"
            aria-label="Go to homepage"
          >
            <img src={myImageG} alt="GlowTogather Logo" className="h-5 sm:h-10 md:h-12 object-contain" onError={(e) => console.error('Logo load error:', e)} />
          </Link>
          <ul className="hidden sm:flex text-[#333333] text-base sm:text-base md:text-base px-4 py-2 rounded-lg font-normal poppins-font gap-6 pl-60">
            <li>
              <Link
                className="w-[68px] h-[32px] px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={handleTalkClick}
                style={{ fontWeight: 300 }}
              >
                Talk
              </Link>
            </li>
            <li>
              <Link
                className="w-[68px] h-[32px] px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={handleFindClick}
                style={{ fontWeight: 300 }}
              >
                Find
              </Link>
            </li>
            <li>
              <Link
                className={`w-[68px] h-[32px] px-4 py-2 rounded-lg cursor-pointer ${isMomentActive ? 'text-[#C53678]' : 'hover:bg-gray-100'}`}
                onClick={handleMomentClick}
                style={{ fontWeight: 300 }}
              >
                Moment
              </Link>
            </li>
            <li>
              <Link
                className="w-[68px] h-[32px] px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={handleProfileClick}
                style={{ fontWeight: 300 }}
              >
                Profile
              </Link>
            </li>
          </ul>
          <button className="sm:hidden text-[#333333] text-2xl" onClick={toggleMenu} aria-label="Toggle navigation menu">
            {isOpen ? '✕' : '☰'}
          </button>
          <div
            className={`flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-0 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent ${
              isOpen ? 'flex' : 'hidden sm:flex'
            }`}
          >
            <div className="flex items-center gap-4 bg-white pl-30">
              <div className="relative w-full max-w-[250px] sm:max-w-sm">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-6 pr-10 py-3 rounded-full text-[#B0B0B0] bg-[#F4F4F5] focus:outline-none focus:ring-2 focus:ring-black focus:border-black poppins-font font-normal max-w-[250px] sm:max-w-sm text-sm sm:text-sm"
                />
                <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-[#7E7E7E]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/" className="flex text-3xl sm:text-4xl md:text-5xl hover:text-gray-900" aria-label="Warn">
                  <img src={myImageW} alt="Warn Icon" className="h-9 sm:h-9 md:h-9 object-contain" onError={(e) => console.error('Warn icon load error:', e)} />
                </Link>
                <Link to="/" className="flex text-3xl sm:text-4xl md:text-5xl hover:text-gray-900" aria-label="Setup">
                  <img src={myImageS} alt="Setup Icon" className="h-9 sm:h-9 md:h-9 object-contain" onError={(e) => console.error('Setup icon load error:', e)} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav> */}
      <Header />

      {showCategories && (
        <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg mx-auto max-w-screen-lg">
          {loadingCategories && <p className="text-center text-gray-700">Loading categories...</p>}
          {errorCategories && <p className="text-center text-red-500">Error: {errorCategories}</p>}
          {!loadingCategories && !errorCategories && categories.length > 0 && (
            <div className="container mx-auto">
              <div className="pl-10 p-4 bg-white border border-[#E8E8EA] rounded-2xl shadow-md max-w-[930px] mx-auto" onClick={() => setShowPostModal(true)}>
                <form className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 border-4 border-[#FF6250] rounded-full flex items-center justify-center">
                      {loadingImage ? (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <span>Loading...</span>
                        </div>
                      ) : profileImageUrl ? (
                        <img
                          src={profileImageUrl}
                          alt="Profile"
                          className="w-12 h-12 rounded-full"
                          onError={(e) => {
                            console.error('Profile image load error:', e);
                            setProfileImageUrl(myImageG);
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-[#F3F3F3] rounded-full flex items-center justify-center">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative flex-1 p-6 pl-7 border border-[#E8E8EA] bg-[#F3F3F3] max-w-20xl mx-auto rounded-3xl"
                      onClick={() => setShowPostModal(true)}
                    >
                      <p className="absolute text-[#7E7E7E] poppins-font text-base font-normal" style={{ top: '11px' }}>
                        Ask a question or start a post
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4 p-1 pl-1">
                    <button
                      type="button"
                      className="add-media-button no-style px-4 py-3 bg-[#FEF4F4] text-[#333333] rounded-lg flex items-center poppins-font text-base font-medium"
                      onClick={() => document.getElementById('mainFileInput').click()}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add media
                    </button>
                    <input
                      type="file"
                      id="mainFileInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      className="add-media-button no-style flex items-center px-4 py-3 bg-[#FEF4F4] text-[#333333] rounded-lg poppins-font text-base font-medium"
                      onClick={() => setShowPostModal(true)}
                    >
                      Add Category
                      <svg className="w-5 h-5 mr-2 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9l7 7 7-7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <p className="text-[#333333] font-semibold text-lg sm:text-xl md:text-2xl poppins-font p-2 sm:p-4 mb-0 sm:mb-0 text-left">Latest Post</p>
              <div className="flex items-center justify-center gap-0 sm:gap-1 mt-0 sm:mt-0">
                <button
                  onClick={scrollLeft}
                  className="p-2 sm:p-3 rounded-full border-none bg-transparent outline-none no-style hover:underline"
                  aria-label="Scroll left"
                >
                  <img src={myImageL} alt="Scroll Left" className="w-20 sm:w-36 h-5 sm:h-12" onError={(e) => console.error('Scroll left icon load error:', e)} />
                </button>
                <div
                  ref={scrollRef}
                  className="flex items-center gap-1 sm:gap-2 overflow-x-scroll scrollbar-hide"
                  style={{ touchAction: 'pan-x' }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {categories.map((category) => (
                    <div key={category.id} className="relative inline-block group">
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.id);
                        }}
                        className={`border px-2 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-sm md:text-sm font-light poppins-font flex items-center gap-1 sm:gap-2 justify-center w-auto whitespace-nowrap 
                          ${selectedCategoryId === category.id ? 'bg-[#C53678] border-[#C53678] text-white' : 'text-[#C53678] border-[#C53678] hover:bg-[#C53678] hover:text-white'}`}
                        style={{ fontWeight: 300 }}
                      >
                        <span className="text-sm sm:text-sm font-medium" role="img" aria-label={category.name}>
                          {category.icon || '🏷️'}
                        </span>
                        <span className="text-sm sm:text-sm md:text-sm font-medium poppins-font group-hover:text-white">
                          {category.name}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollRight}
                  className="p-2 sm:p-3 rounded-full hover:bg-gray-100 border-none bg-transparent outline-none no-style hover:underline"
                  aria-label="Scroll right"
                >
                  <img src={myImageR} alt="Scroll Right" className="w-20 sm:w-36 h-5 sm:h-12" onError={(e) => console.error('Scroll right icon load error:', e)} />
                </button>
              </div>
              <section className="container mx-auto p-1 sm:p-2 md:p-4 mt-0 sm:mt-0">
                {loadingPosts && <p className="text-center text-gray-700">Loading posts...</p>}
                {errorPosts && <p className="text-center text-red-500">Error fetching posts: {errorPosts}</p>}
                {!loadingPosts && !errorPosts && posts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {posts.map((post) => (
                      <Post key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  !loadingPosts && !errorPosts && <p className="text-center text-gray-700">No posts available.</p>
                )}
              </section>
            </div>
          )}
          {showPostModal && (
            <PostModal
              show={showPostModal}
              onClose={() => {
                setShowPostModal(false);
                setPostImageFile(null);
                setPostImagePreview(null);
              }}
              userName={userName}
              profileImageUrl={profileImageUrl}
              loadingImage={loadingImage}
              categories={categories}
              onPostSubmit={handlePostSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postText={postText}
              setPostText={setPostText}
              postImagePreview={postImagePreview}
              setPostImagePreview={setPostImagePreview}
              postImageFile={postImageFile}
              setPostImageFile={setPostImageFile}
            />
          )}
          {!loadingCategories && !errorCategories && categories.length === 0 && (
            <p className="text-center text-gray-700">No categories available.</p>
          )}
        </div>
      )}
      <style>
        {`
          select {
            background-image: none;
          }
          select::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 8px;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 10px solid #333333;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default Homepost;
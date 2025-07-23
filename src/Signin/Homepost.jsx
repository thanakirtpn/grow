import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';
import myImageW from '../assets/Warn.png';
import myImageS from '../assets/Setup.png';
import myImageL from '../assets/Left2.png';
import myImageR from '../assets/Right.png';
import Post from './Post';
import PostModal from './PostModel';
import Header from '../components/header';

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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      };
    }
    return {
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
      Authorization: `Bearer ${token}`,
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

  const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const response = await fetch(`${API_BASE_URL}/moment/categories`, {
          headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
        const data = await response.json();
        const apiCategories = data.map((category) => ({
          id: category.id,
          name: category.name,
          path: `/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
          icon: getCategoryIcon(category.name),
        }));
        setCategories([{ id: null, name: 'All', path: '/all', icon: getCategoryIcon('All') }, ...apiCategories]);
      } catch (err) {
        setErrorCategories(err.message || 'Failed to fetch categories');
        setCategories([]); // Avoid hardcoded fallback to prevent ID mismatches
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categories.length && selectedCategoryId !== null) return; // Wait for categories if filtering
      setLoadingPosts(true);
      setErrorPosts(null);
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorPosts('Please log in to view posts');
        setLoadingPosts(false);
        return;
      }
      try {
        let url = `${API_BASE_URL}/api/posts`;
        if (selectedCategoryId !== null) {
          url += `?categoryId=${selectedCategoryId}`;
        }
        const response = await fetch(url, { headers: getAuthHeaders() });
        if (!response.ok) {
          if (response.status === 401) {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
          }
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const data = await response.json();
        const formattedPosts = data.map((post) => ({
          ...post,
          category: categories.find((cat) => cat.id === post.category_id) || { name: 'Uncategorized' },
          image_url: post.image_url ? normalizeImageUrl(post.image_url) : null,
        }));
        setPosts(formattedPosts);
      } catch (err) {
        setErrorPosts(err.message || 'Failed to fetch posts');
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [selectedCategoryId, categories.length]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setProfileImageUrl(null);
        setUserName('User');
        setLoadingImage(false);
        return;
      }
      setLoadingImage(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/profile/me`, {
          headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error(`Failed to fetch profile: ${response.status}`);
        const profileData = await response.json();
        const name = profileData.name || profileData.username || profileData.display_name || 'User';
        setUserName(name);

        const imageField = profileData.profileImage || profileData.profile_picture || profileData.profilePicture;
        if (imageField) {
          const imageUrl = normalizeImageUrl(imageField);
          const imageResponse = await fetch(imageUrl, { headers: getAuthHeaders() });
          if (!imageResponse.ok) throw new Error(`Failed to fetch profile image: ${imageResponse.status}`);
          const imageBlob = await imageResponse.blob();
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          setProfileImageUrl(imageObjectUrl);
          localStorage.setItem('profilePictureUrl', imageObjectUrl);
        } else {
          setProfileImageUrl(null);
        }
      } catch (error) {
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
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file is too large (max 5MB)');
        setPostImageFile(null);
        setPostImagePreview(null);
        return;
      }
      setPostImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPostImagePreview(fileUrl);
    } else {
      alert('Please select an image file (e.g., .jpg, .png)');
      setPostImageFile(null);
      setPostImagePreview(null);
    }
  };

  const handlePostSubmit = async (formData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to create a post!');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to create post: ${response.status}`);
      }

      const newPost = await response.json();
      const newPostForState = {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        category: categories.find((cat) => cat.id === newPost.categoryId) || { name: 'Uncategorized' },
        image_url: newPost.images?.[0]?.image_url ? normalizeImageUrl(newPost.images[0].image_url) : null,
        user: { username: userName, profile_picture: profileImageUrl },
        created_at: new Date().toISOString(),
      };
      setPosts((prevPosts) => [newPostForState, ...prevPosts]);
      alert('Post created successfully!');
      setShowPostModal(false);
      setPostTitle('');
      setPostText('');
      setPostImageFile(null);
      setPostImagePreview(null);
    } catch (error) {
      alert(`Failed to create post: ${error.message}`);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const selectedCat = categories.find((cat) => cat.id === categoryId);
    setCategory(selectedCat ? selectedCat.name : '');
  };

  const handleFindClick = () => {
    // Implement find functionality
  };

  const handleMomentClick = () => {
    setShowCategories(!showCategories);
    setIsMomentActive(!showCategories);
  };

  const handleTalkClick = () => {
    // Implement talk functionality
  };

  const handleProfileClick = () => {
    // Implement profile functionality
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
                  <img src={myImageW} alt="Warn Icon" className="h-9 sm:h-9 md:h-9 object-contain" />
                </Link>
                <Link to="/" className="flex text-3xl sm:text-4xl md:text-5xl hover:text-gray-900" aria-label="Setup">
                  <img src={myImageS} alt="Setup Icon" className="h-9 sm:h-9 md:h-9 object-contain" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
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
                          onError={() => setProfileImageUrl(null)}
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
                  <img src={myImageL} alt="Scroll Left" className="w-20 sm:w-36 h-5 sm:h-12" />
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
                  <img src={myImageR} alt="Scroll Right" className="w-20 sm:w-36 h-5 sm:h-12" />
                </button>
              </div>
              <section className="container mx-auto p-1 sm:p-2 md:p-4 mt-0 sm:mt-0">
                {loadingPosts && <p className="text-center text-gray-700">Loading posts...</p>}
                {errorPosts && <p className="text-center text-red-500">Error fetching posts: {errorPosts}</p>}
                {!loadingPosts && !errorPosts && posts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {posts.map((post) => (
                      <Post
                        key={post.id}
                        post={post}
                        categories={categories}
                        onPostCreated={(newPost) => setPosts((prevPosts) => [newPost, ...prevPosts])}
                      />
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
                setPostTitle('');
                setPostText('');
                setCategory('');
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
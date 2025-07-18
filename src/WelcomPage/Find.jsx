import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';
import myImageL from '../assets/Left2.png';
import myImageR from '../assets/Right.png';
import PostCard from './PostCard';

function Find() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [isMomentActive, setIsMomentActive] = useState(false);

  const getCategoryIcon = (categoryName) => {
    const emojis = {
      'All': '📚',
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
        const response = await fetch('https://0b02e4248cf5.ngrok-free.app/moment/categories', {
          headers: { 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Categories API Response:', data);

        const apiCategories = data.map(category => ({
          id: category.id,
          name: category.name,
          path: `/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
        }));

        const allCategories = [{ id: 'all', name: 'All', path: '/all' }, ...apiCategories];
        const categoriesWithIcons = allCategories.map(category => ({
          ...category,
          icon: getCategoryIcon(category.name),
        }));
        console.log('Categories with Icons:', categoriesWithIcons);

        setCategories(categoriesWithIcons);
      } catch (err) {
        console.error('Fetch Categories Error:', err);
        setErrorCategories(err.message || 'Failed to fetch categories');
        setCategories([
          { id: 'all', name: 'All', icon: getCategoryIcon('All'), path: '/all' },
          { id: '1', name: 'Language and Communication', icon: getCategoryIcon('Language and Communication'), path: '/language' },
          { id: '2', name: 'Music and Arts', icon: getCategoryIcon('Music and Arts'), path: '/music' },
          { id: '3', name: 'Technology and Innovation', icon: getCategoryIcon('Technology and Innovation'), path: '/technology' },
          { id: '4', name: 'Cooking and Baking', icon: getCategoryIcon('Cooking and Baking'), path: '/cooking' },
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
      try {
        let url = 'https://0b02e4248cf5.ngrok-free.app/moment';
        if (selectedCategoryId !== null) {
          url += `?categoryId=${selectedCategoryId}`;
        }
        const response = await fetch(url, {
          headers: { 
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true' 
          },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Posts API Response:', data);
        setPosts(data);
      } catch (err) {
        console.error('Fetch Posts Error:', err);
        setErrorPosts(err.message || 'Failed to fetch posts');
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleFindClick = () => {
    setShowCategories(true);
    console.log('Find clicked');
  };

  const handleMomentClick = () => {
    setShowCategories(!showCategories);
    setIsMomentActive(!showCategories);
    console.log('Moment clicked');
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
    <nav className="bg-white p-4 sm:p-6 md:p-8">
      {/* <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900" aria-label="Go to homepage">
          <img src={myImageG} alt="GlowTogether Logo" className="h-5 sm:h-10 md:h-12 object-contain" />
        </Link>
        <ul className="hidden sm:flex text-[#333333] text-base sm:text-base md:text-base px-4 py-2 rounded-lg font-normal poppins-font gap-6">
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
              className={`w-[68px] h-[32px] px-4 py-2 rounded-lg cursor-pointer ${isMomentActive ? 'text-[#C53678]' : 'hover:bg-white-100'}`}
              onClick={handleMomentClick}
              style={{ fontWeight: 300 }}
            >
              Moment
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
          <Link
            to="/Login"
            className="w-[68px] h-[32px] px-4 py-2 rounded-lg hover:bg-gray-100"
            aria-label="Login to your account"
            style={{ fontWeight: 300 }}
          >
            Login
          </Link>
          <Link
            to="/JoinNow"
            className="bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg hover:bg-[#A12C5F]"
            style={{ fontWeight: 400 }}
          >
            Join Now
          </Link>
        </div>
      </div> */}
      {showCategories && (
        <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg mx-auto max-w-screen-lg">
          {loadingCategories && <p className="text-center text-gray-700">Loading categories...</p>}
          {errorCategories && <p className="text-center text-red-500">Error: {errorCategories}</p>}
          {!loadingCategories && !errorCategories && categories.length > 0 && (
            <div className="container mx-auto">
              <p className="text-[#333333] font-semibold text-lg sm:text-xl md:text-2xl poppins-font p-2 sm:p-4 mb-0 sm:mb-0 text-left">Latest Post</p>
              <div className="flex items-center justify-center gap-0 sm:gap-1 mt-0 sm:mt-0 ">
                <button
                  onClick={scrollLeft}
                  className="p-2 sm:p-3 rounded-full border-none bg-transparent outline-none no-style hover:underline"
                  aria-label="Scroll left"
                >
                  <img src={myImageL} alt="Scroll Left" className="w-20 sm:w-36 h-5 sm:h-12 " />
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
                    <div key={category.id ?? category.name} className="relative inline-block group">
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.id);
                        }}
                        className={`border px-2 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-sm md:text-sm font-light poppins-font flex items-center gap-1 sm:gap-2 justify-center w-auto whitespace-nowrap 
                          ${selectedCategoryId === category.id
                            ? 'bg-[#C53678] border-[#C53678] text-white'
                            : 'text-[#C53678] border-[#C53678] hover:bg-[#C53678] hover:text-white'
                          }`}
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
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  !loadingPosts && !errorPosts && <p className="text-center text-gray-700">No posts available.</p>
                )}
              </section>
            </div>
          )}
          {!loadingCategories && !errorCategories && categories.length === 0 && (
            <p className="text-center text-gray-700">No categories available.</p>
          )}
        </div>
      )}
    </nav>
  );
}

export default Find;
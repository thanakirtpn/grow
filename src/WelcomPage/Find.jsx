import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';
import myImageL from '../assets/Left2.png';
import myImageR from '../assets/Right.png';
import PostCard from './Postcard'; // ตรวจสอบชื่อไฟล์ว่าเป็น PostCard.jsx หรือ Postcard.jsx

function Find() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const scrollRef = useRef(null);
  
  // ใช้ loading/error state แยกกันสำหรับ categories และ posts เพื่อความชัดเจน
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false); 
  const [errorCategories, setErrorCategories] = useState(null); 

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All'); // เก็บชื่อหมวดหมู่ที่ถูกเลือก

  const getCategoryIcon = (categoryName) => {
    // **สำคัญมาก:** ถ้าต้องการ Font Awesome icons ต้อง:
    // 1. ติดตั้ง Font Awesome ใน public/index.html (เพิ่ม CDN Link)
    // 2. กำหนดค่าใน object นี้เป็น Font Awesome class name (เช่น 'fas fa-language')
    // 3. ใช้ <i className={category.icon}></i> ใน JSX แทน <span>{category.icon}</span>
    const icons = {
      'All': 'fas fa-th-large', // หรือ icon อื่นที่เหมาะสม
      'Language and Communication': 'fas fa-language',
      'Music and Arts': 'fas fa-music',
      'Technology and Innovation': 'fas fa-laptop-code',
      'Cooking and Baking': 'fas fa-utensils',
      'Business and Management': 'fas fa-chart-line',
      'Science and General Knowledge': 'fas fa-flask',
      'Handicrafts & DIY': 'fas fa-palette', // หรือ icon อื่น
      'Photography and Videography': 'fas fa-camera',
      'Writing and Editing': 'fas fa-pen-alt',
      'Design and Creativity': 'fas fa-lightbulb', // หรือ icon อื่น
    };
    return icons[categoryName] || 'fas fa-tag'; // Default icon หากไม่พบ
  };
  

  // --- useEffect สำหรับ Fetch Categories ---
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true); // ใช้ loadingCategories
      setErrorCategories(null);   // ใช้ errorCategories
      try {
        const response = await fetch('https://cf07-223-24-156-219.ngrok-free.app/moment/categories', {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
        });
        if (!response.ok) {
          const errorText = await response.text(); 
          console.error('Non-OK Categories response:', response.status, errorText);
          throw new Error(`HTTP error! Status: ${response.status}. Response was: ${errorText.substring(0, 100)}...`);
        }
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          throw new Error('Invalid JSON response: ' + parseErr.message + '. Raw text: ' + text.substring(0, 100) + '...');
        }
        console.log('Categories API Response:', data);
        
        const apiCategories = data.map((category) => ({ // data.map(category) ถูกต้องแล้ว
          name: category.name,
          path: `/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
        }));

        const customCategories = [{ name: 'All', path: '/all' }];
        const allCategories = [
          ...customCategories,
          ...apiCategories.filter((c) => c.name !== 'All'),
        ];

        const categoriesWithIcons = allCategories.map((cat) => ({
          ...cat,
          icon: getCategoryIcon(cat.name),
        }));

        setCategories(categoriesWithIcons);
      } catch (err) {
        console.error('Fetch Categories Error:', err);
        setErrorCategories(err.message || 'Failed to fetch categories');
        // ใช้ getCategoryIcon สำหรับ fallback categories ด้วย
        const fallbackCategories = [
          { name: 'All', icon: getCategoryIcon('All'), path: '/all' },
          { name: 'Language and Communication', icon: getCategoryIcon('Language and Communication'), path: '/language' },
          { name: 'Music and Arts', icon: getCategoryIcon('Music and Arts'), path: '/music' },
          { name: 'Technology and Innovation', icon: getCategoryIcon('Technology and Innovation'), path: '/technology' },
          { name: 'Cooking and Baking', icon: getCategoryIcon('Cooking and Baking'), path: '/cooking' },
        ];
        setCategories(fallbackCategories);
      } finally {
        setLoadingCategories(false); // ใช้ setLoadingCategories
      }
    };

    fetchCategories();
  }, []);

  // --- useEffect สำหรับ Fetch Posts (เหมือนเดิม) ---
  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      setErrorPosts(null);
      try {
        const response = await fetch('https://cf07-223-24-156-219.ngrok-free.app/moment', { 
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
        });
        if (!response.ok) {
          const errorText = await response.text(); 
          console.error('Non-OK Posts response:', response.status, errorText);
          throw new Error(`HTTP error! Status: ${response.status}. Response was: ${errorText.substring(0, 100)}...`);
        }
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          throw new Error('Invalid JSON response for posts: ' + parseErr.message + '. Raw text: ' + text.substring(0, 100) + '...');
        }
        console.log('Posts API Response:', data); 
        setPosts(data);
        setFilteredPosts(data); // เริ่มต้นให้แสดง posts ทั้งหมด
      } catch (err) {
        console.error('Fetch Posts Error:', err);
        setErrorPosts(err.message || 'Failed to fetch posts');
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const handleFindClick = () => {
    setShowCategories(!showCategories);
    console.log('Find clicked');
  };

  const handleMomentClick = () => {
    // กำหนดให้ Moment ไม่สลับ showCategories หากคุณต้องการให้มันมีพฤติกรรมเฉพาะของมัน
    // หรือให้มันปิดแถบหมวดหมู่เสมอเมื่อคลิก
    setShowCategories(!showCategories); 
    console.log('Moment clicked');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  // ฟังก์ชันจัดการเมื่อคลิกที่ปุ่มหมวดหมู่
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // ตั้งค่าหมวดหมู่ที่ถูกเลือก

    if (categoryName === 'All') {
      setFilteredPosts(posts); // แสดง posts ทั้งหมดเมื่อเลือก 'All'
    } else {
      const filtered = posts.filter(post => 
        post.category && post.category.name === categoryName
      );
      setFilteredPosts(filtered); // กรอง posts ตามหมวดหมู่ที่เลือก
    }
  };
  
  return (
    <nav className='bg-white p-4 sml:p-8'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          to='/'
          className='text-black font-bold text-3xl sm:text-5xl hover:text-gray-900'
          aria-label='Go to homepage'
        >
          <img
            src={myImageG}
            alt='GlowTogether Logo'
            className='h-0 sm:h-3 md:h-8 lg:h-12 object-contain'
          />
        </Link>
        <ul className='flex text-[#333333] justify-between text-base sm:text-lg px-4 py-2 rounded-lg font-light poppins-font transition duration-300 ease-in-out gap-6'>
          <li>
            <Link
              className='text-[#333333] w-[68px] h-[32px] text-base sm:text-lg px-4 py-2 rounded-lg font-light poppins-font transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer'
              onClick={handleFindClick}
              style={{ fontWeight: 300 }}
            >
              Find
            </Link>
          </li>
          <li>
            <Link
              className='text-[#333333] w-[68px] h-[32px] text-base sm:text-lg px-4 py-2 rounded-lg font-light poppins-font transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer'
              onClick={handleMomentClick}
              style={{ fontWeight: 300 }}
            >
              Moment
            </Link>
          </li>
        </ul>
        <button
          className='sm:hidden text-[#333333] text-2xl'
          onClick={toggleMenu}
          aria-label='Toggle navigation menu'
        >
          {isOpen ? '✕' : '☰'}
        </button>
        <div
          className={`flex-col sm:flex-row items-center gap-6 p-4 sm:p-0 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <Link
            to='/Login'
            className='text-[#333333] w-[68px] h-[32px] text-base sm:text-lg px-4 py-2 rounded-lg font-light poppins-font hover:bg-gray-100 transition duration-300 ease-in-out'
            aria-label='Login to your account'
            style={{ fontWeight: 300 }}
          >
            Login
          </Link>
          <Link
            to='/JoinNow'
            className='bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg poppins-font hover:bg-[#A12C5F] transition duration-300 ease-in-out'
            style={{ fontWeight: 400 }}
          >
            Join Now
          </Link>
        </div>
      </div>
      {showCategories && (
        <div className='p-4 sm:p-8 relative bg-white-200 rounded-lg'>
          {loadingCategories && <p className='text-center text-gray-700'>Loading categories...</p>}
          {errorCategories && <p className='text-center text-red-500'>Error: {errorCategories}</p>}
          {!loadingCategories && !errorCategories && categories.length > 0 && (
            <div className='flex items-center justify-center'>
              <button
                onClick={scrollLeft}
                className='flex-shrink-0 bg-white p-2 rounded-full hover:bg-gray-100 transition duration-300 mr-2'
                aria-label="Scroll left"
              >
                <img src={myImageL} alt='Scroll Left' className='w-10 h-10' />
              </button>
              <div
                ref={scrollRef}
                className='flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 flex-grow' // scrollbar-hide ต้องมาจาก tailwind-scrollbar plugin
              >
                {categories.map((category) => (
                  <Link
                    key={category.name} // ใช้ category.name เป็น key
                    to="#" // ใช้ # เพื่อป้องกันการเปลี่ยนหน้า
                    onClick={(e) => { // รับ event e มาด้วย
                      e.preventDefault(); // ป้องกันการ reload หน้าเว็บ
                      handleCategoryClick(category.name);
                    }}
                    className={`
                      flex-shrink-0 border-1 px-3 py-1 rounded-full text-base sm:text-lg font-light poppins-font
                      flex items-center gap-2 justify-center w-auto whitespace-nowrap transition duration-300 ease-in-out
                      ${selectedCategory === category.name
                        ? 'bg-[#C53678] border-[#C53678] text-white' // สีเมื่อถูกเลือก
                        : 'bg-white border-[#C53678] text-[#C53678] hover:bg-[#C53678] hover:text-white' // สีปกติ
                      }
                    `}
                    style={{ fontWeight: 300 }}
                  >
                    {/* ใช้ i tag สำหรับ Font Awesome icon */}
                    <i className={`${category.icon} text-lg`}></i> 
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
              <button
                onClick={scrollRight}
                className='flex-shrink-0 bg-white p-2 rounded-full hover:bg-gray-100 transition duration-300 ml-2'
                aria-label="Scroll right"
              >
                <img src={myImageR} alt='Scroll Right' className='w-10 h-10' />
              </button>
            </div>
          )}
          {!loadingCategories && !errorCategories && categories.length === 0 && (
            <p className='text-center text-gray-700'>No categories available.</p>
          )}
        </div>
      )}

      {/* --- ส่วนแสดงผล Posts --- */}
      <section className='container mx-auto p-4 sm:p-8 mt-4'>
        {loadingPosts && <p className='text-center text-gray-700'>Loading posts...</p>}
        {errorPosts && <p className='text-center text-red-500'>Error fetching posts: {errorPosts}</p>}
        
        {!loadingPosts && !errorPosts && filteredPosts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !loadingPosts && !errorPosts && (
            <p className='text-center text-gray-700'>No posts available for this category.</p>
          )
        )}
      </section>
    </nav>
  );
}

export default Find;
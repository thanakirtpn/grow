import React, { useState, useRef, useEffect } from 'react';
import Cook from '../assets/Cook.png';
import Music from '../assets/Music.png';
import Techno from '../assets/Technology.png';
import Language from '../assets/Language.jpg';
import Business from '../assets/Business.jpg';
import Sciensce from '../assets/Science.jpg';
import Handicrafts from '../assets/Handicrafts.jpg';
import Photo from '../assets/Photography.jpg';
import Writing from '../assets/Writing.jpg';
import Design from '../assets/Design.jpg';
import { Link } from 'react-router-dom';

function Knowlwdge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const categories = [
    {
      name: 'Cooking and Baking',
      image: Cook,
    },
    {
      name: 'Music and Arts',
      image: Music,
    },
    {
      name: 'Technology and',
      nameII: 'Innovation',
      image: Techno,
    },
    {
      name: 'Language and',
      nameII: 'Communication',
      image: Language,
    },
    {
      name: 'Business and',
      nameII: 'Management',
      image: Business,
    },
    {
      name: 'Science and',
      nameII: 'General Knowledge',
      image: Sciensce,
    },
    {
      name: 'Handicrafts & DIY',
      image: Handicrafts,
    },
    {
      name: 'Photography and',
      nameII: 'Videography',
      image: Photo,
    },
    {
      name: 'Writing and Editing',
      image: Writing,
    },
    {
      name: 'Design and Creativity',
      image: Design,
    },
  ];

const getVisibleDotIndex = () => {
    if (!carouselRef.current) return 0;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.children[0]?.offsetWidth || 270;
    return Math.round(scrollLeft / (cardWidth + 8));
  };

  const scrollToCategory = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 270;
      const scrollPosition = index * (cardWidth + 8);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  // การจัดการการลากด้วยเมาส์
  const handleMouseDown = (e) => {
    if (carouselRef.current) {
      isDragging.current = true;
      startX.current = e.pageX;
      scrollLeftStart.current = carouselRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setCurrentIndex(getVisibleDotIndex());
    }
  };

  const handleTouchStart = (e) => {
    if (carouselRef.current) {
      startX.current = e.touches[0].pageX;
      scrollLeftStart.current = carouselRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e) => {
    if (!carouselRef.current) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  useEffect(() => {
    const handleScroll = () => {
      setCurrentIndex(getVisibleDotIndex());
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll, { passive: true });
      carousel.addEventListener('mousedown', handleMouseDown);
      carousel.addEventListener('mousemove', handleMouseMove);
      carousel.addEventListener('mouseup', handleMouseUp);
      carousel.addEventListener('mouseleave', handleMouseUp);
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
        carousel.removeEventListener('mousedown', handleMouseDown);
        carousel.removeEventListener('mousemove', handleMouseMove);
        carousel.removeEventListener('mouseup', handleMouseUp);
        carousel.removeEventListener('mouseleave', handleMouseUp);
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0]?.offsetWidth || 270;
        const maxIndex = Math.max(
          0,
          Math.floor((carouselRef.current.scrollWidth - cardWidth) / (cardWidth + 8))
        );
        if (currentIndex > maxIndex) {
          setCurrentIndex(maxIndex);
          scrollToCategory(maxIndex);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  return (
    <div className='bg-rose-50 min-h-screen flex flex-col items-center justify-center py-20 overflow-x-hidden'>
      <div className='container mx-auto text-center text-black py-5'>
        <h1 className='text-4xl md:text-4xl lg:text-4xl font-semibold poppins-font text-center'>
          <span className='text-[#333333]'>What</span>
          <span className='text-[#FF5841] ml-2'>Knowledge</span>
          <span className='text-[#333333] ml-2'>Are You Curious About?</span>
        </h1>
        <h2 className='text-[#333333] text-xl md:text-xl lg:text-xl mt-4 leading-loose text-center font-medium'>
          From languages to cooking, explore posts in 10 diverse categories to share and<br />discover new knowledge.
        </h2>
      </div>
      <div className='relative w-full max-w-4xl mx-auto'>
        <div
          ref={carouselRef}
          className='flex overflow-x-hidden snap-x snap-mandatory space-x-20 p-4 scrollbar-hidden touch-auto'
          style={{ scrollBehavior: 'smooth', userSelect: 'none' }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className='min-w-[210px] bg-white rounded-2xl shadow-md flex-shrink-0 p-0 snap-center border border-black-500'
              style={{ touchAction: 'pan-x' }}
            >
              <img
                src={category.image}
                alt={category.name}
                className='w-full h-40 object-cover rounded-t-lg'
                draggable={false}
              />
              <p className='text-center mt-5 text-[#333333] font-medium min-h-[70px] break-words leading-6 text-lg whitespace-normal'>{category.name}
                {category.nameII && <><br />{category.nameII}</>} </p>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-12 space-x-2'>
          {categories.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-red-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              } cursor-pointer transition-all duration-300 ease-in-out`}
              onClick={() => scrollToCategory(index)}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hidden {
          will-change: transform;
        }
      `}</style>
      <div className='flex items-center justify-center my-0 mx-auto max-w-screen-xl px-10 p-12'>
           <Link to="/Find" className="bg-[#C53678] text-white w-[300px] h-[50px] flex items-center justify-center rounded-[25px] font-medium text-lg poppins-font hover:bg-[#A12C5F] transition duration-300 ease-in-out"style={{ fontWeight: 400 }}>View All Knowlwge Categories</Link>
      </div>
    </div>
  );
}

export default Knowlwdge;
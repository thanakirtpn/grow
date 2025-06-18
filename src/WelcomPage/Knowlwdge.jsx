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
    const cardWidth = carouselRef.current.children[0]?.offsetWidth || 200;
    return Math.round(scrollLeft / (cardWidth + 16));
  };

  const scrollToCategory = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 200;
      const scrollPosition = index * (cardWidth + 16);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  // Auto-scroll ทุก 3 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % categories.length;
      scrollToCategory(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, categories.length]);

  // ลากด้วยเมาส์
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
        const cardWidth = carouselRef.current.children[0]?.offsetWidth || 200;
        const maxIndex = Math.max(
          0,
          Math.floor((carouselRef.current.scrollWidth - cardWidth) / (cardWidth + 16))
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
    <div className="bg-rose-50 min-h-screen flex flex-col items-center justify-center py-10 sm:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 text-center text-black py-4 sm:py-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold poppins-font text-center">
          <span className="text-[#333333]">What</span>
          <span className="text-[#FF5841] ml-1 sm:ml-2">Knowledge</span>
          <span className="text-[#333333] ml-1 sm:ml-2">Are You Curious About?</span>
        </h1>
        <h2 className="text-[#333333] text-base sm:text-lg md:text-xl mt-2 sm:mt-4 leading-relaxed text-center font-medium">
          From languages to cooking, explore posts in 10 diverse categories to share and
          <br className="hidden sm:inline" />
          discover new knowledge.
        </h2>
      </div>
      <div className="relative w-full max-w-[90%] sm:max-w-3xl md:max-w-4xl mx-auto">
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory space-x-17 p-2 sm:p-4 scrollbar-hidden touch-auto"
          style={{ scrollBehavior: 'smooth', userSelect: 'none' }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white rounded-2xl shadow-md flex-shrink-0 p-0 snap-center border border-black-50"
              style={{ touchAction: 'pan-x' }}
            >
              <img
                src={category.image}
                alt={`${category.name}${category.nameII ? ` ${category.nameII}` : ''}`}
                className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-t-lg"
                draggable={false}
                aria-label={`Category: ${category.name}${category.nameII ? ` ${category.nameII}` : ''}`}
              />
              <p className="text-center mt-3 sm:mt-4 text-[#333333] font-medium min-h-[60px] sm:min-h-[70px] break-words leading-5 sm:leading-6 text-base sm:text-lg whitespace-normal">
                {category.name}
                {category.nameII && (
                  <>
                    <br />
                    {category.nameII}
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 sm:mt-10 space-x-1 sm:space-x-2">
          {categories.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
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
    </div>
  );
}

export default Knowlwdge;
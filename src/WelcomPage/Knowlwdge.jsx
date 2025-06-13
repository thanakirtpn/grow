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
      name: 'Technology and Innovation',
      image: Techno,
    },
    {
      name: 'Language and Communication',
      image: Language,
    },
    {
      name: 'Business and Management',
      image: Business,
    },
    {
      name: 'Science and General Knowledge',
      image: Sciensce,
    },
    {
      name: 'Handicrafts & DIY',
      image: Handicrafts,
    },
    {
      name: 'Photography and Videography',
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
    const cardWidth = carouselRef.current.children[0]?.offsetWidth || 240;
    return scrollLeft / (cardWidth + 8); // 8 is space-x-8
  };

  const scrollToCategory = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 240;
      const scrollPosition = index * (cardWidth + 8);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0]?.offsetWidth || 240;
        const maxIndex = Math.floor(carouselRef.current.scrollWidth / (cardWidth + 8)) - 1;
        if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  return (
    <div className='bg-rose-50 min-h-screen flex flex-col items-center justify-center py-30 overflow-x-hidden'>
      <div className='container mx-auto text-center text-black py-5'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-center'>
          <span className='text-black'>What</span>
          <span className='text-orange-500 ml-2'>Knowledge</span>
          <span className='text-black ml-2'>Are You Curious About?</span>
        </h1>
        <h2 className='text-lg md:text-xl lg:text-2xl mt-4 leading-loose text-center'>
          From languages to cooking, explore posts in 10 diverse categories to share and<br />discover new knowledge.
        </h2>
      </div>
      <div className='relative w-full max-w-4xl mx-auto'>
        <div ref={carouselRef} className='flex overflow-x-auto space-x-8 p-4 scrollbar-hide'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='min-w-[270px] bg-white rounded-lg shadow-md flex-shrink-0 p-0'
            >
              <img src={category.image} alt={category.name} className='w-full h-40 object-cover rounded-t-lg' />
              <p className='text-center mt-3 text-black'>{category.name}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-30 space-x-2'>
          {categories.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === Math.round(getVisibleDotIndex()) ? 'bg-red-500' : 'bg-gray-300'
              }`}
              onClick={() => scrollToCategory(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Knowlwdge;
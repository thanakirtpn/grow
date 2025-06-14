import React, { useState } from 'react';
import Thee from '../assets/Thee.png';
import Pair from '../assets/Pair.png';
import Leo from '../assets/Leo.png';
import Thai from '../assets/Thai.png';
import Eng from '../assets/Eng.png';
import Right from '../assets/Right.png'
import Left from '../assets/Left2.png'

function Connect() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const buddies = [
    { img: Thee, alt: 'Three', flag: Thai, name: 'Thee', desc: 'Draw everything from heart' },
    { img: Pair, alt: 'Pair', flag: Thai, name: 'Pair', desc: 'The Kitchen is mine' },
    { img: Leo, alt: 'Leo', flag: Eng, name: 'Leo', desc: 'Numbers light me up' },
  ];

  const nextBuddy = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buddies.length);
  };

  const prevBuddy = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + buddies.length) % buddies.length);
  };

  return (
    <div className='bg-white min-h-screen flex flex-col items-center justify-center p-6 overflow-x-hidden'>
      <div className='container mx-auto text-center space-y-6'>
        <h1 className='text-center poppins-text font-semibold'>
          <span className='text-[#333333] text-4xl'>Connect with Skill</span>
          <span className='text-[#FF5841] ml-1 text-4xl'>Buddies</span>
        </h1>
        <h2 className='text-xl md:text-2xl text-[#333333] mt-4 leading-loose text-center'>Looking to share skills and learn? Your perfect match is just a click away.</h2>
      </div>
      <div className='py-5 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative'>
        <div className="relative py-10">
          {currentIndex === 0 && (
            <>
              <img src={Thee} alt='Three' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Thai} alt='Thai' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
          {currentIndex === 1 && (
            <>
              <img src={Pair} alt='Pair' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Thai} alt='Thai' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
          {currentIndex === 2 && (
            <>
              <img src={Leo} alt='Leo' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Eng} alt='Eng' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
        </div>
        <div className='relative py-10'>
          {currentIndex === 0 && (
            <>
              <img src={Pair} alt='Pair' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Thai} alt='Thai' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
          {currentIndex === 1 && (
            <>
              <img src={Leo} alt='Leo' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Eng} alt='Eng' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
          {currentIndex === 2 && (
            <>
              <img src={Thee} alt='Three' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Thai} alt='Thai' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
        </div>
        <div className='relative py-10'>
          {currentIndex === 0 && (
            <>
              <img src={Leo} alt='Leo' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Eng} alt='Eng' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
          {currentIndex === 1 && (
            <>
              <img src={Thee} alt='Three' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Thai} alt='Thai' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
          {currentIndex === 2 && (
            <>
              <img src={Pair} alt='Pair' className='w-50 h-50 md:w-56 md:h-56 rounded-lg object-cover' />
              <img src={Thai} alt='Thai' className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-2xl shadow-md' />
            </>
          )}
        </div>
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 z-50'>
          <span onClick={prevBuddy} className='cursor-pointer p-0'>
            <img src={Left} alt="Previous" className='w-15 h-15 text-gray-500 hover:text-gray-700' />
          </span>
        </div>
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 z-50'>
          <span onClick={nextBuddy} className='cursor-pointer p-0'>
            <img src={Right} alt="Next" className='w-15 h-15 text-gray-500 hover:text-gray-700' />
          </span>
        </div>
      </div>
      <div className='relative py-0 container mx-auto flex items-center justify-center space-x-58'>
        {currentIndex === 0 && (
          <>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font'>Thee</h2>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-[-10px]'>Pair</h2>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-[-14px]'>Leo</h2>
          </>
        )}
        {currentIndex === 1 && (
          <>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-2'>Pair</h2>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-2'>Leo</h2>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-0'>Thee</h2>
          </>
        )}
        {currentIndex === 2 && (
          <>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-3'>Leo</h2>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-[-0px]'>Thee</h2>
            <h2 className='text-2xl sm:text-2xl font-semibold text-[#333333] poppins-font translate-x-[-10px]'>Pair</h2>
          </>
        )}
      </div>
      <div className='relative py-0 container mx-auto flex items-center justify-center space-x-26'>
        {currentIndex === 0 && (
          <>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-3'>Draw everything from heart</p>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-[-26px]'>The Kitchen is mine</p>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-[-44px]'>Numbers light me up.</p>
          </>
        )}
        {currentIndex === 1 && (
          <>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-13'>The Kitchen is mine</p>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-10'>Numbers light me up.</p>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-[-12px]'>Draw everything from heart</p>
          </>
        )}
        {currentIndex === 2 && (
          <>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-11'>Numbers light me up.</p>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-[-12px]'>Draw everything from heart</p>
            <p className='text-lg sm:text-lg text-[#333333] poppins-font text-center max-w-xs font-normal translate-x-[-55px]'>The Kitchen is mine</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Connect;
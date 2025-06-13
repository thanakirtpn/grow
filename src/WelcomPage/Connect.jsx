import React, { useState } from 'react';
import Thee from '../assets/Thee.png';
import Pair from '../assets/Pair.png';
import Leo from '../assets/Leo.png';
import Thai from '../assets/Thai.png';
import Eng from '../assets/Eng.png';

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
        <h1 className='text-3xl md:text-3xl font-extrabold text-center'>
          <span className='text-black'>Connect with Skill</span>
          <span className='text-orange-500 ml-1'>Buddies</span>
        </h1>
        <h2 className='text-xl md:text-2xl mt-4 leading-loose text-center'>Looking to share skills and learn? Your perfect match is just a click away.</h2>
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
          <span onClick={prevBuddy} className='text-3xl text-gray-500 hover:text-gray-700 cursor-pointer border-none bg-transparent outline-none p-0'>
            &lt;
          </span>
        </div>
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 z-50'>
          <span onClick={nextBuddy} className='text-3xl text-gray-500 hover:text-gray-700 cursor-pointer border-none bg-transparent outline-none p-0'>
            &gt;
          </span>
        </div>
      </div>
      <div className='relative py-0 container mx-auto flex items-center justify-center space-x-58'>
        {currentIndex === 0 && (
          <>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Thee</h2>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Pair</h2>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Leo</h2>
          </>
        )}
        {currentIndex === 1 && (
          <>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Pair</h2>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Leo</h2>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Thee</h2>
          </>
        )}
        {currentIndex === 2 && (
          <>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Leo</h2>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Thee</h2>
            <h2 className='text-xl sm:text-2xl font-extrabold text-black'>Pair</h2>
          </>
        )}
      </div>
      <div className='relative py-0 container mx-auto flex items-center justify-center space-x-26'>
        {currentIndex === 0 && (
          <>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>Draw everything from heart</p>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>The Kitchen is mine</p>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>Numbers light me up.</p>
          </>
        )}
        {currentIndex === 1 && (
          <>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>The Kitchen is mine</p>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>Numbers light me up.</p>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>Draw everything from heart</p>
          </>
        )}
        {currentIndex === 2 && (
          <>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>Numbers light me up.</p>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>Draw everything from heart</p>
            <p className='text-base sm:text-lg text-black text-center max-w-xs'>The Kitchen is mine</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Connect;
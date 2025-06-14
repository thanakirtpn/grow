import React from 'react'
import myImage from '../assets/Removal-826 1.png'
import myImageT from '../assets/Group 8.png'

function Shareknow() {
  
  return (
    <div className='bg-white p-4 sm:p-8 flex flex-col items-center'>
      <div className='container mx-auto flex flex-col items-center text-center gap-6'>
        <h2 className='text-lg sm:text-xl md:text-2xl mt-4 text-[#333333] font-medium poppins-font'>GlowTogether</h2>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold poppins-font'>
              <span className='text-[#333333] poppins-font'>Share </span>
              <span className='text-[#FF5841] poppins-font'>Knowledge,</span>
          </h1>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold poppins-font'>Build New Bonds</h1>
        <div className='flex justify-center items-center mt-6 sm:mt-10 w-full max-w-md'>
          <div className='relative w-full'>
            <input type='text' placeholder='Find Skills to Share and Learn...' className='w-full pl-6 pr-10 py-2 border border-gray-200 rounded-full text-[#7E7E7E] bg-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black poppins-font font-normal text-sm max-w-[240px] sm:max-w-sm sm:text-base' />
            <div className='absolute inset-y-0 right-10 flex items-center pr-3 pointer-events-none'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5 text-[#7E7E7E]'>
                 <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
        <div className='elative w-full h-[200px] sm:h-[300px] flex justify-start items-center mt-8 sm:mt-12 overflow-hidden'>
          <img src={myImage} alt='Me' className='max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-[700px] h-auto object-contain'></img>
          {/* <div className='absolute bottom-[69px] left-1/2 -translate-x-1/105 w-full max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-1100px] h-auto object-contain'>
            <img src={myImageT} alt='MeT' className='w-2000 sm:w-3000 md:w-4000 lg:w-5000 xl:w-6000 h-auto object-contain'></img>
          </div> */}
        </div>
      </div>
  )
}

export default Shareknow

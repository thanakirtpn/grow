import React from 'react'
import myImage from '../assets/Removal-826 1.png'
import myImageT from '../assets/Group 8.png'

function Shareknow() {
  
  return (
    <div className='bg-white text-[#333333] py-10 pb-12'>
      <div className='container mx-auto px-4 text-center leading-loose'>
        <h2 className='text-xl md:text-2xl mt-4 leading-loose mr-auto text-center md:text-center text-[#333333] font-medium poppins-font'>GlowTogether</h2>
        <div className='container mx auto text-center md:text-center'>
          <h1 className='text-5xl md:text-5xl font-bold text-center'>
              <span className='text-[#333333] poppins-font'>Share </span>
              <span className='text-[#FF5841] poppins-font'>Knowledgo,</span>
          </h1>
        </div>
        <h1 className='text-5xl md:text-5xl font-bold  poppins-font leading-loose text-center'>Build New Bonds</h1>
        <div className='flex justify-center items-center mt-10'>
          <div className='relative relative w-full max-w-md'>
            <input type="text" placeholder="Find Skills to Share and Learn..." className="w-full pl-5 pr-2 py-2 border border-black-100 rounded-full text-[#7E7E7E] bg-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-vlack-500 poppins-font font-normal" />
            <div className='absolute inset-y-0 right-0 left-100 flex items-center pr-3 pointer-events-none'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-190 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
        <div className='relative w-full h-[300px] flex justify-center items-center mt-12 overflow-hidden'>
          <img src={myImage} alt='Me' className='absolute bottom-0 left-1/4 -translate-x-1/2 w-full max-w-[400px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-[700px] 2xl:max-w-[700px] h-auto object-contain'></img>
          {/* <div className='absolute bottom-[69px] left-1/2 -translate-x-1/105 w-full max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-1100px] h-auto object-contain'>
            <img src={myImageT} alt='MeT' className='w-2000 sm:w-3000 md:w-4000 lg:w-5000 xl:w-6000 h-auto object-contain'></img>
          </div> */}
        </div>
      </div>
  )
}

export default Shareknow

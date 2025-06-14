import React from 'react'
import myImageJ from '../assets/Join.png'
import myImageM from '../assets/Match.png'
import myImageL from '../assets/Learn.png'
import { Link } from 'react-router-dom';

function World() {
  return (
    <div className='bg-[#FEF4F4] p-6 sm:p-10 flex flex-col items-center overflow-x-hidden'>
      <div className='container mx-auto px-4 max-w-screen-xl flex flex-col items-center justify-center min-h-[200px] text-center gap-4'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl mt-4 text-[#333333] font-medium poppins-font'>Unlock a World of Knowledge</h2>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold poppins-font text-[#333333]'>Thrive Together by Sharing Insights</h1>
      </div>
      <div className='text-center py-10 mx-auto max-w-screen-xl'>
      <div className='flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-24'>
        <div className="flex items-center justify-center space-y-10 md:space-y-0 md:space-x-30 lg:space-x-55">
          <img src={myImageJ} alt='MeJ' className='w-24 h-24 md:w-24 md:h-24'></img>
          <img src={myImageM} alt='MeM' className='w-24 h-24 md:w-24 md:h-24'></img>
          <img src={myImageL} alt='MeL' className='w-24 h-24 md:w-24 md:h-24'></img>
        </div>
      </div>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center space-x-25 text-center md:text-center'>
           <h2 className='text-xl md:text-2xl font-semibold poppins-font mt-4 text-[#333333] translate-x-[-17px]'>Join in Seconds</h2>
           <h2 className='text-xl md:text-2xl font-semibold poppins-font mt-4 text-[#333333]'>Match with Ease</h2>
           <h2 className='text-xl md:text-2xl font-semibold poppins-font mt-4 text-[#333333] translate-x-6'>Learn and Grow</h2>
          </div>
          <div className='flex justify-center space-x-12 sm:space-x-20 space-y-15 flex-wrap text-center mx-auto max-w-screen-xl px-4 flex-wrap text-center mx-auto max-w-screen-xl'>
           <p className='text-sm sm:text-base text-[#333333] poppins-font mt-2 text-center translate-x-[-10px] min-w-[120px]' style={{ fontWeight: 400 }}>Sign up easily and start<br/>sharing.</p>
           <p className='text-sm sm:text-base text-[#333333] poppins-font mt-2 text-center translate-x-8 min-w-[120px]' style={{ fontWeight: 400 }}>Find the right skill partner<br/>effortlessly</p>
           <p className='text-sm sm:text-base text-[#333333] poppins-font mt-2 text-center translate-x-12 min-w-[120px]' style={{ fontWeight: 400 }}>Share knowledge and discover <br/>new perspectives</p>
          </div>
        </div>
        <div className='flex items-center justify-center my-0 mx-auto max-w-screen-xl px-4'>
           <Link to="/Find" className="bg-[#C53678] text-white w-[208px] h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg poppins-font hover:bg-[#A12C5F] transition duration-300 ease-in-out"style={{ fontWeight: 400 }}>Start Exploring</Link>
        </div>
      </div>
    </div>
  )
}

export default World

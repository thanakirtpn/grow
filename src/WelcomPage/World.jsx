import React from 'react'
import myImageJ from '../assets/Join.png'
import myImageM from '../assets/Match.png'
import myImageL from '../assets/Learn.png'
import { Link } from 'react-router-dom';

function World() {
  return (
    <div className='bg-rose-50 p-30 space-between overflow-x-hidden pb-60'>
      <div className='container mx auto text-center leading-loose'>
        <h2 className='text-xl md:text-2xl mt-4 leading-loose text-center'>Unlock a World of Knowledge</h2>
        <h1 className='text-3xl md:text-3xl font-extrabold text-center'>Thrive Together by Sharing Insights</h1>
      </div>
      <div className='text-center py-10'>
        <div className='flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-24'>
         <div className="flex items-center justify-start space-y-10 md:space-y-0 md:space-x-24 lg:space-x-35">
          <img src={myImageJ} alt='MeJ' className='w-25 h-25 md:w-24 md:h-24'></img>
          <img src={myImageM} alt='MeM' className='w-25 h-25 md:w-24 md:h-24'></img>
          <img src={myImageL} alt='MeL' className='w-25 h-25 md:w-24 md:h-24'></img>
         </div>
        </div>
        <div className='flex flex-col items-center'>
         <div className='flex justify-start space-x-16 text-center md:text-center'>
           <h2 className='text-xl md:text-2xl font-extrabold text-balck mt-4 leading-loose'>Join in Seconds</h2>
           <h2 className='text-xl md:text-2xl font-extrabold text-balck mt-4 leading-loose'>Match with Ease</h2>
           <h2 className='text-xl md:text-2xl font-extrabold text-balck mt-4 leading-loose'>Learn and Grow</h2>
         </div>
         <div className='flex justify-start space-x-14 text-center md:text-center'>
           <p className='text-base text-black mt-2 ml-10 text-center'>Sign up easily and start<br/>sharing.</p>
           <p className='text-base text-black mt-2 ml-2 text-center'>Find the right skill partner<br/>effortlessly</p>
           <p className='text-base text-black mt-2 ml-0 text-center'>Share knowledge and discover <br/>new perspectives</p>
         </div>
        </div>
      </div>
      <div className='flex items-center justify-center mt-2'>
        <Link to="/Find" className="bg-pink-700 text-white px-11 py-4 flex rounded-full hover:bg-rose-700 transition-colors duration-300">Start Exploring</Link>
        {/* <a href='#' className='bg-pink-700 text-white px-11 py-4 flex rounded-full hover:bg-rose-700 transition-colors duration-300'>Start Exploring</a> */}
      </div>
    </div>
  )
}

export default World

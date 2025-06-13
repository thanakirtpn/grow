import React from 'react'
import myImageS from '../assets/Successful.png'
import myImageK from '../assets/Skill.png'
import myImageTo from '../assets/Total.png'

function Skills() {
  return (
    <div className='bg-white-50 min-h-screen flex flex-col items-center justify-center overflow-x-hidden pb-5 mt-10'>
      <div className='container mx auto text-center text-balck py-5'>
        <h1 className='text-3xl md:text-3xl font-extrabold text-center'>
            <span className='text-balck'>GlowTogether Building</span>
            <span className='text-orange-500 ml-[1rem]'>Skills</span>
            <span className='text-balck ml-[1rem]'>Globally</span>
        </h1>
        <h2 className='text-xl md:text-2xl mt-4 leading-loose text-center]'>From languages to cooking, explore posts in 20 diverse skill categories to share and learn</h2>
      </div>
      <div className='text-center py-10'>
            <div className='flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-24'>
               <div className="flex items-center justify-start space-y-20 md:space-y-0 md:space-x-24 lg:space-x-35">
                 <img src={myImageK} alt='MeJ' className='w-25 h-25 md:w-24 md:h-24'></img>
                 <img src={myImageTo} alt='MeM' className='w-25 h-25 md:w-24 md:h-24'></img>
                 <img src={myImageS} alt='MeL' className='w-25 h-25 md:w-24 md:h-24'></img>
               </div>
            </div>
            <div className='flex flex-col items-center'>
               <div className='flex justify-start space-x-35 text-center md:text-center'>
                 <h2 className='text-xl md:text-2xl font-extrabold text-balck mt-4 leading-loose'>1,500+</h2>
                 <h2 className='text-xl md:text-2xl font-extrabold text-balck mt-4 leading-loose'>5,200+</h2>
                 <h2 className='text-xl md:text-2xl font-extrabold text-balck mt-4 leading-loose'>15,000+</h2>
               </div>
            <div className='flex justify-start space-x-22 text-center md:text-center'>
                 <p className='text-base text-black mt-2 ml-0 text-center'>Successful Matches</p>
                 <p className='text-base text-black mt-2 ml-0 text-center'>Skill Swaps Completed</p>
                 <p className='text-base text-black mt-2 ml-0 text-center'>Total Users</p>
            </div>
            <div className='flex justify-start text-center md:text-center mt-30'>
                 <p className='text-base text-black mt-2 ml-0 text-center'>2025 GlowTogeTogether. All Rights Reserved.</p>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Skills

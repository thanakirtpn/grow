import React from 'react'
import myImageS from '../assets/Successful.png'
import myImageK from '../assets/Skill.png'
import myImageTo from '../assets/Total.png'

function Skills() {
  return (
    <div className='bg-white-50 min-h-screen flex flex-col items-center justify-center overflow-x-hidden pb-20 mt-10'>
      <div className='container mx auto text-center text-balck py-5'>
        <h1 className='text-4xl md:text-4xl text-center font-semibold'>
            <span className='text-[#333333] poppins-font'>GlowTogether Building</span>
            <span className='text-[#FF5841] poppins-font ml-[1rem]'>Skills</span>
            <span className='text-[#333333] poppins-font ml-[1rem]'>Globally</span>
        </h1>
        <h2 className='text-xl md:text-xl mt-4 leading-loose text-center text-[#333333] poppins-font font-medium]'>From languages to cooking, explore posts in 20 diverse skill categories to share and learn</h2>
      </div>
      <div className='text-center py-10'>
            <div className='flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-24'>
               <div className="flex items-center justify-center space-y-10 md:space-y-0 md:space-x-30 lg:space-x-55">
                 <img src={myImageK} alt='MeJ' className='w-24 h-24 md:w-24 md:h-24'></img>
                 <img src={myImageTo} alt='MeM' className='w-24 h-24 md:w-24 md:h-24'></img>
                 <img src={myImageS} alt='MeL' className='w-24 h-24 md:w-24 md:h-24'></img>
               </div>
            </div>
            <div className='flex flex-col items-center'>
               <div className='flex justify-center space-x-25 text-center md:text-center text-[#333333] poppins-font'>
                 <h2 className='text-xl md:text-2xl font-medium poppins-font mt-4 leading-loose translate-x-[-125px]'>1,500+</h2>
                 <h2 className='text-xl md:text-2xl font-medium poppins-font mt-4 leading-loose translate-x-3'>5,200+</h2>
                 <h2 className='text-xl md:text-2xl font-medium poppins-font mt-4 leading-loose translate-x-35'>15,000+</h2>
               </div>
            <div className='flex justify-start space-x-22 text-center md:text-center text-[#333333] poppins-font'>
                 <p className='text-base mt-2 ml-0 text-center font-normal translate-x-[-95px]'>Successful Matches</p>
                 <p className='text-base mt-2 ml-0 text-center font-normal translate-x-[-35px]'>Skill Swaps Completed</p>
                 <p className='text-base mt-2 ml-0 text-center font-normal translate-x-14'>Total Users</p>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Skills

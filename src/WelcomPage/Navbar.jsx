import React from 'react'
import myImageG from '../assets/GlowTogather logo.png'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='bg-white-200 p-8 space-between'>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className='text-black-800 font-bold text-5xl hover:text-black-900'>
          <img src={myImageG} alt='MeG' className='w-26s h-9 object-contain'></img>
        </Link>
        <div className='flex items-center space-x-45'>
            <Link to="/Login" className="text-[#333333] w-[68px] h-[32px] top-[34px] left-[1117px] text-lg px-4 py-2 rounded-lg font-light poppins-font hover:bg-white-100 transition duration-300 ease-in-out"style={{ fontWeight: 300 }}>Login</Link>
            <Link to="/JoinNow" className="bg-[#C53678] text-white w-[175px] h-[50px] flex items-center justify-center rounded-[20px] font-light poppins-font hover:bg-[#A12C5F] transition duration-300 ease-in-out absolute top-[35px] left-[1215px]"style={{ fontWeight: 300 }}>Join Now</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

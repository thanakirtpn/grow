import React from 'react'
import myImageG from '../assets/GlowTogather logo.png'
import { Link } from 'react-router-dom'
import myImageL from '../assets/Login.jpg'

function Login() {
  return (
    <nav className='bg-white p-4 sm:p-6 md:p-8'>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className='flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900'>
            <img src={myImageG} alt='MeG' className='h-5 sm:h-10 md:h-12 object-contain'></img>
          </Link>
          <div className='flex items-center space-x-8 poppins-font'>
            <Link to="/" className='text-[#333537] font-normal text-lg hover:text-[#C53678]' style={{ fontWeight: 300 }}>Home</Link>
            <Link to="/TabBarRegister" className='text-[#333537] hover:text-[#C53678] font-normal text-lg px-10 py-2 flex rounded-full' style={{ fontWeight: 300 }}>Sign up</Link>
          </div>
        </div>
      <div className="flex-grow flex justify-center items-center p-30 pr-150">
          <img src={myImageL} alt='Login' className='h-90 sm:h-100 md:h-110 object-contain'></img>

      </div>
    </nav>
  )
}

export default Login

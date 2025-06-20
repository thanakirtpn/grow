import React from 'react'
import { Link } from 'react-router-dom'
import myImageG from '../assets/GlowTogather logo.png'

function JoinNow() {
  return (
    <nav className='bg-white-200 p-8 space-between'>
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className='text-black-800 font-bold text-2xl hover:text-black-900'>
              <img src={myImageG} alt='MeG' className='w-26s h-9 object-contain'></img>
            </Link>
            <div className='flex items-center space-x-3'>
                <Link to="/" className="bg-white text-black-600 px-4 py-2 rounded-lg font-semibold hover:bg-white-100 transition duration-300 ease-in-out">Home</Link>
                <Link to="/Login" className="bg-pink-700 text-white px-10 py-2 rounded-full font-semibold hover:bg-rose-700 transition duration-300 ease-in-out">Login</Link>
            </div>
          </div>
    </nav>
  )
}

export default JoinNow

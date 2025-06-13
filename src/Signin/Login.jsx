import React from 'react'
import myImageG from '../assets/GlowTogather logo.png'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <nav className='bg-white-200 p-8 space-between'>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="../compronents/WelcomPage" className='text-blue-800 font-bold text-2xl hover:text-blue-900'>
            <img src={myImageG} alt='MeG' className='w-26s h-9 object-contain'></img>
          </Link>
          <div className='flex items-center space-x-8'>
            <Link to="/" className='text-black-800 font-medium hover:text-blue-900'>Home</Link>
            <Link to="/" className='text-rose-700 px-10 py-2 flex rounded-full'>Sign up</Link>
          </div>
        </div>
      <div className="flex-grow flex justify-center items-center p-30">
          <h1 className="text-3xl font-bold text-black-800">Welcome to the Login Page!</h1>
      </div>
    </nav>
  )
}

export default Login

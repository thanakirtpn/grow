import { useState } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-white p-4 sm:p-8'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-black font-bold text-3xl sm:text-5xl hover:text-gray-900' aria-label='Go to homepage'>
          <img src={myImageG} alt='GlowTogeTogether Logo' className='w-20 sm:w-26 h-6 sm:h-9 object-contain' />
        </Link>
        <button
          className='sm:hidden text-[#333333] text-2xl'
          onClick={toggleMenu}
          aria-label='Toggle navigation menu'
        >
          {isOpen ? '✕' : '☰'}
        </button>
        <div className={`flex-col sm:flex-row items-center gap-6 p-4 sm:p-0 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden sm:flex'}`}>
          <Link to='/Login' className='text-[#333333] w-[68px] h-[32px] text-base sm:text-lg px-4 py-2 rounded-lg font-light poppins-font hover:bg-gray-100 transition duration-300 ease-in-out' aria-label='Login to your account' style={{ fontWeight: 300 }}>Login</Link>
          <Link to='/JoinNow' className='bg-[#C53678] text-white w-[150px] sm:w-[175px] h-[40px] sm:h-[50px] flex items-center justify-center rounded-[20px] font-medium text-lg poppins-font hover:bg-[#A12C5F] transition duration-300 ease-in-out' aria-label='Join now to create an account'> Join Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

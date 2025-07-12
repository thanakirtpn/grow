import { useState } from 'react';
import { Link } from 'react-router-dom';
import myImageG from '../assets/GlowTogather logo.png';
import myImageW from '../assets/Warn.png';
import myImageS from '../assets/Setup.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMomentActive, setIsMomentActive] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-[14px] flex items-center justify-between">
        
        {/* Logo */}
        <div className="w-[140px]">
          <Link to="/" className="flex items-center">
            <img src={myImageG} alt="GlowTogether Logo" className="h-5 sm:h-6 object-contain" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-6 text-[#333333] text-sm font-normal poppins-font">
            <li><Link className="hover:text-[#C53678]">Talk</Link></li>
            <li><Link className="hover:text-[#C53678]">Find</Link></li>
            <li>
              <Link
                className={`hover:text-[#C53678] ${isMomentActive ? 'text-[#C53678]' : ''}`}
                onClick={() => setIsMomentActive(!isMomentActive)}
              >
                Moment
              </Link>
            </li>
            <li><Link className="hover:text-[#C53678]">Profile</Link></li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="w-[140px] flex justify-end items-center gap-2">
          <Link to="/"><img src={myImageW} alt="Warn" className="h-5 object-contain" /></Link>
          <Link to="/"><img src={myImageS} alt="Setup" className="h-5 object-contain" /></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

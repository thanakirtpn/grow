import React, { useState } from 'react';

const header = () => {
  return (
    <div>
       <nav className="bg-white p-4 sm:p-6 md:p-8">
              <div className="container mx-auto flex justify-between items-center">
                <Link
                  to="/"
                  className="flex items-center text-black font-bold text-3xl sm:text-4xl md:text-5xl hover:text-gray-900"
                  aria-label="Go to homepage"
                >
                  <img src={myImageG} alt="GlowTogather Logo" className="h-5 sm:h-10 md:h-12 object-contain" onError={(e) => console.error('Logo load error:', e)} />
                </Link>
                <ul className="hidden sm:flex text-[#333333] text-base sm:text-base md:text-base px-4 py-2 rounded-lg font-normal poppins-font gap-6 pl-60">
                  <li>
                    <Link
                      className="w-[68px] h-[32px] px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={handleTalkClick}
                      style={{ fontWeight: 300 }}
                    >
                      Talk
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-[68px] h-[32px] px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={handleFindClick}
                      style={{ fontWeight: 300 }}
                    >
                      Find
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`w-[68px] h-[32px] px-4 py-2 rounded-lg cursor-pointer ${isMomentActive ? 'text-[#C53678]' : 'hover:bg-gray-100'}`}
                      onClick={handleMomentClick}
                      style={{ fontWeight: 300 }}
                    >
                      Moment
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-[68px] h-[32px] px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={handleProfileClick}
                      style={{ fontWeight: 300 }}
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <button className="sm:hidden text-[#333333] text-2xl" onClick={toggleMenu} aria-label="Toggle navigation menu">
                  {isOpen ? '✕' : '☰'}
                </button>
                <div
                  className={`flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-0 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent ${
                    isOpen ? 'flex' : 'hidden sm:flex'
                  }`}
                >
                  <div className="flex items-center gap-4 bg-white pl-30">
                    <div className="relative w-full max-w-[250px] sm:max-w-sm">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-6 pr-10 py-3 rounded-full text-[#B0B0B0] bg-[#F4F4F5] focus:outline-none focus:ring-2 focus:ring-black focus:border-black poppins-font font-normal max-w-[250px] sm:max-w-sm text-sm sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#7E7E7E]"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link to="/" className="flex text-3xl sm:text-4xl md:text-5xl hover:text-gray-900" aria-label="Warn">
                        <img src={myImageW} alt="Warn Icon" className="h-9 sm:h-9 md:h-9 object-contain" onError={(e) => console.error('Warn icon load error:', e)} />
                      </Link>
                      <Link to="/" className="flex text-3xl sm:text-4xl md:text-5xl hover:text-gray-900" aria-label="Setup">
                        <img src={myImageS} alt="Setup Icon" className="h-9 sm:h-9 md:h-9 object-contain" onError={(e) => console.error('Setup icon load error:', e)} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
    </div>
  )
}

export default header

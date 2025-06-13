import React from 'react'
import WalletLogo from '../public/Wallet.png'

function NavBar() {
  return (
    <nav className='bg-sky-200 p-4'>
      <img src={WalletLogo} className="logo" alt="Wallet logo" />
    </nav>
  )
}

export default NavBar

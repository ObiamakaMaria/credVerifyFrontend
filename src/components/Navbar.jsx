import React from 'react'
import ConnectButton from './WalletConnect'; // Import the connect button

const Navbar = () => {
  return (
    <nav className="bg-navbar-gradient px-8 py-4 flex items-center justify-between">
      {/* Left side: Logo and Title */}
      <div className="flex items-center">
        <img src="/CredVerify-Logo.png" alt="CredVerify Logo" className="h-8 w-auto" /> 
        <h1 className="font-amarante text-2xl text-white ml-3">CredVerify</h1>
      </div>

      {/* Middle: Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="#" className="text-gray-300 hover:text-white">How It Works</a>
        <a href="#" className="text-gray-300 hover:text-white">Features</a>
        <a href="#" className="text-gray-300 hover:text-white">Community</a>
      </div>

      {/* Right side: Connect Wallet Button */}
      <div>
        <ConnectButton />
      </div>
    </nav>
  )
}

export default Navbar
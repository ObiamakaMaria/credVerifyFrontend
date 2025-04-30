import React, { useState } from 'react';
import ConnectButton from './WalletConnect'; // Import the connect button
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-navbar-gradient px-4 md:px-20 py-4 flex items-center justify-between relative z-50">
      {/* Left side: Logo and Title */}
      <div className="flex items-center">
        <img src="/src/assets/CredVerify-Logo.png" alt="CredVerify Logo" className="h-8 w-auto" />
        <h1 className="font-amarante text-2xl text-white ml-3">CredVerify</h1>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none ml-auto"
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Middle: Navigation Links (Desktop) */}
      <div className="hidden md:flex items-center font-thin gap-6 font-beVietnamPro text-md">
        <a href="#" className="text-gray-300 hover:text-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white">How It Works</a>
        <a href="#" className="text-gray-300 hover:text-white">Features</a>
        <a href="#" className="text-gray-300 hover:text-white">Community</a>
      </div>

      {/* Right side: Connect Wallet Button (optional) and Launch App (Desktop) */}
      {/* <div className="hidden md:block">
        <ConnectButton />
      </div> */}
      <Link to="/dashboard" className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-4 py-2 ml-4 hover:opacity-90 transition">
        Launch App
      </Link>


      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1a093a] shadow-lg flex flex-col items-center py-6 space-y-4 md:hidden animate-fade-in z-50">
          <a href="#" className="text-gray-300 hover:text-white text-lg" onClick={handleClose}>Home</a>
          <a href="#" className="text-gray-300 hover:text-white text-lg" onClick={handleClose}>How It Works</a>
          <a href="#" className="text-gray-300 hover:text-white text-lg" onClick={handleClose}>Features</a>
          <a href="#" className="text-gray-300 hover:text-white text-lg" onClick={handleClose}>Community</a>
          {/* <ConnectButton /> */}
          <Link to="/dashboard" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-4 py-2 mt-2 hover:opacity-90 transition" onClick={handleClose}>
            Launch App
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
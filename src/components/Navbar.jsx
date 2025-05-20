import React, { useState } from 'react';
import ConnectButton from './WalletConnect'; // Import the connect button
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative text-gray-300 hover:text-white transition-colors group`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple transform origin-left transition-transform duration-300 ease-out
        ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}>
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-navbar-gradient px-4 md:px-20 py-4 flex items-center justify-between relative z-50">
      {/* Left side: Logo and Title */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/src/assets/CredVerify-Logo.png" alt="CredVerify Logo" className="h-8 w-auto" />
          <h1 className="font-amarante text-2xl text-white ml-3">CredVerify</h1>
        </Link>
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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/how-it-works">How It Works</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/community">Community</NavLink>
      </div>

      {/* Right side: Connect Wallet Button (optional) and Launch App (Desktop) */}
      {/* <div className="hidden md:block">
        <ConnectButton />
      </div> */}
      <Link 
        to="/launch" 
        className={`hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-4 py-2 ml-4 hover:opacity-90 transition
          ${location.pathname === '/launch' ? 'ring-2 ring-purple-400' : ''}`}
      >
        Connect Wallet
      </Link>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1a093a] shadow-lg flex flex-col items-center py-6 space-y-4 md:hidden animate-fade-in z-50">
          <NavLink to="/" onClick={handleClose}>Home</NavLink>
          <NavLink to="/how-it-works" onClick={handleClose}>How It Works</NavLink>
          <NavLink to="/features" onClick={handleClose}>Features</NavLink>
          <NavLink to="/community" onClick={handleClose}>Community</NavLink>
          <Link 
            to="/launch" 
            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-4 py-2 mt-2 hover:opacity-90 transition
              ${location.pathname === '/launch' ? 'ring-2 ring-purple-400' : ''}`}
            onClick={handleClose}
          >
            Launch App
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
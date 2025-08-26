// src/components/layout/Header.jsx
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAppKitAccount } from '@reown/appkit/react';

const Header = () => {
  const { address } = useAppKitAccount();
  
  // Function to truncate address
  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Welcome Back, {address ? truncateAddress(address) : ''}</h1>
        <p className="text-gray-400 text-sm">This is your monthly overview report</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="bg-gray-800 rounded-lg px-3 py-2 flex items-center">
          <Search size={16} className="text-gray-400 mr-2" />
          <span className="text-gray-400 text-sm">Search...</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-2">
          <Bell size={16} className="text-gray-400" />
        </div>
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1">
        </div>
      </div>
    </div>
  );
};

export default Header;
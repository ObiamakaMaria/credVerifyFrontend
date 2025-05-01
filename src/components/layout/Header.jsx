// src/components/layout/Header.jsx
import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = ({ username }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Welcome Back, {username}</h1>
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
          <div className="mr-2">
            <img src="/api/placeholder/24/24" alt="User" className="w-6 h-6 rounded-full" />
          </div>
          <span className="text-gray-200 text-sm">Akorede Abidoye</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
// src/components/layout/Sidebar.jsx
import React from 'react';
import { User, Home, CreditCard, FileText, BarChart2, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-16 bg-gray-900 h-screen fixed left-0 flex flex-col items-center py-6 space-y-8">
      <div className="bg-blue-600 rounded-lg p-2">
        <User size={20} className="text-white" />
      </div>
      <div className="flex flex-col space-y-6">
        <div className="rounded-lg p-2 bg-blue-600">
          <Home size={20} className="text-white" />
        </div>
        <div className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer">
          <CreditCard size={20} className="text-gray-400" />
        </div>
        <div className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer">
          <FileText size={20} className="text-gray-400" />
        </div>
        <div className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer">
          <BarChart2 size={20} className="text-gray-400" />
        </div>
        <div className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer">
          <Users size={20} className="text-gray-400" />
        </div>
      </div>
      <div className="mt-auto flex flex-col space-y-6">
        <div className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer">
          <Settings size={20} className="text-gray-400" />
        </div>
        <div className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer">
          <LogOut size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
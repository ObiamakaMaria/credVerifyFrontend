import React from 'react';
import { User, Home, CreditCard, FileText, BarChart2, Users, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  // Get current location to determine active route
  const location = useLocation();
  const currentPath = location.pathname;

  // Main navigation items
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Cards", path: "/create-credit-builder-loan" },
    { icon: FileText, label: "Documents", path: "/documents" },
    { icon: BarChart2, label: "Reports", path: "/reports" },
    { icon: Users, label: "Users", path: "/users" },
  ];

  // Footer navigation items
  const footerItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

  const renderNavItem = (item, index) => {
    const IconComponent = item.icon;
    const isActive = currentPath === item.path;
    
    return (
      <Link
        key={index}
        to={item.path}
        className={`rounded-lg p-2 ${isActive
          ? "bg-blue-600"
          : "hover:bg-gray-800 cursor-pointer"}`}
      >
        <IconComponent
          size={20}
          className={isActive ? "text-white" : "text-gray-400"}
        />
      </Link>
    );
  };

  return (
    <div className="w-16 bg-gray-900 h-screen fixed left-0 flex flex-col items-center py-6 space-y-8">
      <div className="bg-blue-600 rounded-lg p-2">
        <User size={20} className="text-white" />
      </div>
      
      <div className="flex flex-col space-y-6">
        {navItems.map(renderNavItem)}
      </div>
      
      <div className="mt-auto flex flex-col space-y-6">
        {footerItems.map(renderNavItem)}
      </div>
    </div>
  );
};

export default Sidebar;
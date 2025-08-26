import React from 'react';
import { User, Home, CreditCard, FileText, BarChart2, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAppKitAccount } from '@reown/appkit/react';
import { appKit } from '../../config/AppKit';
import { useState } from 'react';
import LogoutModal from '../common/LogoutModal';

interface NavItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  path: string;
}

const Sidebar = () => {
  // Get current location to determine active route
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected } = useAppKitAccount();
  const currentPath = location.pathname;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Main navigation items - using relative paths for nested routing
  const navItems: NavItem[] = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: CreditCard, label: "Credit Builder", path: "/create-credit-builder-loan" },
    { icon: FileText, label: "Documents", path: "/documents" },
    { icon: BarChart2, label: "Reports", path: "/reports" },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      // Disconnect wallet
      if (isConnected) {
        await appKit.disconnect();
      }
      
      // Clear any local storage or session data
      localStorage.removeItem('walletconnect');
      sessionStorage.clear();
      
      // Close modal and navigate to landing page
      setShowLogoutModal(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate to landing page even if disconnect fails
      setShowLogoutModal(false);
      navigate('/');
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const renderNavItem = (item: NavItem, index: number) => {
    const IconComponent = item.icon;
    const isActive = currentPath === item.path;
    
    const handleNavigation = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(item.path);
    };
    
    return (
      <button
        key={index}
        onClick={handleNavigation}
        className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 w-full group ${isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "text-gray-400 hover:bg-gray-800 hover:text-white cursor-pointer"}`}
      >
        <IconComponent
          size={20}
          className={`transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
        />
        <span className={`font-medium text-sm transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
          {item.label}
        </span>
      </button>
    );
  };

  const renderLogoutButton = () => {
    return (
      <button
        onClick={handleLogoutClick}
        className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800 cursor-pointer transition-all duration-200 w-full text-gray-400 hover:text-red-400 group"
      >
        <LogOut
          size={20}
          className="text-gray-400 group-hover:text-red-400 transition-colors duration-200"
        />
        <span className="font-medium text-sm group-hover:text-red-400 transition-colors duration-200">
          Logout
        </span>
      </button>
    );
  };

  return (
    <>
      <div className="w-64 bg-gray-900 h-screen fixed left-0 flex flex-col py-6 px-4 z-50 hidden lg:flex border-r border-gray-800">
        {/* Header with User Icon and Title */}
        <div className="flex items-center gap-3 mb-8 px-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <User size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">CredVerify</h2>
            <p className="text-gray-400 text-sm">Dashboard</p>
          </div>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex flex-col space-y-2 flex-1">
          {navItems.map(renderNavItem)}
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto">
          {renderLogoutButton()}
        </div>
      </div>
      
      {/* Mobile Sidebar - Icon Only */}
      <div className="w-16 bg-gray-900 h-screen fixed left-0 flex flex-col items-center py-6 space-y-6 z-50 lg:hidden border-r border-gray-800">
        <div className="bg-blue-600 rounded-lg p-2">
          <User size={20} className="text-white" />
        </div>
        
        <nav className="flex flex-col space-y-4 flex-1">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.path;
            
            const handleMobileNavigation = (e: React.MouseEvent) => {
              e.preventDefault();
              navigate(item.path);
            };
            
            return (
              <button
                key={index}
                onClick={handleMobileNavigation}
                className={`rounded-lg p-2 transition-colors duration-200 ${isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 cursor-pointer"}`}
                title={item.label}
              >
                <IconComponent
                  size={20}
                  className={isActive ? "text-white" : "text-gray-400"}
                />
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto">
          <button
            onClick={handleLogoutClick}
            className="rounded-lg p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
            title="Logout"
          >
            <LogOut
              size={20}
              className="text-gray-400 hover:text-red-400"
            />
          </button>
        </div>
      </div>
      
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Sidebar;
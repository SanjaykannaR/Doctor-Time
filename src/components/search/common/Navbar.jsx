import React, { useState } from 'react';
import { FiMoon, FiSun, FiBell, FiSettings, FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  // NEW: State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const clearNotifications = () => setHasUnreadNotifications(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    // Make sure the nav is relative so the dropdown attaches to it properly!
    <nav 
      className="sticky top-0 z-50 w-full shadow-sm border-b relative" 
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', padding: 'var(--space-2)' }}
    >
      <div className="px-4 md:px-8 py-4 w-full flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-1 md:gap-2 cursor-pointer" style={{marginLeft: 'var(--space-4)'}}>
          <div className="w-6 h-6 md:w-8 md:h-8 rounded text-white flex items-center justify-center font-bold text-lg md:text-xl flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }}>
            +
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight hidden sm:block" style={{ color: 'var(--color-text-primary)' }}>
            Doctor Time
          </span>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-6" style={{marginRight: 'var(--space-4)' }}>
          
          {/* DESKTOP ICONS: Hidden on mobile (md:flex means they only show on tablets and up) */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleTheme} className="text-gray-500 hover:text-primary transition-colors">
              {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>

            <button onClick={clearNotifications} className="text-gray-500 hover:text-primary transition-colors relative">
              <FiBell size={22} />
              {hasUnreadNotifications && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-error)' }}></span>
              )}
            </button>

            <button className="text-gray-500 hover:text-primary transition-colors">
              <FiSettings size={22} />
            </button>
          </div>

          {/* ALWAYS VISIBLE: User Profile Avatar */}
          <div className="avatar avatar-sm cursor-pointer border-2" style={{ borderColor: 'var(--color-primary-subtle)' }}>
             S
          </div>

          {/* MOBILE MENU BUTTON: Hidden on desktop, visible on mobile */}
          <button 
            className="md:hidden text-gray-500 hover:text-primary transition-colors p-1"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {/* If isMobileMenuOpen is true, this box drops down! */}
      {isMobileMenuOpen && (
        <div 
          className="absolute top-full left-0 w-full border-b shadow-md md:hidden flex flex-col gap-4 z-50"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', padding: 'var(--space-4)' }}
        >
          <button onClick={toggleTheme} className="flex items-center gap-3 text-gray-600 hover:text-primary font-medium w-full text-left">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <button onClick={clearNotifications} className="flex items-center gap-3 text-gray-600 hover:text-primary font-medium w-full text-left relative">
            <div className="relative">
              <FiBell size={20} />
              {hasUnreadNotifications && <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-error)' }}></span>}
            </div>
            Notifications
          </button>
          
          <button className="flex items-center gap-3 text-gray-600 hover:text-primary font-medium w-full text-left">
            <FiSettings size={20} />
            Settings
          </button>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
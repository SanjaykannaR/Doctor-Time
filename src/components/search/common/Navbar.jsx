import React from 'react';
import { FiMoon, FiBell } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full shadow-sm px-6 py-4 flex justify-between items-center mb-8" style={{ backgroundColor: 'var(--color-surface)' }}>
      
      {/* LOGO */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold text-xl" style={{ backgroundColor: 'var(--color-primary)' }}>
          +
        </div>
        <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Doctor Time
        </span>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="text-gray-500 hover:text-primary transition-colors">
          <FiMoon size={22} />
        </button>

        <button className="text-gray-500 hover:text-primary transition-colors relative">
          <FiBell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-error)' }}></span>
        </button>

        <div className="avatar avatar-sm cursor-pointer border-2" style={{ borderColor: 'var(--color-primary-subtle)' }}>
           S
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
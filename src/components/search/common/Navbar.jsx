import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Add this line
import {
  FiMoon,
  FiSun,
  FiBell,
  FiSettings,
  FiMenu,
  FiX,
  FiCheck,
  FiUser,
  FiLogOut,
  FiSearch,
} from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // NEW: Settings state

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Dr. Arjun confirmed your appointment.",
      time: "10m ago",
      read: false,
    },
    {
      id: 2,
      text: "New lab report added to Vault.",
      time: "2h ago",
      read: false,
    },
  ]);

  const hasUnread = notifications.some((n) => !n.read);

  // --- ACTIONS ---
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Closes other menus when opening one
  const toggleNotifMenu = () => {
    setIsNotifOpen(!isNotifOpen);
    setIsSettingsOpen(false);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsNotifOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    setIsNotifOpen(false);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

 

  return (
    <nav
      className="sticky top-0 z-50 w-full shadow-sm border-b relative"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        padding: "var(--space-2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 w-full flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-8 h-8 rounded text-white flex items-center justify-center font-bold text-xl"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            +
          </div>
          <span
            className="font-bold text-xl hidden sm:block"
            style={{ color: "var(--color-text-primary)" }}
          >
            Doctor Time
          </span>
        </div>

        {/* SEARCH BAR - Place between Logo and Icons */}
        <div className="hidden md:flex flex-1 justify-center px-4 max-w-md">
          <div className="relative w-full group">
            {/* Icon inside the bar */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch
                className="text-gray-400 group-focus-within:text-emerald-600 transition-colors"
                size={18}
              />
            </div>

            <input
              type="text"
              placeholder="Search doctors, records..."
              className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white 
                 transition-all duration-300"
              style={{
                marginLeft: "var(--space-6)",
                padding: "var(--space-2) var(--space-4)",
              }}
            />

            {/* Keyboard Shortcut Hint (Optional but very modern) */}
            {/* <div className="absolute inset-y-0 right-0 pr-3 hidden lg:flex items-center">
              <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold text-gray-300 border border-gray-200 rounded-md bg-white">
                ⌘K
              </kbd>
            </div> */}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => navigate("/search")}
            className="md:hidden text-gray-500 hover:text-emerald-600 transition-colors p-1"
          >
            <FiSearch size={22} />
          </button>

          {/* DESKTOP VIEW */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleTheme}>
              {isDarkMode ? (
                <FiSun size={22} className="text-yellow-500" />
              ) : (
                <FiMoon size={22} />
              )}
            </button>

            {/* Notification Desktop */}
            <div className="relative">
              <button
                onClick={toggleNotifMenu}
                className="relative flex items-center justify-center"
              >
                <FiBell size={22} />
                {hasUnread && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: "var(--color-error)" }}
                  ></span>
                )}
              </button>
              {isNotifOpen && (
                <NotificationDropdown
                  notifications={notifications}
                  markAllAsRead={markAllAsRead}
                />
              )}
            </div>

            {/* Settings Desktop */}
            <div className="relative">
              <button
                onClick={toggleSettingsMenu}
                className="flex items-center justify-center"
              >
                <FiSettings size={22} />
              </button>
              {isSettingsOpen && <SettingsDropdown />}
            </div>
          </div>

          <div
            className="avatar avatar-sm cursor-pointer border-2"
            style={{ borderColor: "var(--color-primary-subtle)" }}
          >
            S
          </div>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden p-1" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b shadow-lg md:hidden flex flex-col p-4 z-50 bg-white">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}{" "}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Mobile Notifications Trigger */}
          <button
            onClick={toggleNotifMenu}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FiBell /> Notifications
            </div>
            {hasUnread && (
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--color-error)" }}
              ></span>
            )}
          </button>
          {isNotifOpen && (
            <div className="pl-8 pb-2">
              <NotificationDropdown
                notifications={notifications}
                markAllAsRead={markAllAsRead}
                isMobile
              />
            </div>
          )}

          {/* Mobile Settings Trigger */}
          <button
            onClick={toggleSettingsMenu}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            <FiSettings /> Settings
          </button>
          {isSettingsOpen && (
            <div className="pl-8 pb-2">
              <SettingsDropdown isMobile />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

// --- SUB-COMPONENTS (To keep code clean) ---

const NotificationDropdown = ({ notifications, markAllAsRead, isMobile }) => (
  <div
    className={`${isMobile ? "w-full mt-4" : "absolute top-14 right-0 w-80"} 
    bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2`}
    style={{ padding: "var(--space-4)" }}
  >
    {/* Header with proper "Safe Zone" padding */}
    <div
      className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-white"
      style={{ padding: "var(--space-4)" }}
    >
      <h3 className="font-extrabold text-gray-900 text-lg">Notifications</h3>
      <button
        onClick={markAllAsRead}
        className=" btn btn-sm text-xs btn-primary font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1.5  "
        style={{ marginLeft: "var(--space-3)" }}
      >
        <FiCheck size={14} /> Mark read
      </button>
    </div>

    {/* List items with fixed dot alignment */}
    <div className="max-h-80 overflow-y-auto">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-6 py-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors flex gap-4
            ${!n.read ? "bg-emerald-50/30" : "bg-transparent"}`}
        >
          {/* Unread Dot: Now properly spaced from the edge */}
          <div className="px-6 py-5 flex items-start gap-4">
            {/* AUTOMATIC DOT ALIGNMENT WRAPPER */}
            {/* We use h-5 because text-sm with leading-relaxed is roughly 20px (h-5) */}
            <div className="flex items-center h-5 shrink-0">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  !n.read
                    ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    : "bg-gray-200"
                }`}
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="flex flex-col">
              {/* Ensure leading-5 (20px) matches the h-5 of the dot wrapper above */}
              <p
                className={`text-sm leading-5 ${!n.read ? "font-bold text-gray-800" : "text-gray-500"}`}
              >
                {n.text}
              </p>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">
                {n.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Footer: Centered and Padded */}
    <div className="p-2 border-t border-gray-50">
      <button className="w-full py-3 text-[11px] font-black text-gray-400 hover:text-emerald-600 uppercase tracking-[0.15em] transition-all rounded-xl hover:bg-gray-50">
        View All Notifications
      </button>
    </div>
  </div>
);

const SettingsDropdown = ({ isMobile }) => (
  <div
    className={`${isMobile ? "w-full mt-4" : "absolute top-14 right-0 w-72"} 
    bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2`}
  >
    {/* Profile Header: Increased Padding to px-6 */}
    <div
      className="px-6 py-5 border-b border-gray-50 flex items-center gap-4 bg-gray-50/50"
      style={{ padding: "var(--space-4)" }}
    >
      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-inner shrink-0">
        S
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-sm font-bold text-gray-900 truncate">
          Sanjay Kanna
        </span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
          Patient Account
        </span>
      </div>
    </div>

    {/* Menu Items: Added horizontal padding to the buttons */}
    <div
      className="p-3"
      style={{
        padding: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all group text-left">
        <FiUser
          className="text-gray-400 group-hover:text-emerald-600 shrink-0"
          size={18}
        />
        Profile Details
      </button>
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all group text-left"
        style={{ marginTop: "var(--space-4)" }}
      >
        <FiSettings
          className="text-gray-400 group-hover:text-emerald-600 shrink-0"
          size={18}
        />
        Account Settings
      </button>
    </div>

    {/* Logout Section */}
    <div
      className="p-3 border-t border-gray-50 bg-gray-50/20"
      style={{ padding: "var(--space-3)" }}
    >
      <button className="w-full btn-danger btn btn-sm flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left">
        <FiLogOut className="shrink-0" size={18} /> Logout Account
      </button>
    </div>
  </div>
);

export default Navbar;

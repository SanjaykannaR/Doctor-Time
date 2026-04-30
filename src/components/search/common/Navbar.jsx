import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
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
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync input with the URL
  const currentQuery = searchParams.get("q") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (location.pathname !== "/search") {
      // Jump to search page and keep typing
      navigate(`/search?q=${value}`);
    } else {
      // Just update the results if already on search page
      navigate(`/search?q=${value}`, { replace: true });
    }
  };

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
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

  return (
    <nav
      className="sticky top-0 z-50 w-full shadow-sm border-b bg-white"
      style={{ borderColor: "var(--color-border)", padding: "var(--space-2)" }}
    >
      <div className="max-w-[2560px] mx-auto px-4 md:px-8 py-3 w-full flex justify-between items-center gap-4">
        {/* 1. LOGO */}
        <Link
          to="/home"
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div
            className="w-8 h-8 rounded text-white flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            +
          </div>
          <span
            className="font-bold text-xl hidden lg:block"
            style={{ color: "var(--color-text-primary)" }}
          >
            Doctor Time
          </span>
        </Link>

        {/* 2. SINGLE MODERN SEARCH BAR */}
        <div className="hidden md:flex flex-1 justify-center max-w-md relative group">
          {/* ICON: Now sitting outside the input */}
          <FiSearch className="text-gray-400 shrink-0" style={{marginTop: 'var(--space-2)'}} size={20} />
          <div className="relative w-full">
            <input
              type="text"
              value={currentQuery}
              onChange={handleSearchChange}
              placeholder="Search doctors, specialty..."
              autoComplete="off"
              className="block w-full py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white"
              style={{
                marginLeft: "var(--space-2)",
                paddingLeft: "3rem", // This fixes the icon overlap
                paddingTop: "var(--space-2)",
                paddingBottom: "var(--space-2)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 hidden lg:flex items-center"
              style={{ marginRight: "var(--space-3)" }}
            >
              <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold text-gray-300 border border-gray-100 rounded-md bg-white">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* 3. ACTIONS */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {/* Mobile Search Icon */}
          <button
            onClick={() => navigate("/search")}
            className="md:hidden text-gray-500 p-1"
          >
            <FiSearch size={22} />
          </button>

          <div
            className="hidden md:flex items-center gap-5"
            style={{ marginRight: "var(--space-3)" }}
          >
            {/* Notification */}
            <div className="relative">
              <button
                onClick={toggleNotifMenu}
                className="relative inline-flex h-10 w-10 items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
              >
                <FiBell size={22} />
                {hasUnread && (
                  <span
                    className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-white"
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

            {/* Settings */}
            <div className="relative">
              <button
                onClick={toggleSettingsMenu}
                className="flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
                style={{ padding: "var(--space-2)" }}
              >
                <FiSettings size={22} />
              </button>
              {isSettingsOpen && <SettingsDropdown />}
            </div>
          </div>

          <div
            className="avatar avatar-sm cursor-pointer border-2 w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm"
            style={{
              borderColor: "var(--color-primary-subtle)",
            }}
          >
            S
          </div>

          <button className="md:hidden p-1" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b shadow-xl md:hidden flex flex-col p-6 gap-2 z-50 bg-white animate-in slide-in-from-top-2"
          style={{ borderColor: "var(--color-border)" , padding: "var(--space-4)" }}>
          <button
            onClick={toggleNotifMenu}
            className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex items-center" >
              <FiBell size={20} className="text-gray-600" />
              {hasUnread && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          )}
            </div>
            <span className="font-bold text-gray-700">Notifications</span>
            </div>
          </button>
          {isNotifOpen && (
            <div className="py-2">
              <NotificationDropdown
                notifications={notifications}
                markAllAsRead={markAllAsRead}
                isMobile
              />
            </div>
          )}

          <button
            onClick={toggleSettingsMenu}
            className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl transition-colors"
          >
            <FiSettings size={20} className="text-gray-600" />
      <span className="font-bold text-gray-700">Settings</span>
          </button>
          {isSettingsOpen && (
            <div className="py-2 px-2">
              <SettingsDropdown isMobile />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

// --- DROPDOWNS (CLEANED PADDING) ---

const NotificationDropdown = ({ notifications, markAllAsRead, isMobile }) => (
  <div
    className={`${isMobile ? "w-full" : "absolute top-12 right-0 w-80"} bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95`}
  >
    <div
      className="border-b flex justify-between items-center bg-gray-50/50"
      style={{
        padding: "var(--space-4)",
        paddingLeft: "var(--space-5)",
        paddingRight: "var(--space-5)",
      }}
    >
      <h3 className="font-bold text-gray-900">Notifications</h3>
      <button
        onClick={markAllAsRead}
        className=" btn btn-sm btn-primary text-xs font-bold text-emerald-600 flex items-center"
        style={{ marginLeft: "var(--space-3)" }}
      >
        <FiCheck style={{ marginRight: "4px" }} /> Mark Read
      </button>
    </div>
    <div className="max-h-80 overflow-y-auto">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`border-b border-gray-50 last:border-0 flex gap-4 ${!n.read ? "bg-emerald-50/20" : ""}`}
          style={{
            padding: "var(--space-4)",
            paddingLeft: "var(--space-5)",
            paddingRight: "var(--space-5)",
          }}
        >
          <div
            className="flex items-center h-5 shrink-0"
            style={{ marginTop: "var(--space-1)" }}
          >
            <div
              className={`w-2 h-2 rounded-full ${!n.read ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-gray-200"}`}
            />
          </div>
          <div style={{ paddingRight: "var(--space-2)" }}>
            <p
              className={`text-sm leading-tight ${!n.read ? "font-bold text-gray-800" : "text-gray-500"}`}
            >
              {n.text}
            </p>
            <span
              className="text-[10px] font-bold text-gray-400 uppercase mt-1 block"
              style={{ marginTop: "var(--space-2)" }}
            >
              {n.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsDropdown = ({ isMobile }) => (
  <div
    className={`${isMobile ? "w-full" : "absolute top-12 right-0 w-64"} bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95`}
  >
    <div
      className="border-b bg-gray-50/50 flex items-center gap-3"
      style={{ padding: "var(--space-5)" }}
    >
      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
        S
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-900">Sanjay Kanna</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Patient
        </span>
      </div>
    </div>
    <div style={{ padding: "var(--space-2)" }}>
      <button
        className="w-full flex items-center text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl transition-all"
        style={{ padding: "var(--space-4)" }}
      >
        <FiUser size={18} style={{ marginRight: "8px" }} /> Profile
      </button>
      <button
        className="w-full flex items-center text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl transition-all"
        style={{ padding: "var(--space-4)" }}
      >
        <FiSettings size={18} style={{ marginRight: "8px" }} /> Settings
      </button>
      <div className="border-t border-gray-50">
        <button
          className="w-full btn btn-sm btn-danger flex items-center text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          style={{ padding: "var(--space-3)" }}
        >
          <FiLogOut size={18} style={{ marginRight: "8px" }} /> Logout
        </button>
      </div>
    </div>
  </div>
);

export default Navbar;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LuBadgeCheck,
  LuCalendarDays,
  LuChartNoAxesColumn,
  LuLayoutDashboard,
  LuLogOut,
  LuBell,
  LuMenu,
  LuPlus,
  LuSearch,
  LuSettings,
  LuStethoscope,
  LuCircleUser,
  LuUsers,
  LuX,
} from "react-icons/lu";

const menuItems = [
  { icon: LuLayoutDashboard, label: "Dashboard", path: "/" },
  { icon: LuStethoscope, label: "Doctors", path: "/doctors" },
  { icon: LuUsers, label: "Patients", path: "/patients" },
  { icon: LuCalendarDays, label: "Appointments", path: "/appointments" },
  { icon: LuBadgeCheck, label: "Approvals", path: "/approvals", badge: "5" },
  { icon: LuChartNoAxesColumn, label: "Reports", path: "/reports" },
];

const pageTitles = {
  "/": "Dashboard",
  "/doctors": "Doctors",
  "/patients": "Patients",
  "/appointments": "Appointments",
  "/approvals": "Approvals",
  "/reports": "Reports",
  "/settings": "Settings",
};

const Layout = ({ children, mainStyle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  const handleItemClick = (item) => {
    setActiveItem(item.label);
    if (item.path) navigate(item.path);
    setIsSidebarOpen(false);
  };

  return (
    <div
      className="admin-shell"
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "var(--color-bg, #f8fafc)",
      }}
    >
      <button
        className="admin-menu-button"
        type="button"
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen((open) => !open)}
      >
        {isSidebarOpen ? <LuX size={22} /> : <LuMenu size={22} />}
      </button>

      {isSidebarOpen && (
        <button
          className="admin-sidebar-overlay"
          type="button"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${isSidebarOpen ? "is-open" : ""}`}
        style={{
          width: "260px",
          backgroundColor: "#1a222c",
          color: "#94a3b8",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          zIndex: 100,
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ padding: "24px 24px 10px 24px" }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: "26px", fontWeight: "700" }}>
            MediLink
          </h2>
        </div>

        <div style={{ padding: "0 12px", flex: 1 }}>
          <p
            style={{
              padding: "0 12px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "12px",
              marginTop: "10px",
            }}
          >
            MAIN
          </p>
          <nav>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                active={item.path ? location.pathname === item.path : activeItem === item.label}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </nav>
        </div>

        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <SidebarItem
            icon={LuSettings}
            label="Settings"
            active={location.pathname === "/settings"}
            onClick={() => {
              navigate("/settings");
              setIsSidebarOpen(false);
            }}
          />
          <SidebarItem icon={LuLogOut} label="Logout" isLogout onClick={() => console.log("Logging out...")} />
        </div>
      </aside>

      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <span className="admin-topbar-logo">
            <LuPlus size={22} strokeWidth={3} />
          </span>
          <span>{pageTitle}</span>
        </div>

        <div className="admin-topbar-search">
          <LuSearch size={18} />
          <input type="search" placeholder="Search..." aria-label="Search" />
        </div>

        <div className="admin-topbar-actions">
          <button type="button" className="admin-icon-button" aria-label="Notifications">
            <LuBell size={20} />
          </button>
          <button type="button" className="admin-profile-button" aria-label="Profile">
            <LuCircleUser size={24} />
            <span>Profile</span>
          </button>
        </div>
      </header>

      <main
        className="admin-main"
        style={{
          marginLeft: "260px",
          flex: 1,
          minHeight: "100vh",
          padding: "96px 24px 24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          ...mainStyle,
        }}
      >
        {children}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, badge, isLogout, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icon;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        margin: "4px 0",
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: active
          ? "rgba(16, 185, 129, 0.1)"
          : isHovered
            ? "rgba(255, 255, 255, 0.03)"
            : "transparent",
        color: isLogout ? "#fca5a5" : active ? "#10b981" : "#94a3b8",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "18px", height: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} strokeWidth={2.2} />
        </span>
        <span style={{ fontSize: "14px", fontWeight: active ? "600" : "400" }}>{label}</span>
      </div>

      {badge && (
        <span
          style={{
            backgroundColor: "#ef4444",
            color: "#fff",
            fontSize: "10px",
            padding: "2px 6px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default Layout;

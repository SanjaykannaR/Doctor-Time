import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LuBadgeCheck,
  LuCalendarDays,
  LuChartNoAxesColumn,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
  LuStethoscope,
  LuUsers,
} from "react-icons/lu";

const menuItems = [
  { icon: LuLayoutDashboard, label: "Dashboard", path: "/" },
  { icon: LuStethoscope, label: "Doctors", path: "/doctors" },
  { icon: LuUsers, label: "Patients", path: "/patients" },
  { icon: LuCalendarDays, label: "Appointments", path: "/appointments" },
  { icon: LuBadgeCheck, label: "Approvals", path: "/approvals", badge: "5" },
  { icon: LuChartNoAxesColumn, label: "Reports", path: "/reports" },
];

const Layout = ({ children, mainStyle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item.label);
    if (item.path) navigate(item.path);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "var(--color-bg, #f8fafc)",
      }}
    >
      <aside
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
          <h2 style={{ color: "#fff", margin: 0, fontSize: "22px", fontWeight: "700" }}>
            MediLink
          </h2>
          <p style={{ fontSize: "10px", color: "#64748b", letterSpacing: "1px", margin: "4px 0 0 0" }}>
            ADMIN CONSOLE
          </p>
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
            onClick={() => navigate("/settings")}
          />
          <SidebarItem icon={LuLogOut} label="Logout" isLogout onClick={() => console.log("Logging out...")} />
        </div>
      </aside>

      <main
        style={{
          marginLeft: "260px",
          flex: 1,
          minHeight: "100vh",
          padding: "24px",
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

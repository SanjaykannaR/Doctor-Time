import React, { useState, useMemo } from "react";
import { 
  LuSearch, 
  LuBell, 
  LuCalendar, 
  LuCircleCheck, 
  LuClock, 
  LuCircleX, 
  LuEye,
  LuDownload
} from "react-icons/lu";

export default function Appointments() {
  // --- 1. STATE FOR DYNAMIC FILTERING ---
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const appointmentsData = [
    { id: 1, time: "10:30 AM", patient: "Priya Sharma", doctor: "Dr. Ravi Kumar", specialty: "Cardiology", type: "FOLLOW-UP", status: "CONFIRMED" },
    { id: 2, time: "11:00 AM", patient: "Arjun Mehta", doctor: "Dr. Ravi Kumar", specialty: "Cardiology", type: "ROUTINE", status: "CONFIRMED" },
    { id: 3, time: "11:30 AM", patient: "Kavya Reddy", doctor: "Dr. Meena Rao", specialty: "Neurology", type: "NEW PATIENT", status: "PENDING" },
    { id: 4, time: "12:00 PM", patient: "Rema Nair", doctor: "Dr. Anand", specialty: "Orthopedics", type: "POST-SURGERY", status: "CONFIRMED" },
    { id: 5, time: "01:00 PM", patient: "Sunita K.", doctor: "Dr. Suresh", specialty: "Pediatrics", type: "ROUTINE", status: "CONFIRMED" },
    { id: 6, time: "01:30 PM", patient: "Vikram S.", doctor: "Dr. Menon", specialty: "Cardiology", type: "URGENT", status: "PENDING" },
    { id: 7, time: "02:00 PM", patient: "Suresh Iyer", doctor: "Dr. Ravi Kumar", specialty: "Cardiology", type: "FOLLOW-UP", status: "CONFIRMED" },
    { id: 8, time: "02:30 PM", patient: "Deepa M.", doctor: "Dr. Priya N.", specialty: "Dermatology", type: "CONSULTATION", status: "CANCELLED" },
  ];

  // --- 2. DYNAMIC FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return appointmentsData.filter(app => {
      const matchesSearch = app.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            app.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === "All" || 
                         (activeTab === "Today" && app.status !== "CANCELLED") ||
                         app.status === activeTab.toUpperCase();
                         
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
      <div style={{ width: "100%", fontFamily: "var(--font-body)" }}>
        
        {/* Header with Search */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <div>
            <h1 style={{ fontSize: "var(--text-xl)", margin: 0, fontFamily: "var(--font-heading)" }}>Appointments</h1>
            <p className="text-small">Admin / Appointments Management</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <LuSearch style={{ position: "absolute", left: "12px", top: "10px", color: "var(--color-text-muted)" }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search patient or doctor..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: "36px", width: "280px", borderRadius: "var(--radius-full)" }} 
              />
            </div>
            <div className="badge-warning" style={{ padding: "10px", borderRadius: "var(--radius-full)", cursor: "pointer" }}>
              <LuBell />
            </div>
          </div>
        </header>

        {/* Dynamic Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-5)", marginBottom: "var(--space-6)" }}>
          <StatCard count="24" label="TODAY" icon={<LuCalendar color="var(--color-primary)" />} />
          <StatCard count="18" label="CONFIRMED" icon={<LuCircleCheck color="var(--color-success)" />} />
          <StatCard count="3" label="PENDING" icon={<LuClock color="var(--color-accent)" />} />
          <StatCard count="3" label="CANCELLED" icon={<LuCircleX color="var(--color-error)" />} />
        </div>

        {/* Action Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-5)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", background: "var(--color-white)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
            {["All", "Today", "Pending", "Cancelled"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn-sm ${activeTab === tab ? "btn-primary" : "btn-ghost"}`}
                style={{ borderRadius: "var(--radius-sm)", minWidth: "80px" }}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="btn btn-accent btn-sm">
            <LuDownload size={14} /> Export List
          </button>
        </div>

        {/* Dynamic Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)" }}>
              <tr>
                <th style={thStyle}>TIME</th>
                <th style={thStyle}>PATIENT</th>
                <th style={thStyle}>DOCTOR</th>
                <th style={thStyle}>SPECIALTY</th>
                <th style={thStyle}>TYPE</th>
                <th style={thStyle}>STATUS</th>
                <th style={thStyle}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((app) => (
                <tr key={app.id} style={{ borderBottom: "1px solid var(--color-surface-alt)" }}>
                  <td style={{ ...tdStyle, fontWeight: "var(--weight-bold)", color: "var(--color-primary)" }}>{app.time}</td>
                  <td style={tdStyle}>{app.patient}</td>
                  <td style={tdStyle}>{app.doctor}</td>
                  <td style={tdStyle}>{app.specialty}</td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: "10px", fontWeight: "600", color: app.type === "URGENT" ? "var(--color-error)" : "var(--color-text-secondary)" }}>
                      {app.type}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span className={getBadgeClass(app.status)} style={{ fontSize: "10px" }}>{app.status}</span>
                  </td>
                  <td style={tdStyle}>
                    <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--color-border)" }}>
                      <LuEye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div style={{ padding: "var(--space-10)", textAlign: "center", color: "var(--color-text-muted)" }}>
              No appointments found for "{searchTerm}" in {activeTab}.
            </div>
          )}
        </div>
      </div>
  );
}

// --- SUB-COMPONENTS & HELPERS ---

const StatCard = ({ count, label, icon }) => (
  <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-5)" }}>
    <div>
      <h2 style={{ fontSize: "var(--text-xl)", margin: 0, color: "var(--color-text-primary)" }}>{count}</h2>
      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: "var(--weight-bold)", margin: 0 }}>{label}</p>
    </div>
    <div style={{ fontSize: "24px" }}>{icon}</div>
  </div>
);

const getBadgeClass = (status) => {
  switch (status) {
    case "CONFIRMED": return "badge-success";
    case "PENDING": return "badge-warning";
    case "CANCELLED": return "badge-error";
    default: return "badge-primary";
  }
};

const thStyle = { padding: "16px 20px", color: "var(--color-text-muted)", fontSize: "11px", letterSpacing: "0.05em" };
const tdStyle = { padding: "16px 20px", fontSize: "13px" };

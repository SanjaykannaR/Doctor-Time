import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { 
  LuSearch, 
  LuBell, 
  LuTriangleAlert, // Correct Import Name
  LuStethoscope, 
  LuUsers, 
  LuCalendarDays, 
  LuHourglass
} from "react-icons/lu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, initials: "DKN", name: "Dr. Kavitha Nair", specialty: "Gynecology", color: "#9333EA" },
    { id: 2, initials: "DAD", name: "Dr. Arjun Das", specialty: "Orthopedics", color: "#2563EB" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleApprove = (id) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
    border: "1px solid #f0f0f0"
  };

  return (
      <div
        style={{ width: "100%", cursor: "pointer" }}
        onClick={() => navigate("/doctors")}
      >
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ color: "var(--color-text-primary)", margin: 0 }}>Admin Dashboard</h1>
            <p style={{ margin: "var(--space-2) 0 0 0", fontSize: "var(--text-base)", color: "var(--color-text-secondary)", fontWeight: "var(--weight-medium)" }}>
              Platform overview — {currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ position: "relative" }}>
              <input 
                type="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search doctors..." 
                style={{ 
                    padding: "10px 16px 10px 40px", 
                    borderRadius: "20px", 
                    border: "1px solid #e5e7eb", 
                    width: "250px",
                    outline: "none"
                }} 
              />
              <LuSearch style={{ position: "absolute", left: "14px", top: "12px", color: "#9ca3af" }} />
            </div>
            <LuBell style={{ fontSize: "20px", color: "#6b7280", cursor: "pointer" }} />
            
          </div>
        </header>

        

        {/* Stats Grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "24px" }}>
          <StatCard value="247" label="Total Doctors" trend="↑ 12" color="#10b981" icon={<LuStethoscope />} />
          <StatCard value="4,821" label="Total Patients" trend="↑ 89" color="#10b981" icon={<LuUsers />} />
          <StatCard value="1,203" label="Appointments" trend="This month" color="#6b7280" icon={<LuCalendarDays />} />
          <StatCard value={pendingApprovals.length} label="Pending" trend="Action req." color="#ef4444" icon={<LuHourglass />} />
        </section>

        {/* Bottom Grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "24px" }}>
          
          <div style={{ ...cardStyle, gridColumn: "span 7" }}>
            <h2 style={{ fontSize: "16px", marginBottom: "20px" }}>Today's Appointments</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6", textAlign: "left" }}>
                  <th style={{ paddingBottom: "12px", color: "#6b7280", fontSize: "12px" }}>Time</th>
                  <th style={{ paddingBottom: "12px", color: "#6b7280", fontSize: "12px" }}>Patient</th>
                  <th style={{ paddingBottom: "12px", color: "#6b7280", fontSize: "12px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRow time="10:30 AM" name="Priya Sharma" status="CONFIRMED" />
                <TableRow time="11:30 AM" name="Kavya Reddy" status="PENDING" />
              </tbody>
            </table>
          </div>

          <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={cardStyle}>
               <h2 style={{ fontSize: "16px", marginBottom: "16px" }}>Approvals</h2>
               {pendingApprovals.map((doc) => (
                 <PendingItem key={doc.id} doc={doc} onApprove={() => handleApprove(doc.id)} />
               ))}
            </div>
          </div>
        </section>
      </div>
  );
};

// Helper Components
const StatCard = ({ value, label, trend, color, icon }) => (
  <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #f0f0f0" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h3 style={{ fontSize: "24px", margin: 0 }}>{value}</h3>
        <p style={{ fontSize: "11px", color: "#6b7280", margin: "4px 0" }}>{label}</p>
        <p style={{ fontSize: "11px", color: color, margin: 0, fontWeight: "600" }}>{trend}</p>
      </div>
      <span style={{ fontSize: "24px", color: "#10b981" }}>{icon}</span>
    </div>
  </div>
);

const TableRow = ({ time, name, status }) => (
  <tr style={{ borderBottom: "1px solid #f9fafb" }}>
    <td style={{ padding: "12px 0", fontSize: "14px" }}>{time}</td>
    <td style={{ padding: "12px 0", fontWeight: "600", fontSize: "14px" }}>{name}</td>
    <td>
      <span style={{ 
        padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: "700",
        backgroundColor: status === 'CONFIRMED' ? "#ecfdf5" : "#fffbeb",
        color: status === 'CONFIRMED' ? "#10b981" : "#d97706"
      }}>{status}</span>
    </td>
  </tr>
);

const PendingItem = ({ doc, onApprove }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
    <div style={{ width: "32px", height: "32px", borderRadius: "6px", backgroundColor: doc.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>{doc.initials}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "13px", fontWeight: "600" }}>{doc.name}</div>
    </div>
    <button onClick={onApprove} style={{ background: "#10b981", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>Approve</button>
  </div>
);

export default Dashboard;

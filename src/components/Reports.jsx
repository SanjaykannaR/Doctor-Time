import React, { useState } from "react";
import { 
  LuSearch, LuBell, LuDownload, LuTrendingUp, 
  LuUsers, LuCalendar, LuStethoscope, LuStar 
} from "react-icons/lu";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("30 Days");

  const topDoctors = [
    { id: 1, name: "Dr. Suresh Iyer", specialty: "Pediatrics", appointments: 201, revenue: "₹1.41L", rating: 4.9, status: "ACTIVE", initials: "DSI", color: "#166534" },
    { id: 2, name: "Dr. Ravi Kumar", specialty: "Cardiology", appointments: 142, revenue: "₹1.14L", rating: 4.9, status: "ACTIVE", initials: "DRK", color: "#0A7B6C" },
    { id: 3, name: "Dr. Meena Rao", specialty: "Neurology", appointments: 98, revenue: "₹0.78L", rating: 4.7, status: "ACTIVE", initials: "DMR", color: "#5b21b6" },
    { id: 4, name: "Dr. Vijay Menon", specialty: "Cardiology", appointments: 89, revenue: "₹0.71L", rating: 4.7, status: "ACTIVE", initials: "DVM", color: "#065f46" },
  ];

  const specialties = [
    { name: "Cardiology", percentage: 38, color: "#0A7B6C" },
    { name: "Neurology", percentage: 22, color: "#5b21b6" },
    { name: "Orthopedics", percentage: 18, color: "#2D7DD2" },
    { name: "Pediatrics", percentage: 15, color: "#166534" },
    { name: "Dermatology", percentage: 7, color: "#ca8a04" },
  ];

  return (
      <div style={{ width: "100%", fontFamily: "var(--font-body)" }}>
        
        {/* Header Section */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "20px", margin: 0, fontFamily: "var(--font-heading)" }}>Reports & Analytics</h1>
            <p className="text-small">Admin / Reports</p>
          </div>
          
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ display: "flex", background: "var(--color-white)", padding: "4px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
              {["Today", "7 Days", "30 Days", "90 Days", "Custom"].map(range => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`btn-sm ${timeRange === range ? "btn-primary" : "btn-ghost"}`}
                  style={{ borderRadius: "6px", fontSize: "12px" }}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="btn btn-accent btn-sm"><LuDownload size={14} /> Export</button>
            <div className="badge-warning" style={{ padding: "10px", borderRadius: "50%" }}><LuBell /></div>
          </div>
        </header>

        {/* 1. Revenue & Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
          <ReportStat count="₹8.42L" label="Revenue - 30 days" icon={<LuTrendingUp color="#ca8a04" />} />
          <ReportStat count="1,203" label="Appointments - 30 days" icon={<LuCalendar color="var(--color-error)" />} />
          <ReportStat count="4,821" label="Total Patients - All time" icon={<LuUsers color="#2D7DD2" />} />
          <ReportStat count="247" label="Active Doctors" icon={<LuStethoscope color="var(--color-success)" />} />
        </div>

        {/* 2. Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "24px" }}>
          {/* Main Line Chart Placeholder */}
          <div className="card" style={{ height: "300px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: "700" }}>APPOINTMENTS — LAST 7 DAYS</h3>
            </div>
            <div style={{ height: "200px", display: "flex", alignItems: "flex-end", justifyContent: "space-around", paddingBottom: "20px" }}>
              {/* Simple CSS Bar Chart for visualization */}
              {[18, 22, 15, 28, 19, 31, 24].map((h, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "600" }}>{h}</span>
                  <div style={{ width: "30px", height: `${h * 4}px`, backgroundColor: "var(--color-primary-light)", borderRadius: "4px" }}></div>
                  <span style={{ fontSize: "9px", color: "var(--color-text-muted)" }}>{24 + i} Mar</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty Breakdown */}
          <div className="card">
            <h3 style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: "700", marginBottom: "20px" }}>BY SPECIALTY</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {specialties.map(spec => (
                <div key={spec.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "600" }}>● {spec.name}</span>
                    <span style={{ fontWeight: "700" }}>{spec.percentage}%</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "var(--color-surface-alt)", borderRadius: "10px" }}>
                    <div style={{ width: `${spec.percentage}%`, height: "100%", backgroundColor: spec.color, borderRadius: "10px" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Top Performing Doctors Table */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700" }}>Top Performing Doctors</h2>
          <a href="#" style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: "600" }}>View All →</a>
        </div>
        
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--color-surface-alt)", color: "var(--color-text-muted)", fontSize: "11px" }}>
              <tr>
                <th style={thStyle}>DOCTOR</th>
                <th style={thStyle}>SPECIALTY</th>
                <th style={thStyle}>APPOINTMENTS</th>
                <th style={thStyle}>REVENUE</th>
                <th style={thStyle}>RATING</th>
                <th style={thStyle}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {topDoctors.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--color-surface-alt)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div className="avatar avatar-md" style={{ backgroundColor: doc.color, color: "white" }}>{doc.initials}</div>
                      <span style={{ fontWeight: "600" }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{doc.specialty}</td>
                  <td style={tdStyle}>{doc.appointments}</td>
                  <td style={{ ...tdStyle, fontWeight: "700", color: "var(--color-primary)" }}>{doc.revenue}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <LuStar size={14} color="#ca8a04" fill="#ca8a04" /> {doc.rating}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span className="badge-success" style={{ fontSize: "10px" }}>{doc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

// Sub-component
const ReportStat = ({ count, label, icon }) => (
  <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center", padding: "20px" }}>
    <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--color-surface-alt)", fontSize: "20px" }}>
      {icon}
    </div>
    <div>
      <h2 style={{ fontSize: "22px", margin: 0, fontWeight: "700" }}>{count}</h2>
      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: "600", margin: 0, textTransform: "uppercase" }}>{label}</p>
    </div>
  </div>
);

const thStyle = { padding: "16px 20px", fontWeight: "600" };
const tdStyle = { padding: "16px 20px", fontSize: "13px" };

import React, { useState } from "react";
import { LuUsers, LuUserPlus, LuMessageSquare, LuDownload } from "react-icons/lu";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const patientsData = [
    { id: 1, name: "Priya Sharma", email: "priya@gmail.com", age: 34, sex: "F", contact: "priya@gmail.com", doctor: "Dr. Ravi Kumar", lastVisit: "30 Mar", vault: "ENABLED", status: "ACTIVE", initials: "PS", color: "#0A7B6C" },
    { id: 2, name: "Arjun Mehta", email: "arjun@gmail.com", age: 52, sex: "M", contact: "arjun@gmail.com", doctor: "Dr. Ravi Kumar", lastVisit: "30 Mar", vault: "DISABLED", status: "ACTIVE", initials: "AM", color: "#2D7DD2" },
    { id: 3, name: "Kavya Reddy", email: "kavya@gmail.com", age: 28, sex: "F", contact: "kavya@gmail.com", doctor: "Dr. Meena Rao", lastVisit: "28 Mar", vault: "ENABLED", status: "ACTIVE", initials: "KR", color: "#5b21b6" },
    { id: 4, name: "Suresh Iyer", email: "suresh@gmail.com", age: 61, sex: "M", contact: "suresh@gmail.com", doctor: "Dr. Ravi Kumar", lastVisit: "25 Mar", vault: "ENABLED", status: "ACTIVE", initials: "SI", color: "#166534" },
    { id: 5, name: "Meena Pillai", email: "meena@gmail.com", age: 45, sex: "F", contact: "meena@gmail.com", doctor: "Dr. Anand", lastVisit: "20 Mar", vault: "DISABLED", status: "ACTIVE", initials: "MP", color: "#9a3412" },
    { id: 6, name: "Ramesh Kumar", email: "ramesh@gmail.com", age: 38, sex: "M", contact: "ramesh@gmail.com", doctor: "Dr. Suresh", lastVisit: "15 Mar", vault: "ENABLED", status: "ACTIVE", initials: "RK", color: "#065f46" },
    { id: 7, name: "Anita Patel", email: "anita@gmail.com", age: 29, sex: "F", contact: "anita@gmail.com", doctor: "Unassigned", lastVisit: "—", vault: "DISABLED", status: "INACTIVE", initials: "AP", color: "#374151" },
  ];

  const filteredPatients = patientsData.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || p.status === activeFilter.toUpperCase();
      return matchesSearch && matchesFilter;
    });

  return (
      <div style={{ width: "100%", fontFamily: "var(--font-body)" }}>
        {/* Stats Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "24px" }}>
          <SummaryCard count="4,821" label="TOTAL PATIENTS" icon={<LuUsers color="#2D7DD2" />} />
          <SummaryCard count="89" label="NEW THIS WEEK" icon={<LuUserPlus color="#0A7B6C" />} isNew={true} />
          <SummaryCard count="247" label="ACTIVE CONSULTS" icon={<LuMessageSquare color="var(--color-text-secondary)" />} />
        </div>

        {/* Search and Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <input 
              className="form-input" 
              placeholder="Search patient name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "300px" }} 
            />
            <div style={{ display: "flex", gap: "8px", background: "var(--color-white)", padding: "4px", borderRadius: "var(--radius-md)" }}>
              {["All", "Active", "Inactive"].map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`btn-sm ${activeFilter === f ? "btn-primary" : "btn-ghost"}`}
                  style={{ borderRadius: "6px" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-accent btn-sm"><LuDownload /> Export CSV</button>
        </div>

        {/* Table Container */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--color-surface-alt)", color: "var(--color-text-muted)", fontSize: "11px" }}>
              <tr>
                <th style={thStyle}>PATIENT</th>
                <th style={thStyle}>AGE/SEX</th>
                <th style={thStyle}>CONTACT</th>
                <th style={thStyle}>PRIMARY DOCTOR</th>
                <th style={thStyle}>LAST VISIT</th>
                <th style={thStyle}>VAULT</th>
                <th style={thStyle}>STATUS</th>
                <th style={thStyle}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--color-surface-alt)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div className="avatar avatar-md" style={{ backgroundColor: p.color, color: "white" }}>{p.initials}</div>
                      <div>
                        <div style={{ fontWeight: "600", color: "var(--color-text-primary)" }}>{p.name}</div>
                        <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{p.age} / {p.sex}</td>
                  <td style={tdStyle}>{p.contact}</td>
                  <td style={tdStyle}>{p.doctor}</td>
                  <td style={tdStyle}>{p.lastVisit}</td>
                  <td style={tdStyle}>
                    <span className={p.vault === "ENABLED" ? "badge-success" : "badge-primary"} style={{ fontSize: "9px" }}>{p.vault}</span>
                  </td>
                  <td style={tdStyle}>
                    <span className={p.status === "ACTIVE" ? "text-success" : "text-muted"} style={{ fontWeight: "700", fontSize: "10px" }}>● {p.status}</span>
                  </td>
                  <td style={tdStyle}><button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--color-border)" }}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

// Internal components
const SummaryCard = ({ count, label, icon, isNew }) => (
  <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <h2 style={{ fontSize: "28px", margin: 0 }}>{count}</h2>
      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: "600", margin: 0 }}>{label}</p>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      <div style={{ fontSize: "24px" }}>{icon}</div>
      {isNew && <span className="badge-info" style={{ fontSize: "8px" }}>NEW</span>}
    </div>
  </div>
);

const thStyle = { padding: "16px 20px", fontWeight: "600" };
const tdStyle = { padding: "16px 20px", fontSize: "13px" };

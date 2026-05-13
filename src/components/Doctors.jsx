import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";


export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const doctorsData = [
    { id: 1, name: "Dr. Ravi Kumar", specialty: "Cardiology", patients: 142, rating: 4.9, status: "ACTIVE", joined: "Jan 2024", initials: "DRK", color: "var(--color-primary)" },
    { id: 2, name: "Dr. Meena Rao", specialty: "Neurology", patients: 98, rating: 4.7, status: "ACTIVE", joined: "Mar 2024", initials: "DMR", color: "#5b21b6" },
    { id: 3, name: "Dr. Anand Pillai", specialty: "Orthopedics", patients: 67, rating: 4.8, status: "ACTIVE", joined: "Jun 2024", initials: "DAP", color: "#1e40af" },
    { id: 4, name: "Dr. Priya Nambiar", specialty: "Dermatology", patients: 43, rating: 4.6, status: "ACTIVE", joined: "Aug 2024", initials: "DPN", color: "#9a3412" },
    { id: 5, name: "Dr. Suresh Iyer", specialty: "Pediatrics", patients: 201, rating: 4.9, status: "ACTIVE", joined: "Nov 2023", initials: "DSI", color: "#166534" },
    { id: 6, name: "Dr. Kavitha Nair", specialty: "Gynecology", patients: "—", rating: "—", status: "PENDING", joined: "Mar 2026", initials: "DKN", color: "#6b21a8" },
    { id: 7, name: "Dr. Arjun Das", specialty: "Orthopedics", patients: "—", rating: "—", status: "PENDING", joined: "Mar 2026", initials: "DAD", color: "#1d4ed8" },
    { id: 8, name: "Dr. Ramesh Babu", specialty: "Psychiatry", patients: 31, rating: 4.5, status: "SUSPENDED", joined: "Feb 2024", initials: "DRB", color: "#374151" },
    { id: 9, name: "Dr. Sunita Rao", specialty: "Dermatology", patients: "—", rating: "—", status: "PENDING", joined: "Mar 2026", initials: "DSR", color: "var(--color-primary-dark)" },
    { id: 10, name: "Dr. Vijay Menon", specialty: "Cardiology", patients: 89, rating: 4.7, status: "ACTIVE", joined: "Apr 2024", initials: "DVM", color: "var(--color-primary-dark)" },
  ];

  const filteredDoctors = doctorsData.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || doc.status === activeFilter.toUpperCase();
      return matchesSearch && matchesFilter;
    });

  return (
      <div style={{ width: "100%", fontFamily: "var(--font-body)" }}>
        {/* Header Section */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <div>
            <h1 style={{ color: "var(--color-text-primary)", margin: 0 }}>Doctors</h1>
            <p className="text-small" style={{ margin: "var(--space-1) 0 0 0" }}>Admin / Doctors List</p>
          </div>
        </header>

        {/* Filter & Action Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-5)" }}>
          <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <LuSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }} />
              <input 
                type="text" 
                className="form-input"
                placeholder="Search doctor name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "280px", paddingLeft: "40px", borderRadius: "var(--radius-full)" }} 
              />
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", background: "var(--color-surface)", padding: "5px", minHeight: "48px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}>
              {["All", "Active", "Pending", "Suspended"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{ 
                    ...filterBtnStyle, 
                    backgroundColor: activeFilter === tab ? "var(--color-primary)" : "transparent", 
                    color: activeFilter === tab ? "var(--color-white)" : "var(--color-text-muted)" 
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary">
            + Add Doctor
          </button>
        </div>

        {/* Doctors Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)" }}>
              <tr>
                <th style={thStyle}>DOCTOR</th>
                <th style={thStyle}>SPECIALTY</th>
                <th style={thStyle}>PATIENTS</th>
                <th style={thStyle}>RATING</th>
                <th style={thStyle}>STATUS</th>
                <th style={thStyle}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--color-surface-alt)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                      <div className="avatar avatar-md" style={{ backgroundColor: doc.color, color: "var(--color-white)" }}>
                        {doc.initials}
                      </div>
                      <span style={{ fontWeight: "var(--weight-semibold)", color: "var(--color-text-primary)" }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: "var(--color-text-secondary)" }}>{doc.specialty}</td>
                  <td style={{ ...tdStyle, color: "var(--color-text-secondary)" }}>{doc.patients}</td>
                  <td style={tdStyle}>
                    <span style={{ color: "var(--color-accent)" }}>★</span> <span style={{ color: "var(--color-text-secondary)" }}>{doc.rating}</span>
                  </td>
                  <td style={tdStyle}>
                    <StatusBadge status={doc.status} />
                  </td>
                  <td style={tdStyle}>
                    <button 
                       className={doc.status === "PENDING" ? "btn btn-accent btn-sm" : "btn btn-ghost btn-sm"}
                       style={{ border: doc.status === "PENDING" ? "none" : "1px solid var(--color-border)" }}
                    >
                      {doc.status === "PENDING" ? "Review" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDoctors.length === 0 && (
            <div style={{ padding: "var(--space-10)", textAlign: "center", color: "var(--color-text-muted)" }}>
              No doctors found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
  );
}

// --- Status Badge utilizing your Badge system ---
const StatusBadge = ({ status }) => {
  const getBadgeClass = () => {
    if (status === "ACTIVE") return "badge-success";
    if (status === "PENDING") return "badge-warning";
    if (status === "SUSPENDED") return "badge-error";
    return "badge-primary";
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {status}
    </span>
  );
};

// --- Styles using Variables ---
const thStyle = { 
  padding: "var(--space-4) var(--space-6)", 
  fontWeight: "var(--weight-semibold)", 
  color: "var(--color-text-muted)", 
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-wider)"
};

const tdStyle = { 
  padding: "var(--space-4) var(--space-6)",
  fontSize: "var(--text-sm)"
};

const filterBtnStyle = { 
  border: "none", 
  padding: "0 var(--space-5)", 
  minHeight: "38px",
  borderRadius: "var(--radius-full)", 
  fontSize: "var(--text-sm)", 
  cursor: "pointer", 
  fontWeight: "var(--weight-medium)",
  transition: "var(--transition-fast)"
};

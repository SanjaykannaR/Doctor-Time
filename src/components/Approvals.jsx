import React, { useState } from "react";
import { 
  LuSearch, 
  LuBell, 
  LuCheck, 
  LuX, 
  LuInfo,
  LuCircleCheck
} from "react-icons/lu";

export default function Approvals() {
  // --- 1. DYNAMIC STATE ---
  const [activeTab, setActiveTab] = useState("Pending");
  const [pendingDoctors, setPendingDoctors] = useState([
    { 
      id: 1, 
      name: "Dr. Kavitha Nair", 
      specialty: "Gynecology", 
      exp: "4Yrs+", 
      location: "Lucknow", 
      fees: "₹700", 
      appliedDate: "28 Mar 2026", 
      initials: "DKN", 
      color: "#6b21a8",
      docs: { degree: true, license: true, proof: true }
    },
    { 
      id: 2, 
      name: "Dr. Arjun Das", 
      specialty: "Orthopedics", 
      exp: "AIIMS Delhi - 5 Yrs", 
      location: "Lucknow", 
      fees: "₹600", 
      appliedDate: "29 Mar 2026", 
      initials: "DAD", 
      color: "#1d4ed8",
      docs: { degree: true, license: true, proof: false }
    },
    { 
      id: 3, 
      name: "Dr. Sunita Rao", 
      specialty: "Dermatology", 
      exp: "Manipal University - 10 Yrs", 
      location: "Lucknow", 
      fees: "₹900", 
      appliedDate: "30 Mar 2026", 
      initials: "DSR", 
      color: "#065f46",
      docs: { degree: true, license: true, proof: true }
    },
  ]);

  // --- 2. ACTIONS ---
  const handleAction = (id, action) => {
    // In a real app, this would call an API
    setPendingDoctors(prev => prev.filter(doc => doc.id !== id));
    alert(`Doctor ${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`);
  };

  return (
      <div style={{ width: "100%", fontFamily: "var(--font-body)" }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <div>
            <h1 style={{ fontSize: "var(--text-xl)", margin: 0, fontFamily: "var(--font-heading)" }}>Doctor Approvals</h1>
            <p className="text-small">Admin / Doctor Approvals</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <LuSearch style={{ position: "absolute", left: "12px", top: "10px", color: "var(--color-text-muted)" }} />
              <input type="text" className="form-input" placeholder="Search doctors, patients..." style={{ paddingLeft: "36px", width: "280px", borderRadius: "var(--radius-full)" }} />
            </div>
            <div className="badge-warning" style={{ padding: "10px", borderRadius: "50%" }}><LuBell /></div>
          </div>
        </header>

        {/* 3. ALERT BANNER */}
        <div style={{ 
          backgroundColor: "var(--color-warning-subtle)", 
          border: "1px solid var(--color-accent-light)", 
          borderRadius: "var(--radius-md)", 
          padding: "var(--space-4) var(--space-6)", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          marginBottom: "var(--space-6)" 
        }}>
          <LuInfo color="var(--color-accent)" size={20} />
          <p style={{ margin: 0, color: "var(--color-text-primary)", fontSize: "var(--text-sm)" }}>
            <strong style={{ color: "var(--color-accent-dark)" }}>{pendingDoctors.length} new applications</strong> need your review — oldest is 3 days pending.
          </p>
        </div>

        {/* 4. TABS */}
        <div style={{ display: "flex", gap: "var(--space-4)", borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-6)" }}>
          <TabItem label={`Pending (${pendingDoctors.length})`} active={activeTab === "Pending"} onClick={() => setActiveTab("Pending")} />
          <TabItem label="Approved (242)" active={activeTab === "Approved"} onClick={() => setActiveTab("Approved")} />
          <TabItem label="Rejected (0)" active={activeTab === "Rejected"} onClick={() => setActiveTab("Rejected")} />
        </div>

        {/* 5. APPROVAL CARDS LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {pendingDoctors.map((doc) => (
            <div key={doc.id} className="card" style={{ display: "flex", gap: "var(--space-6)", padding: "var(--space-6)" }}>
              
              {/* Avatar */}
              <div style={{ 
                width: "60px", height: "60px", borderRadius: "var(--radius-sm)", 
                backgroundColor: doc.color, color: "white", 
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "var(--text-md)", fontWeight: "bold", flexShrink: 0
              }}>
                {doc.initials}
              </div>

              {/* Main Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <h3 style={{ margin: 0, fontSize: "var(--text-md)", fontFamily: "var(--font-heading)" }}>{doc.name}</h3>
                  <span className="badge-warning" style={{ fontSize: "9px" }}>● PENDING</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Applied: {doc.appliedDate}</span>
                </div>
                
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
                  {doc.specialty} • {doc.exp} • Fees: {doc.fees}
                </p>

                {/* Checklist */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <DocCheck label="Degree" checked={doc.docs.degree} />
                  <DocCheck label="License" checked={doc.docs.license} />
                  <DocCheck label="Proof" checked={doc.docs.proof} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => handleAction(doc.id, 'approve')} className="btn btn-primary btn-sm" style={{ backgroundColor: "var(--color-success)", borderColor: "var(--color-success)" }}>
                    <LuCheck size={14} /> Approve
                  </button>
                  <button onClick={() => handleAction(doc.id, 'reject')} className="btn btn-ghost btn-sm" style={{ color: "var(--color-error)", border: "1px solid var(--color-error-subtle)" }}>
                    <LuX size={14} /> Reject
                  </button>
                </div>
                <a href="#" style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: "600", textDecoration: "underline" }}>
                  View Full Profile →
                </a>
              </div>

            </div>
          ))}

          {pendingDoctors.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--space-20)", color: "var(--color-text-muted)" }}>
              <LuCircleCheck size={48} style={{ marginBottom: "12px", opacity: 0.3 }} />
              <p>All set! No pending approvals at the moment.</p>
            </div>
          )}
        </div>
      </div>
  );
}

// --- HELPER COMPONENTS ---

const TabItem = ({ label, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      padding: "var(--space-3) var(--space-2)", 
      cursor: "pointer",
      fontSize: "var(--text-sm)",
      fontWeight: active ? "var(--weight-bold)" : "var(--weight-medium)",
      color: active ? "var(--color-primary)" : "var(--color-text-muted)",
      borderBottom: active ? "3px solid var(--color-primary)" : "3px solid transparent",
      marginBottom: "-1px",
      transition: "all var(--transition-fast)"
    }}
  >
    {label}
  </div>
);

const DocCheck = ({ label, checked }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-text-secondary)" }}>
    {checked ? <LuCheck color="var(--color-success)" size={14} /> : <LuX color="var(--color-error)" size={14} />}
    <span style={{ fontWeight: "500" }}>{label}</span>
  </div>
);

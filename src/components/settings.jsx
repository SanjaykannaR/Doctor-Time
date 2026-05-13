import React, { useState } from "react";
import { 
  LuSearch, LuBell, LuSave, LuRefreshCw, 
  LuUser, LuStethoscope, LuCalendar, LuShieldCheck, LuCreditCard 
} from "react-icons/lu";

export default function Settings() {
  const [activeSubTab, setActiveSubTab] = useState("General");
  
  // State for form toggles
  const [settings, setSettings] = useState({
    autoApprove: false,
    requireDocs: true,
    selfRegister: true,
    emailAlerts: true,
    smsAlerts: true,
    pushAlerts: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
      <div style={{ width: "100%", fontFamily: "var(--font-body)" }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "20px", margin: 0, fontFamily: "var(--font-heading)" }}>Platform Settings</h1>
            <p className="text-small">Admin / Settings</p>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <LuSearch style={{ position: "absolute", left: "12px", top: "10px", color: "var(--color-text-muted)" }} />
              <input type="text" className="form-input" placeholder="Search settings..." style={{ paddingLeft: "36px", width: "280px", borderRadius: "20px" }} />
            </div>
            <div className="badge-warning" style={{ padding: "8px", borderRadius: "50%" }}><LuBell /></div>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px", alignItems: "start" }}>
          
          {/* Settings Sidebar */}
          <div className="card" style={{ padding: "8px" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <SubTab label="General" active={activeSubTab === "General"} onClick={() => setActiveSubTab("General")} />
              <SubTab label="Doctor Approval" active={activeSubTab === "Doctor Approval"} onClick={() => setActiveSubTab("Doctor Approval")} />
              <SubTab label="Appointments" active={activeSubTab === "Appointments"} onClick={() => setActiveSubTab("Appointments")} />
              <SubTab label="Notifications" active={activeSubTab === "Notifications"} onClick={() => setActiveSubTab("Notifications")} />
              <SubTab label="Health Vault" active={activeSubTab === "Health Vault"} onClick={() => setActiveSubTab("Health Vault")} />
              <SubTab label="Billing" active={activeSubTab === "Billing"} onClick={() => setActiveSubTab("Billing")} />
              <SubTab label="Security" active={activeSubTab === "Security"} onClick={() => setActiveSubTab("Security")} />
            </nav>
          </div>

          {/* Settings Content Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Platform Identity Section */}
            <div className="card">
              <h3 style={sectionTitleStyle}>General Settings</h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "20px" }}>Configure platform identity and basic settings</p>
              
              <p style={labelGroupStyle}>PLATFORM IDENTITY</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <InputGroup label="PLATFORM NAME" value="MediLink Healthcare" />
                <InputGroup label="SUPPORT EMAIL" value="support@medilink.in" />
              </div>
              <div style={{ width: "50%", paddingRight: "10px" }}>
                <InputGroup label="SUPPORT PHONE" value="+91 1800 123 4567" />
              </div>

              <p style={{ ...labelGroupStyle, marginTop: "32px" }}>REGISTRATION</p>
              <ToggleRow label="Auto-approve Doctors" active={settings.autoApprove} onToggle={() => toggleSetting('autoApprove')} />
              <ToggleRow label="Require Document Upload" active={settings.requireDocs} onToggle={() => toggleSetting('requireDocs')} />
              <ToggleRow label="Allow Patient Self-Register" active={settings.selfRegister} onToggle={() => toggleSetting('selfRegister')} />
            </div>

            {/* Appointments Section */}
            <div className="card">
              <p style={labelGroupStyle}>APPOINTMENTS</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <SelectGroup label="DEFAULT SLOT DURATION" options={["30 minutes", "45 minutes", "1 hour"]} />
                <SelectGroup label="ADVANCE BOOKING WINDOW" options={["30 days", "60 days", "90 days"]} />
              </div>
              <div style={{ width: "50%", paddingRight: "10px" }}>
                <SelectGroup label="CANCELLATION POLICY" options={["24 hours notice", "12 hours notice", "No refund"]} />
              </div>
            </div>

            {/* Notifications Section */}
            <div className="card">
              <p style={labelGroupStyle}>NOTIFICATIONS</p>
              <ToggleRow label="Email Alerts" active={settings.emailAlerts} onToggle={() => toggleSetting('emailAlerts')} />
              <ToggleRow label="SMS Notifications" active={settings.smsAlerts} onToggle={() => toggleSetting('smsAlerts')} />
              <ToggleRow label="Push Notifications" active={settings.pushAlerts} onToggle={() => toggleSetting('pushAlerts')} />
            </div>

            {/* Footer Actions */}
            <div style={{ display: "flex", gap: "12px", paddingBottom: "40px" }}>
              <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px" }}>
                <LuSave size={18} /> Save All Changes
              </button>
              <button className="btn btn-ghost" style={{ border: "1px solid var(--color-border)", padding: "10px 24px" }}>
                Reset Defaults
              </button>
            </div>

          </div>
        </div>
      </div>
  );
}

// --- HELPER COMPONENTS ---

const SubTab = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      textAlign: "left",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "none",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      backgroundColor: active ? "var(--color-surface-alt)" : "transparent",
      color: active ? "var(--color-primary)" : "var(--color-text-muted)",
      borderLeft: active ? "3px solid var(--color-primary)" : "3px solid transparent",
    }}
  >
    {label}
  </button>
);

const InputGroup = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <label style={{ fontSize: "10px", fontWeight: "700", color: "var(--color-text-muted)" }}>{label}</label>
    <input className="form-input" defaultValue={value} style={{ fontSize: "13px" }} />
  </div>
);

const SelectGroup = ({ label, options }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <label style={{ fontSize: "10px", fontWeight: "700", color: "var(--color-text-muted)" }}>{label}</label>
    <select className="form-input" style={{ fontSize: "13px", appearance: "none" }}>
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);

const ToggleRow = ({ label, active, onToggle }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--color-surface-alt)" }}>
    <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{label}</span>
    <div 
      onClick={onToggle}
      style={{
        width: "40px", height: "20px", borderRadius: "20px", position: "relative", cursor: "pointer",
        backgroundColor: active ? "var(--color-primary)" : "#E5E7EB",
        transition: "background-color 0.2s"
      }}
    >
      <div style={{
        width: "14px", height: "14px", backgroundColor: "white", borderRadius: "50%",
        position: "absolute", top: "3px", left: active ? "23px" : "3px",
        transition: "left 0.2s"
      }} />
    </div>
  </div>
);

const sectionTitleStyle = { fontSize: "16px", margin: "0 0 4px 0", fontWeight: "700" };
const labelGroupStyle = { fontSize: "11px", fontWeight: "800", color: "var(--color-text-muted)", letterSpacing: "0.05em", margin: "0 0 16px 0" };

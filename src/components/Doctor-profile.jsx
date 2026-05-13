import React from "react";
import Layout from "./Layout";

const DoctorProfile = () => {
  const doctor = {
    name: "Dr. Kavitha Nair",
    specialty: "Gynecology & Obstetrics",
    id: "MCI-KL-309812",
    exp: "8 Years Exp.",
    fee: "₹700 / visit",
    applied: "28 Mar 2026",
    email: "kavitha.nair@gmail.com",
    phone: "+91 98451 23456",
    location: "Ernakulam, Kerala",
    degree: "MBBS, MS (Obstetrics)",
    college: "KGMU, Lucknow",
    slot: "30 minutes",
    languages: "English, Malayalam",
  };

  return (
    <Layout mainStyle={{ paddingTop: "8px" }}>
      {/* Container with top margin fix */}
      <div style={{ width: "100%", marginTop: "0", paddingTop: "0" }}>
        
        {/* HEADER SECTION - Using Lora font and primary colors */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <div>
            <h1 style={{ margin: 0 }}>Doctor Profile</h1>
            <p className="text-small" style={{ marginTop: "var(--space-1)" }}>
              Admin / Doctors / <span className="text-primary">{doctor.name}</span>
            </p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
             <button className="btn btn-secondary btn-sm">Download Docs</button>
             <button className="btn btn-primary btn-sm">Edit Profile</button>
          </div>
        </header>

        {/* HERO CARD - Using your 'card' class and teal/gold tokens */}
        <div className="card" style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          marginBottom: "var(--space-8)",
          padding: "var(--space-8)",
          borderLeft: "6px solid var(--color-primary)" 
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
            {/* Avatar using config.css classes */}
            <div className="avatar avatar-xl bg-primary text-inverse" style={{ borderRadius: "var(--radius-md)" }}>
              KN
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <h2 style={{ margin: 0 }}>{doctor.name}</h2>
                <span className="badge badge-warning">Pending Approval</span>
              </div>
              <p className="text-primary" style={{ fontWeight: "var(--weight-semibold)", margin: "var(--space-1) 0" }}>
                {doctor.specialty}
              </p>
              <div style={{ display: "flex", gap: "var(--space-5)" }} className="text-muted text-small">
                <span>🆔 {doctor.id}</span>
                <span>📅 {doctor.exp}</span>
                <span>💰 {doctor.fee}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <button className="btn btn-primary">Approve Doctor</button>
            <button className="btn btn-danger">Reject</button>
          </div>
        </div>

        {/* DETAILS GRID - 2 Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
          
          <section className="card">
            <h4 style={{ marginBottom: "var(--space-4)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
              Personal Information
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <InfoBlock label="Full Name" value={doctor.name} />
              <InfoBlock label="Email Address" value={doctor.email} />
              <InfoBlock label="Phone Number" value={doctor.phone} />
              <InfoBlock label="Clinic Location" value={doctor.location} />
            </div>
          </section>

          <section className="card">
            <h4 style={{ marginBottom: "var(--space-4)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
              Academic & Professional
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <InfoBlock label="Medical Degree" value={doctor.degree} />
              <InfoBlock label="Medical College" value={doctor.college} />
              <InfoBlock label="Consultation Fee" value={doctor.fee} />
              <InfoBlock label="Languages Spoken" value={doctor.languages} />
            </div>
          </section>

          {/* Section 3: Document Verification */}
          <section className="card" style={{ gridColumn: "span 2" }}>
            <h4 style={{ marginBottom: "var(--space-4)" }}>Verification Documents</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
              <DocItem label="Degree Certificate" status="badge-success" text="Verified" />
              <DocItem label="MCI Registration" status="badge-success" text="Verified" />
              <DocItem label="Clinic License" status="badge-warning" text="In Review" />
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
};

// --- Helper Components using Design Tokens ---

const InfoBlock = ({ label, value }) => (
  <div>
    <label className="form-label" style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{label}</label>
    <div style={{ fontSize: "var(--text-base)", color: "var(--color-text-primary)", fontWeight: "var(--weight-medium)" }}>{value}</div>
  </div>
);

const DocItem = ({ label, status, text }) => (
  <div style={{ 
    padding: "var(--space-4)", 
    border: "1px solid var(--color-border)", 
    borderRadius: "var(--radius-md)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)"
  }}>
    <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)" }}>📄 {label}</span>
    <span className={`badge ${status}`} style={{ alignSelf: "flex-start" }}>{text}</span>
  </div>
);

export default DoctorProfile;

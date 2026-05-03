import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiClock,
  FiCopy,
  FiDownload,
  FiFileText,
  FiPrinter,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

const RecordDetailPage = () => {
  const navigate = useNavigate();
  const { recordId } = useParams();

  return (
    <div className="page-shell">
      <main className="page-container">
        <button
          onClick={() => navigate("/vault")}
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: "var(--space-8)" }}
        >
          <FiArrowLeft /> Back to Vault
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1 className="page-title">#{recordId} Cardiology Follow-up</h1>
            <p className="page-subtitle">
              Dr. Arjun Mehta - JIPMER, Puducherry - Jan 08, 2025
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-secondary btn-sm">
              <FiPrinter /> Print
            </button>
            <button className="btn btn-primary btn-sm">
              <FiDownload /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="content-card">
              <h2
                className="section-title"
                style={{ marginBottom: "var(--space-6)" }}
              >
                Doctor's Notes
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="section-title">Diagnosis</h3>
                  <p>
                    Mild hypertension with borderline LDL cholesterol. No acute
                    cardiac event.
                  </p>
                </div>
                <div>
                  <h3 className="section-title">Clinical Observations</h3>
                  <p>
                    BP: 138/88 mmHg. Heart rate: 78 bpm. ECG within normal
                    limits. Echo shows no structural abnormality.
                  </p>
                </div>
                <div>
                  <h3 className="section-title">Advice</h3>
                  <p>
                    Low sodium diet, daily 30 min walk, avoid stress. Follow up
                    in 3 months or sooner if chest discomfort occurs.
                  </p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2
                className="section-title flex items-center gap-2"
                style={{ marginBottom: "var(--space-6)" }}
              >
                Prescription
              </h2>

              <div className="space-y-4 mb-6">
                <div className="stat-card">
                  <p>1. Atorvastatin 40mg</p>
                  <p className="text-small">1 tab at night x 30 days</p>
                </div>
                <div className="stat-card">
                  <p>2. Telmisartan 40mg</p>
                  <p className="text-small">1 tab morning x 30 days</p>
                </div>
                <div className="stat-card">
                  <p>3. Aspirin 75mg</p>
                  <p className="text-small">1 tab after breakfast x 30 days</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-full">
                <FiFileText /> Tap to view prescription photo
              </button>
            </section>
          </div>

          <div className="space-y-8">
            <section className="content-card bg-primary-subtle">
              <h2
                className="section-title text-primary"
                style={{ marginBottom: "var(--space-4)" }}
              >
                Follow-up Reminder
              </h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="icon-tile bg-surface">
                  <FiClock size={20} />
                </div>
                <div>
                  <p>Next Visit: April 15, 2025</p>
                  <p className="text-small">
                    Set by Dr. Arjun Mehta - 3 weeks from now
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <p className="section-title flex items-center gap-1">
                  <FiAlertCircle /> Reminder Note
                </p>
                <p>
                  Bring updated blood pressure log and repeat lipid profile
                  report before this visit.
                </p>
              </div>
            </section>

            <section className="panel-dark">
              <h2
                className="section-title text-accent"
                style={{ marginBottom: "var(--space-3)" }}
              >
                Share This Record
              </h2>
              <p className="text-small" style={{ marginBottom: "var(--space-6)" }}>
                Generate a one-time code to securely share this record with
                another doctor. You can revoke it anytime.
              </p>

              <div
                className="stat-card bg-primary"
                style={{ marginBottom: "var(--space-6)" }}
              >
                <p className="section-title text-inverse flex items-center justify-between">
                  Active Share Code
                  <span className="text-small">Expires in 23 hours</span>
                </p>
                <p className="text-inverse text-center my-4">TXM-4K9-22</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn btn-accent btn-sm col-span-2">
                  <FiCopy /> Copy
                </button>
                <button className="btn btn-secondary btn-sm">
                  <FiRefreshCw /> New Code
                </button>
                <button className="btn btn-danger btn-sm">
                  <FiX /> Revoke
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordDetailPage;

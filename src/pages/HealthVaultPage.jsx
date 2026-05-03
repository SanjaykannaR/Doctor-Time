import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiClock,
  FiEye,
  FiFileText,
  FiPlus,
  FiShare2,
  FiUpload,
} from "react-icons/fi";
import { useVault } from "../hooks/useVault";
import EmptyState from "../components/search/common/EmptyState";
import Spinner from "../components/search/common/Spinner";

const HealthVaultPage = () => {
  const navigate = useNavigate();
  const {
    activePrescriptionCount,
    error,
    loading,
    records,
    reminder,
  } = useVault();

  const getRecordIcon = (type) => {
    if (type === "report") {
      return <FiActivity className="text-accent" />;
    }

    if (type === "lab") {
      return <FiFileText className="text-accent" />;
    }

    return <FiFileText className="text-primary" />;
  };

  return (
    <div className="page-shell">
      <main className="page-container">
        <div className="page-header">
          <h1 className="page-title">Health Vault</h1>
          <p className="page-subtitle">
            Your complete medical history - prescriptions, notes, and reminders
            in one secure place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="stat-card flex items-center justify-between">
            <div>
              <p className="page-title">{records.length}</p>
              <p className="section-title">Total Records</p>
            </div>
            <div className="icon-tile">
              <FiFileText size={20} />
            </div>
          </div>

          <div className="panel-dark md:col-span-2 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-accent section-title mb-2">
                <FiClock /> Upcoming Reminder
              </div>
              <h3 className="text-inverse mb-1">
                {reminder?.title || "No upcoming reminder"}
              </h3>
              <p className="text-small">
                {reminder?.dueText || "You are all caught up."}
              </p>
            </div>
            <button className="btn btn-ghost btn-sm absolute top-6 right-6 text-inverse">
              Dismiss
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="tab-list w-full sm:w-auto">
            <button className="tab-button active">
              All Records ({records.length})
            </button>
            <button className="tab-button">
              Active Prescriptions ({activePrescriptionCount})
            </button>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="btn btn-secondary btn-sm flex-1 sm:flex-none">
              <FiUpload /> Upload
            </button>
            <button className="btn btn-primary btn-sm flex-1 sm:flex-none">
              <FiPlus /> New Record
            </button>
          </div>
        </div>

        {error ? (
          <div className="alert alert-error">{error}</div>
        ) : loading ? (
          <div className="content-card">
            <Spinner rows={4} />
          </div>
        ) : records.length > 0 ? (
          <div className="content-card overflow-hidden">
            {records.map((record, index) => (
              <div
                key={record.id}
                className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors hover:bg-primary-subtle ${
                  index !== records.length - 1 ? "border-b" : ""
                }`}
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="icon-tile">{getRecordIcon(record.type)}</div>
                  <div>
                    <h4>{record.title}</h4>
                    <p className="text-small">{record.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-6 mt-2 md:mt-0">
                  <span className="text-small whitespace-nowrap">
                    {record.date}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/vault/record/${record.id}`)}
                      className="btn btn-secondary btn-sm"
                    >
                      <FiEye /> View
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <FiShare2 /> Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No health records found." />
        )}
      </main>
    </div>
  );
};

export default HealthVaultPage;

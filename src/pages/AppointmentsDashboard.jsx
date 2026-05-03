import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAppointments } from "../services/appointmentService";
import BookingCard from "../components/search/booking/BookingCard";
import EmptyState from "../components/search/common/EmptyState";
import Spinner from "../components/search/common/Spinner";

const AppointmentsDashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadAppointments = async () => {
      setLoading(true);
      const results = await fetchAppointments();

      if (isMounted) {
        setAppointments(results);
        setLoading(false);
      }
    };

    loadAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReschedule = (appointmentId) => {
    navigate(`/booking/${appointmentId}`);
  };

  const handleCancel = (appointmentId) => {
    // TODO: Add cancel appointment logic
    alert(`Cancel appointment ${appointmentId}`);
  };

  const tabs = useMemo(() => {
    const statuses = ["Upcoming", "Past", "Cancelled"];

    return statuses.map((status) => ({
      label: status,
      count: appointments.filter((appointment) => appointment.status === status)
        .length,
    }));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => appointment.status === activeTab);
  }, [activeTab, appointments]);

  return (
    <div className="page-shell">
      <main className="page-container">
        <h1 className="page-title" style={{ marginBottom: "var(--space-8)" }}>
          # My Appointments[cite: 1]
        </h1>

        {/* TABS: Responsive horizontal scroll on mobile[cite: 1] */}
        <div className="tab-list" style={{ marginBottom: "var(--space-10)" }}>
          {tabs.map((tab) => {
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`tab-button ${activeTab === tab.label ? "active" : ""}`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* APPOINTMENT LIST[cite: 1] */}
        {loading ? (
          <Spinner rows={2} />
        ) : filteredAppointments.length > 0 ? (
          <div className="space-y-6">
            {filteredAppointments.map((apt) => (
              <BookingCard
                key={apt.id}
                appointment={apt}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
              />
            ))}
          </div>
        ) : (
          <EmptyState message={`No ${activeTab.toLowerCase()} appointments found.`} />
        )}
      </main>
    </div>
  );
};

// --- THIS IS THE LINE THAT FIXES YOUR ERROR ---
export default AppointmentsDashboard;

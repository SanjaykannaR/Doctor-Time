import React from "react";

const defaultDoctor = {
  name: "Dr. Arjun Mehta",
  fee: "₹900",
};

const ConfirmBookingForm = ({ data, doctor = defaultDoctor, onBack, onConfirm }) => {
  return (
    <div className="content-card animate-in fade-in slide-in-from-bottom-4">
      <h2 style={{ marginBottom: "var(--space-8)" }}>Confirm your details</h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea
              placeholder="e.g. Chest pain check-up, routine ECG..."
              className="form-textarea"
              style={{ minHeight: 128 }}
            />
          </div>
        </div>

        <div className="stat-card">
          <h3 style={{ marginBottom: "var(--space-6)" }}>
            Appointment Summary
          </h3>
          <div className="space-y-4">
            <p className="flex justify-between text-small">
              Doctor <span>{doctor.name}</span>
            </p>
            <p className="flex justify-between text-small">
              Date <span>{data.date}</span>
            </p>
            <p className="flex justify-between text-small">
              Time <span>{data.time}</span>
            </p>
            <p
              className="flex justify-between text-primary"
              style={{
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              Total <span>{doctor.fee}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={onBack} className="btn btn-secondary btn-full">
              Back
            </button>
            <button onClick={onConfirm} className="btn btn-primary btn-full">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingForm;

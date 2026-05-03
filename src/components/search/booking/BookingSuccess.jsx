import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiCheck, FiMapPin } from "react-icons/fi";
import Badge from "../common/Badge";

const BookingSuccess = ({
  doctor = "Dr. Arjun Mehta",
  bookingRef = "DT-2025-03914",
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-500">
      <div className="mb-8 flex justify-center">
        <div className="icon-tile" style={{ width: 96, height: 96 }}>
          <FiCheck size={48} strokeWidth={3} />
        </div>
      </div>

      <h1 className="page-title" style={{ marginBottom: "var(--space-4)" }}>
        Booking Confirmed!
      </h1>
      <p className="page-subtitle mx-auto" style={{ marginBottom: "var(--space-12)" }}>
        Your appointment with <span className="text-primary">{doctor}</span> has
        been successfully booked. You'll receive a confirmation on your phone.
      </p>

      <div className="content-card mb-10 text-left">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="section-title">Booking Reference</p>
            <p className="text-primary">{bookingRef}</p>
          </div>
          <Badge>Ref No.</Badge>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="icon-tile">
              <FiCalendar />
            </div>
            <div>
              <p className="section-title">Date & Time</p>
              <p>Tue, Mar 25 - 10:00 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="icon-tile">
              <FiMapPin />
            </div>
            <div>
              <p className="section-title">Location</p>
              <p>JIPMER, Puducherry</p>
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-8 flex justify-between items-center"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span className="text-small">Amount</span>
          <span>₹900 (Pay at Clinic)</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 px-4">
        <button
          onClick={() => navigate("/appointments")}
          className="btn btn-primary btn-full"
        >
          View Appointments
        </button>
        <button
          onClick={() => navigate("/vault")}
          className="btn btn-secondary btn-full"
        >
          Go to Health Vault <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;

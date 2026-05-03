import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiCheck } from "react-icons/fi";
import SlotPicker from "../components/search/booking/SlotPicker";
import Badge from "../components/search/common/Badge";
import StarRating from "../components/search/common/StarRating";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="page-shell">
      <main className="page-container-wide">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: "var(--space-8)" }}
        >
          <FiArrowLeft /> Back to Search
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="content-card flex-1">
            <div className="page-header">
              <Badge>Doctor #{id}</Badge>
              <h1 className="page-title">Dr. Arjun Mehta</h1>
              <p className="page-subtitle">
                Interventional Cardiologist at JIPMER, Puducherry.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="accent">
                <StarRating rating={4.9} /> Rating
              </Badge>
              <Badge variant="success">
                <FiCheck /> Available Today
              </Badge>
              <Badge>15 Years Experience</Badge>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="section-title">About</h2>
                <p>
                  Experienced cardiology specialist focused on preventive heart
                  care, follow-up planning, and clear patient guidance.
                </p>
              </div>
              <div>
                <h2 className="section-title">Selected Slot</h2>
                <p className="text-small">
                  {selectedSlot
                    ? `${selectedSlot.date} at ${selectedSlot.time}`
                    : "Choose a slot from the booking panel."}
                </p>
              </div>
            </div>
          </section>

          <aside className="w-full lg:w-[420px] space-y-6">
            <SlotPicker onNext={(slot) => setSelectedSlot(slot)} />
            <button
              className="btn btn-primary btn-full"
              disabled={!selectedSlot}
              onClick={() => navigate(`/booking/${id}`)}
            >
              <FiCalendar /> Continue Booking
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfile;

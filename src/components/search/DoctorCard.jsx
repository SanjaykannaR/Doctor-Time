import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiClock, FiMapPin } from "react-icons/fi";
import Badge from "./common/Badge";
import StarRating from "./common/StarRating";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="doctor-card flex flex-col md:flex-row gap-6 group"
      style={{ padding: "var(--space-6)" }}
    >
      <div className="relative shrink-0">
        <img
          src={doctor.image}
          className="w-28 h-28 md:w-40 md:h-40 object-cover shadow-lg"
          style={{ borderRadius: "var(--radius-xl)" }}
          alt={doctor.name}
        />
        <div
          className="absolute -bottom-2 -right-2 bg-surface flex items-center gap-1.5"
          style={{ padding: "var(--space-2)" }}
        >
          <StarRating rating={doctor.rating} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <Badge className="mt-1">{doctor.specialty}</Badge>
            </div>
            <div className="text-right">
              <p className="section-title">Consultation</p>
              <p>{doctor.fee}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge>
              <FiClock /> {doctor.experience} Exp
            </Badge>
            <Badge variant="success">
              <FiCheck /> {doctor.availability}
            </Badge>
            <Badge variant="accent">
              <FiMapPin /> Puducherry
            </Badge>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/doctor/${doctor.id}`)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

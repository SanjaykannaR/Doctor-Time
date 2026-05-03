import React from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiVideo, FiMapPin, FiMoreVertical } from "react-icons/fi";
import Badge from "../common/Badge";

const BookingCard = ({ appointment, onReschedule, onCancel }) => {
  const navigate = useNavigate();

  // Extract day and date from appointment.date (e.g., "MON 24" → "MON", "24")
  const [dayName, dateNum] = appointment.date.split(" ");

  // Determine badge color based on appointment type
  const typeVariant = appointment.type === "Online" ? "info" : "warning";

  // Status colors
  const statusColor = {
    Upcoming: "success",
    Past: "default",
    Cancelled: "danger",
  }[appointment.status] || "default";

  return (
    <div className="content-card flex flex-col md:flex-row gap-8 items-start md:items-center group hover:shadow-lg transition-shadow">
      {/* DATE BLOCK */}
      <div className="bg-primary-subtle text-primary w-24 h-24 rounded-3xl flex flex-col items-center justify-center shrink-0">
        <span className="text-[10px] font-black uppercase">{dayName}</span>
        <span className="text-2xl font-black">{dateNum}</span>
      </div>

      {/* INFO SECTION */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-2">
          <h3 className="group-hover:text-primary transition-colors">
            {appointment.doctor}
          </h3>
          <Badge variant={typeVariant}>
            {appointment.type === "Online" ? (
              <>
                <FiVideo size={12} /> {appointment.type}
              </>
            ) : (
              <>
                <FiMapPin size={12} /> {appointment.type}
              </>
            )}
          </Badge>
        </div>

        <p className="text-small text-muted mb-3">
          <FiClock size={14} className="inline mr-1" />
          {appointment.time} • {appointment.duration || "30 mins"}
        </p>

        {appointment.location && (
          <p className="text-small text-muted">
            <FiMapPin size={14} className="inline mr-1" />
            {appointment.location}
          </p>
        )}

        {appointment.reason && (
          <p className="text-small mt-2">
            <span className="text-muted">Reason:</span> {appointment.reason}
          </p>
        )}
      </div>

      {/* STATUS & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <Badge variant={statusColor} className="shrink-0">
          {appointment.status}
        </Badge>

        {appointment.status === "Upcoming" && (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => onReschedule?.(appointment.id)}
              className="btn btn-secondary btn-sm flex-1 sm:flex-none"
            >
              Reschedule
            </button>
            <button
              onClick={() => onCancel?.(appointment.id)}
              className="btn btn-ghost btn-sm flex-1 sm:flex-none text-danger hover:bg-danger/10"
            >
              Cancel
            </button>
          </div>
        )}

        {appointment.status === "Past" && (
          <button
            onClick={() => navigate(`/record/${appointment.id}`)}
            className="btn btn-secondary btn-sm"
          >
            View Details
          </button>
        )}

        {appointment.status === "Cancelled" && (
          <button
            onClick={() => onReschedule?.(appointment.id)}
            className="btn btn-secondary btn-sm"
          >
            Rebook
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;

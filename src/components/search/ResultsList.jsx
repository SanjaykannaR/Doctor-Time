import React from "react";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import DoctorCard from "./DoctorCard";
import EmptyState from "./common/EmptyState";
import Spinner from "./common/Spinner";

const ResultsList = ({ doctors, loading, onOpenFilters }) => {
  return (
    <main className="flex-1">
      <div className="mb-8 flex justify-between items-center px-2">
        <div>
          <h2>Search Results</h2>
          <p className="section-title">{doctors.length} Specialists found</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFilters}
            className="btn btn-secondary btn-sm xl:hidden"
            style={{ padding: "var(--space-2)" }}
          >
            <FiFilter size={20} />
          </button>

          <div className="relative inline-block">
            <select
              className="form-select"
              style={{
                minWidth: "180px",
                padding:
                  "var(--space-3) var(--space-10) var(--space-3) var(--space-4)",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                backgroundImage: "none",
              }}
            >
              <option>Recommended</option>
              <option>Highest Rating</option>
              <option>Most Experienced</option>
            </select>

            <div
              className="absolute inset-y-0 flex items-center pointer-events-none text-primary"
              style={{ right: "var(--space-3)" }}
            >
              <FiChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner rows={3} />
      ) : doctors.length > 0 ? (
        <div className="grid gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-4"
          message="No doctors found matching your criteria."
        />
      )}
    </main>
  );
};

export default ResultsList;

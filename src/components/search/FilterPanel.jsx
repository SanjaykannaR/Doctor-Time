import React from "react";
import { FiCheck, FiFilter } from "react-icons/fi";

const specialties = [
  "Cardiologist",
  "Cardiac Surgeon",
  "Dermatologist",
  "General Physician",
];

const availabilityOptions = ["Today", "Next 3 Days", "Next Week"];

const FilterPanel = ({
  isOpen,
  onClose,
  resetFilters,
  selectedSpecs,
  toggleSpec,
}) => {
  return (
    <aside
      className={`${
        isOpen
          ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          : "hidden"
      } xl:relative xl:inset-auto xl:block xl:bg-transparent xl:p-0 xl:z-0 xl:w-72 shrink-0`}
    >
      {isOpen && (
        <button
          onClick={onClose}
          className="xl:hidden absolute top-10 right-10 text-white font-black text-2xl"
        >
          ×
        </button>
      )}

      <div
        className="content-card w-full max-w-[320px] xl:max-w-none overflow-hidden"
        style={{ padding: "var(--space-6)", height: "fit-content" }}
      >
        <div className="flex items-center gap-2 mb-8">
          <FiFilter className="text-primary" size={20} />
          <h2>Filters</h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3
              className="section-title mb-4"
              style={{ marginTop: "var(--space-4)" }}
            >
              Specialty
            </h3>
            <div className="space-y-3">
              {specialties.map((spec) => (
                <label
                  key={spec}
                  className="flex items-center gap-3 group cursor-pointer"
                  style={{ marginTop: "var(--space-2)" }}
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSpecs.includes(spec)}
                      onChange={() => toggleSpec(spec)}
                      className="w-5 h-5 rounded-md transition-all cursor-pointer appearance-none border-2 checked:bg-primary"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                    {selectedSpecs.includes(spec) && (
                      <FiCheck className="absolute text-inverse left-1" size={12} />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      selectedSpecs.includes(spec)
                        ? "text-primary font-bold"
                        : "text-muted"
                    }`}
                  >
                    {spec}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="section-title mb-4"
              style={{ marginTop: "var(--space-4)" }}
            >
              Availability
            </h3>
            <div className="space-y-3">
              {availabilityOptions.map((time) => (
                <label
                  key={time}
                  className="flex items-center gap-3 cursor-pointer"
                  style={{ marginTop: "var(--space-2)" }}
                >
                  <input type="checkbox" className="w-5 h-5 rounded-md cursor-pointer" />
                  <span className="text-sm font-medium text-muted">{time}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="btn btn-ghost btn-full btn-sm"
          style={{ marginTop: "var(--space-10)" }}
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterPanel;

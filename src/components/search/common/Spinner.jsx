import React from "react";

const Spinner = ({ className = "", label = "Loading...", rows = 0 }) => {
  if (rows > 0) {
    return (
      <div className={`grid gap-6 ${className}`}>
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="h-40 skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className="inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin text-primary"
        aria-hidden="true"
      />
      <span className="text-small">{label}</span>
    </div>
  );
};

export default Spinner;

import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ className = "", count, rating, size = 14 }) => {
  const numericRating = Number(rating) || 0;
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${className}`}
      style={{
        backgroundColor: "var(--color-accent-subtle)",
        borderColor: "var(--color-accent-dark)",
        color: "var(--color-text-primary)",
      }}
      aria-label={`${numericRating.toFixed(1)} out of 5 rating`}
    >
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {stars.map((star) => (
          <FaStar
            key={star}
            size={Math.max(size - 2, 10)}
            style={{
              color:
                numericRating >= star - 0.25
                  ? "var(--color-accent)"
                  : "var(--color-border-strong)",
            }}
          />
        ))}
      </span>
      <span className="font-black leading-none">{numericRating.toFixed(1)}</span>
      {count ? (
        <span className="text-muted text-xs leading-none">({count})</span>
      ) : null}
    </span>
  );
};

export default StarRating;

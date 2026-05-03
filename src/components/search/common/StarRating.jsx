import React from "react";
import { FiStar } from "react-icons/fi";

const StarRating = ({ className = "", count, rating, size = 14 }) => {
  return (
    <span className={`inline-flex items-center gap-1 text-small ${className}`}>
      <FiStar className="fill-[var(--color-accent)] text-accent" size={size} />
      <span>{rating}</span>
      {count ? <span className="text-muted">({count})</span> : null}
    </span>
  );
};

export default StarRating;

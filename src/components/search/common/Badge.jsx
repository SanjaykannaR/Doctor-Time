import React from "react";

const Badge = ({ children, className = "", variant = "primary" }) => {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
};

export default Badge;

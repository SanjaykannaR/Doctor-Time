import React from "react";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const Avatar = ({ alt, className = "", name, size = "md", src, ...props }) => {
  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      aria-label={alt || name}
      {...props}
    >
      {src ? <img src={src} alt={alt || name} /> : getInitials(name)}
    </div>
  );
};

export default Avatar;

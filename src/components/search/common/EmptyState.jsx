import React from "react";

const EmptyState = ({ children, className = "", message, title }) => {
  return (
    <div className={`empty-state ${className}`}>
      {title ? <h3>{title}</h3> : null}
      {message ? <p>{message}</p> : children}
    </div>
  );
};

export default EmptyState;

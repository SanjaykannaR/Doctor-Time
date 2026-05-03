import React from "react";

const SearchBar = ({ autoFocus = false, className = "", query, setQuery }) => {
  return (
    <div className={className}>
      <input
        type="text"
        autoFocus={autoFocus}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search doctors, specialty..."
        className="form-input"
      />
    </div>
  );
};

export default SearchBar;

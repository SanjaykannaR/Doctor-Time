import React, { useState } from "react";
import FilterPanel from "../components/search/FilterPanel";
import ResultsList from "../components/search/ResultsList";
import SearchBar from "../components/search/SearchBar";
import { useSearch } from "../hooks/useSearch";

const SearchPage = () => {
  const {
    filteredDoctors,
    loading,
    query,
    resetFilters,
    selectedSpecs,
    setQuery,
    toggleSpec,
  } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="page-shell">
      <div className="page-container-wide">
        <SearchBar
          autoFocus
          className="md:hidden mb-6"
          query={query}
          setQuery={setQuery}
        />

        <div className="flex flex-col xl:flex-row gap-8">
          <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            resetFilters={resetFilters}
            selectedSpecs={selectedSpecs}
            toggleSpec={toggleSpec}
          />

          <ResultsList
            doctors={filteredDoctors}
            loading={loading}
            onOpenFilters={() => setIsFilterOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

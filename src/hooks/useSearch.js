import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchDoctors } from "../services/doctorService";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecs, setSelectedSpecs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadDoctors = async () => {
      setLoading(true);
      const results = await searchDoctors();

      if (isMounted) {
        setAllDoctors(results);
        setLoading(false);
      }
    };

    loadDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  const setQuery = (nextQuery) => {
    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery) {
      setSearchParams({ q: nextQuery });
      return;
    }

    setSearchParams({});
  };

  const toggleSpec = (spec) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((item) => item !== spec) : [...prev, spec],
    );
  };

  const resetFilters = () => {
    setSearchParams({});
    setSelectedSpecs([]);
  };

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return allDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(normalizedQuery) ||
        doctor.specialty.toLowerCase().includes(normalizedQuery);
      const matchesSpec =
        selectedSpecs.length === 0 || selectedSpecs.includes(doctor.specialty);

      return matchesSearch && matchesSpec;
    });
  }, [allDoctors, query, selectedSpecs]);

  return {
    filteredDoctors,
    loading,
    query,
    resetFilters,
    selectedSpecs,
    setQuery,
    toggleSpec,
  };
};

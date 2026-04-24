import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiStar, FiClock, FiMapPin, FiCheck, FiChevronDown } from "react-icons/fi";
import { searchDoctors } from "../services/doctorService";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Added setSearchParams to update URL
  const query = searchParams.get("q") || "";

  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecs, setSelectedSpecs] = useState([]);

  // --- MISSING LOGIC 1: Toggle Specialty ---
  const toggleSpec = (spec) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec],
    );
  };

  // --- MISSING LOGIC 2: Reset Filters ---
  const resetFilters = () => {
    setSearchParams({}); // This clears the 'q' from the URL (replacing setQuery)
    setSelectedSpecs([]);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const results = await searchDoctors();
      setAllDoctors(results);
      setLoading(false);
    };
    init();
  }, []);

  const filteredDoctors = allDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(query.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(query.toLowerCase());
    const matchesSpec =
      selectedSpecs.length === 0 || selectedSpecs.includes(doc.specialty);
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div
        className="max-w-[2560px] mx-auto px-4 md:px-8 py-8"
        style={{ padding: "var(--space-4)" }}
      >
        <div
          className="mb-12"
          style={{ marginTop: "var(--space-6)", paddingLeft: "var(--space-2)" }}
        >
          <h3 className="text-3xl font-black text-gray-900">
            {query ? `Results for "${query}"` : "Find Your Specialist"}
          </h3>
          <p className="text-gray-500 font-medium mt-2" style={{marginBottom: 'var(--space-3)'}}>
            Showing {filteredDoctors.length} doctors based on your search and
            filters.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTERS */}
          <aside className="w-full lg:w-72 shrink-0">
            <div
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24 overflow-hidden"
              style={{ padding: "var(--space-6)", height: "fit-content" }}
            >
              <div className="flex items-center gap-2 mb-8 text-gray-900">
                <FiFilter className="text-emerald-600" size={20} />
                <h2 className="font-extrabold text-lg">Filters</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3
                    className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4"
                    style={{ marginTop: "var(--space-4)" }}
                  >
                    Specialty
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Cardiologist",
                      "Cardiac Surgeon",
                      "Dermatologist",
                      "General Physician",
                    ].map((spec) => (
                      <label
                        key={spec}
                        className="flex items-center gap-3 group cursor-pointer"
                        style={{ marginTop: "var(--space-2)" }}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSpecs.includes(spec)}
                            onChange={() => toggleSpec(spec)} // Now defined above!
                            className="w-5 h-5 rounded-md border-gray-200 text-emerald-600 focus:ring-emerald-500/20 transition-all cursor-pointer appearance-none border-2 checked:bg-emerald-600 checked:border-emerald-600"
                          />
                          {selectedSpecs.includes(spec) && (
                            <FiCheck
                              className="absolute text-white left-1"
                              size={12}
                            />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium transition-colors ${selectedSpecs.includes(spec) ? "text-emerald-700 font-bold" : "text-gray-500"}`}
                        >
                          {spec}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4"
                    style={{ marginTop: "var(--space-4)" }}
                  >
                    Availability
                  </h3>
                  <div className="space-y-3">
                    {["Today", "Next 3 Days", "Next Week"].map((time) => (
                      <label
                        key={time}
                        className="flex items-center gap-3 cursor-pointer"
                        style={{ marginTop: "var(--space-2)" }}
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-gray-200 text-emerald-600 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-500">
                          {time}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={resetFilters} // Now uses the reset function above
                className="w-full mt-10 py-3 text-xs font-bold text-gray-400 hover:text-emerald-600 transition-colors uppercase tracking-widest border-t border-gray-50 pt-6"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* MAIN RESULTS AREA */}
          <main className="flex-1">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Search Results
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {filteredDoctors.length} Specialists found
                </p>
              </div>

              <select
                className="appearance-none bg-white border border-gray-100 rounded-lg px-4 py-2 text-xs font-bold text-emerald-600 focus:outline-none shadow-sm"
                style={{ padding: "var(--space-3)" }}
              >
                <option>Recommended</option>
                <option>Highest Rating</option>
                <option>Most Experienced</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-emerald-600" >
                <FiChevronDown size={14} />
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-48 bg-gray-200 rounded-[2.5rem] animate-pulse"
                  />
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="grid gap-6">
                {filteredDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200"
                style={{ marginTop: "var(--space-4)" }}
              >
                <p className="text-gray-400 font-bold">
                  No doctors found matching your criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ doctor }) => (
  <div
    className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 group"
    style={{ padding: "var(--space-6)" }}
  >
    <div className="relative shrink-0">
      <img
        src={doctor.image}
        className="w-28 h-28 md:w-40 md:h-40 rounded-[2rem] object-cover shadow-lg"
        alt={doctor.name}
      />
      <div
        className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-xl flex items-center gap-1.5 border border-gray-50"
        style={{ padding: "var(--space-2)" }}
      >
        <FiStar className="fill-emerald-500 text-emerald-500" size={14} />
        <span className="text-xs font-black text-gray-800">
          {doctor.rating}
        </span>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-between py-2">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">
              {doctor.name}
            </h3>
            <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest mt-1">
              {doctor.specialty}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">
              Consultation
            </p>
            <p className="text-xl font-black text-gray-900">{doctor.fee}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="bg-gray-50 text-[10px] font-black text-gray-500 px-4 py-2 rounded-xl flex items-center gap-2 uppercase tracking-widest">
            <FiClock /> {doctor.experience} Exp
          </span>
          <span className="bg-emerald-50 text-[10px] font-black text-emerald-600 px-4 py-2 rounded-xl flex items-center gap-2 uppercase tracking-widest">
            <FiCheck /> {doctor.availability}
          </span>
          <span className="bg-gray-50 text-[10px] font-black text-gray-500 px-4 py-2 rounded-xl flex items-center gap-2 uppercase tracking-widest">
            <FiMapPin /> Puducherry
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className=" btn btn-primary btn-sm bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95">
          Book Appointment
        </button>
      </div>
    </div>
  </div>
);

export default SearchPage;

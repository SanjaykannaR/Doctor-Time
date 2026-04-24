import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import { fetchHomeData } from "../services/homeService";

const HomePage = () => {
  const navigate = useNavigate();

  // 1. Set up State
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. The `useEffect` hook to fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // FIX: Now correctly calling fetchHomeData() from homeService.js
        const homeData = await fetchHomeData();
        setData(homeData);
      } catch (err) {
        console.error("The API crashed:", err); // Now 'err' is being used!
        setError("Failed to load home page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 3. Handle Loading State
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <p
          className="font-bold animate-pulse"
          style={{ color: "var(--color-primary)" }}
        >
          Loading Doctor Time...
        </p>
      </div>
    );
  }

  // 4. Handle Error State
  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  // 5. Safe Destructuring (Now we know data exists)
  const { user, upcomingAppointment, recentRecords, suggestedDoctors } = data;

 
  // --- STATIC AD DATA ---
  const currentAd = {
    // Swapped to a real, professional medical image
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300&h=600&auto=format&fit=crop", 
    link: "#",
    alt: "Healthcare Premium Service"
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* MAIN LAYOUT WRAPPER */}
      <div className="max-w-[2560px] mx-auto px-4 md:px-8 pb-12 mt-4 md:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ========================================================= */}
          {/* LEFT SIDE: YOUR ORIGINAL CONTENT (Spans 9 columns)        */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-9"
            style={{
              padding: "var(--space-6)",
            }}
          >
            {/* PREMIUM HERO BANNER */}
            <div
              className="rounded-3xl p-6 md:p-10 mb-10 relative overflow-hidden shadow-lg"
              style={{
                backgroundColor: "var(--color-primary)",
                padding: "var(--space-6)",
                marginTop: "var(--space-6)",
              }}
            >
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full opacity-10 bg-white"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    {/* DYNAMIC USER NAME */}
                    <h1
                      className="text-md md:text-3xl font-bold"
                      style={{ color: "var(--color-text-inverse)" }}
                    >
                      Welcome back, {user.firstName}!
                    </h1>
                    <p
                      className="mt-2 text-sm md:text-lg "
                      style={{
                        color: "var(--color-primary-subtle)",
                        marginTop: "var(--space-2)",
                      }}
                    >
                      Here is your health overview for today.
                    </p>
                  </div>

                  <button
                    className="btn btn-accent"
                    style={{ marginBottom: "var(--space-3)" }}
                    onClick={() => navigate("/search")}
                  >
                    Find a Doctor
                  </button>
                </div>

                <div className="card mt-2 border-0 shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div>
                    <div className="flex-nowrap items-center gap-3 mb-2">
                      <h4 className="font-bold text-xl">
                        {upcomingAppointment.doctorName}
                      </h4>
                      <span
                        className="badge badge-success"
                        style={{ marginTop: "var(--space-3)" }}
                      >
                        <FiCheckCircle /> Confirmed
                      </span>
                    </div>
                    <p
                      className="text-primary font-medium text-sm md:text-md"
                      style={{ marginTop: "var(--space-1)" }}
                    >
                      {upcomingAppointment.specialty}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-muted text-sm md:text-base">
                    <p
                      className="flex flex-wrap items-center gap-2 font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      <FiCalendar className="text-primary" />{" "}
                      {upcomingAppointment.date}
                      <span className="mx-2 hidden sm:inline">|</span>
                      <FiClock className="text-primary" />{" "}
                      {upcomingAppointment.time}
                    </p>
                  </div>

                  <div className="mt-2 md:mt-0 w-full md:w-auto">
                    <button className="btn btn-secondary w-full">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM GRID: RECORDS & DOCTORS */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 "
              style={{ marginTop: "var(--space-6)" }}
            >
              {/* LEFT COLUMN: Health Vault Snapshot */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Recent Records</h3>
                  <button
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    View Vault &rarr;
                  </button>
                </div>

                <div
                  className="flex flex-col gap-3"
                  style={{ marginTop: "var(--space-6)" }}
                >
                  {recentRecords.map((record) => (
                    <div
                      key={record.id}
                      className="card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded"
                          style={{
                            backgroundColor: "var(--color-primary-subtle)",
                            color: "var(--color-primary)",
                          }}
                        >
                          📄
                        </div>
                        <div>
                          <h4 className="font-semibold text-md">
                            {record.title}
                          </h4>
                          <p className="text-sm text-muted">{record.date}</p>
                        </div>
                      </div>
                      <button
                        className="text-sm font-medium self-end"
                        style={{ color: "var(--color-primary)" }}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Suggested Doctors */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Suggested for You</h3>
                  <button
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    See All &rarr;
                  </button>
                </div>

                <div
                  className="flex flex-col gap-3"
                  style={{ marginTop: "var(--space-6)" }}
                >
                  {suggestedDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="avatar avatar-md bg-gray-200 flex items-center justify-center rounded-full w-10 h-10">
                          {doctor.name.charAt(4)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p
                            className="text-sm"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-start gap-1 md:items-end">
                        <p
                          className="text-xs font-bold"
                          style={{ color: "var(--color-accent-dark)" }}
                        >
                          ⭐ {doctor.rating}
                        </p>
                        <button className="btn btn-secondary text-xs px-3 py-1">
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: THE NEW AD BANNER (Spans 3 columns)             */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3" style={{marginTop: 'var(--space-4)', marginRight: 'var(--space-3)'}}>
            <div className="sticky top-24">
              <a
                href={currentAd.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
              >
                <span className="absolute top-2 right-2 bg-black/50 text-[10px] text-white px-2 py-1 rounded backdrop-blur-md z-10">
                  Sponsored
                </span>
                <img
                  src={currentAd.imageUrl}
                  alt={currentAd.alt}
                  className="w-full h-auto object-cover min-h-[600px] group-hover:scale-105 transition-transform duration-500"
                />
              </a>
              <p className="text-center text-gray-400 text-xs mt-4 uppercase tracking-widest">
                Partner Advertisement
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

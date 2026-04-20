import React from 'react';
import { useNavigate } from 'react-router-dom';
// HINT: Import icons here! 

import { FiCalendar, FiClock, FiMapPin, FiCheckCircle } from "react-icons/fi";


const HomePage = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const upcomingAppointment = {
    doctorName: "Dr. Arjun Mehta",
    specialty: "Interventional Cardiologist",
    date: "Tue, Mar 25",
    time: "10:00 AM",
    location: "JIPMER, Puducherry",
  };

  const recentRecords = [
    { id: 1, title: "ECG + Echo Report", date: "Feb 14, 2025" },
    { id: 2, title: "Prescription - Atorvastatin", date: "Jan 08, 2025" },
  ];

  const suggestedDoctors = [
    { id: 1, name: "Dr. Priya Sundaram", specialty: "Cardiologist", rating: 4.8 },
    { id: 2, name: "Dr. Karthik Rajan", specialty: "Cardiac Surgeon", rating: 4.6 },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '--color-primary', padding: 'var(--space-6)' }}>
      <div className="max-w-6xl mx-auto">
        
        {/* ============================== */}
        {/* WELCOME HEADER                 */}
        {/* ============================== */}
        {/* ============================== */}
        {/* PREMIUM HERO BANNER            */}
        {/* ============================== */}
        {/* Using your brand Teal color for a massive, premium background */}
        <div 
          className="rounded-3xl p-6 md:p-10 mb-10 relative overflow-hidden shadow-lg" 
          style={{ backgroundColor: 'var(--color-primary)', padding: 'var(--space-6)' }}
        >
          {/* Decorative background circle to add depth */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full opacity-10 bg-white"></div>

          <div className="relative z-10">
            
            {/* 1. WELCOME TEXT & CTA */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text-inverse)' }}>
                  Welcome back, Sanjay!
                </h1>
                <p className="mt-2 text-lg" style={{ color: 'var(--color-primary-subtle)' }}>
                  Here is your health overview for today.
                </p>
              </div>
              
              {/* Upgraded to your Gold Accent button for maximum contrast! */}
              <button 
                className="btn btn-accent" 
                onClick={() => navigate('/search')}
              >
                Find a Doctor
              </button>
            </div>

            {/* 2. ELEVATED APPOINTMENT CARD */}
            {/* This white card now "floats" inside the teal banner */}
            <div className="card mt-2 border-0 shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-6">
              
              {/* Doctor Info & Badge */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-xl">{upcomingAppointment.doctorName}</h4>
                  {/* Using your custom badge-success class! */}
                  <span className="badge badge-success">
                    <FiCheckCircle /> Confirmed
                  </span>
                </div>
                <p className="text-primary font-medium text-md">{upcomingAppointment.specialty}</p>
              </div>

              {/* Time & Location with Icons! */}
              <div className="flex flex-col gap-2 text-muted text-sm md:text-base">
                 <p className="flex items-center gap-2 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    <FiCalendar className="text-primary" /> {upcomingAppointment.date}
                    <span className="mx-2">|</span>
                    <FiClock className="text-primary" /> {upcomingAppointment.time}
                 </p>
                 <p className="flex items-center gap-2">
                    <FiMapPin /> {upcomingAppointment.location}
                 </p>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-2 md:mt-0 w-full md:w-auto">
                 <button className="btn btn-secondary w-full">
                   Reschedule
                 </button>
              </div>

            </div>

          </div>
        </div>

        {/* ============================== */}
        {/* BOTTOM GRID: RECORDS & DOCTORS */}
        {/* ============================== */}
        {/* RESPONSIVE HINT: grid-cols-1 on mobile, grid-cols-2 on tablet/desktop */}
        
        {/* ============================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 " style={{marginTop: "var(--space-6)"}}>
          
          {/* LEFT COLUMN: Health Vault Snapshot */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Recent Records</h3>
              <button className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>View Vault &rarr;</button>
            </div>
            
            <div className="flex flex-col gap-3" style={{marginTop: "var(--space-6)"}}>
              {/* Mapping over the recentRecords data! */}
              {recentRecords.map((record) => (
                <div key={record.id} className="card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    {/* A small teal icon box */}
                    <div className="p-2 rounded" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                      📄 
                    </div>
                    <div>
                      {/* Pulling the title ("ECG + Echo Report", etc.) and date dynamically [cite: 345] */}
                      <h4 className="font-semibold text-md">{record.title}</h4>
                      <p className="text-sm text-muted">{record.date}</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>View</button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Suggested Doctors */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Suggested for You</h3>
              <button className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>See All &rarr;</button>
            </div>
            
            <div className="flex flex-col gap-3" style={{marginTop: "var(--space-6)"}}>
               {/* Mapping over the suggestedDoctors data! */}
              {suggestedDoctors.map((doctor) => (
                <div key={doctor.id} className="card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    
                    {/* Using your custom avatar class from config.css!  */}
                    <div className="avatar avatar-md">
                       {/* This grabs the first letter of the doctor's name (skipping "Dr. ") */}
                       {doctor.name.charAt(4)} 
                    </div>
                    
                    <div>
                      <h4 className="font-semibold">{doctor.name}</h4>
                      <p className="text-sm" style={{ color: 'var(--color-primary)' }}>{doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-xs font-bold" style={{ color: 'var(--color-accent-dark)' }}>⭐ {doctor.rating}</p>
                    {/* Using a smaller version of your secondary button */}
                    <button className="btn btn-secondary text-xs px-3 py-1">Book</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;
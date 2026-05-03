import React, { useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';

const SlotPicker = ({ onNext }) => {
  // State for tracking the user's selections[cite: 1]
  const [selectedDate, setSelectedDate] = useState('MON 24');
  const [selectedTime, setSelectedTime] = useState(null);

  // Mock data matching your design for Dr. Arjun Mehta[cite: 1]
  const fee = "₹900";
  const dates = ['MON 24', 'TUE 25', 'WED 26', 'THU 27', 'FRI 28', 'SAT 29', 'SUN 30'];
  const slots = {
    morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    afternoon: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"]
  };

  const handleNext = () => {
    // Pass the selected data back to the parent (BookingPage) to move to Step 2[cite: 1]
    onNext({
      date: selectedDate,
      time: selectedTime,
      fee: fee
    });
  };

  return (
    <div className="content-card animate-in fade-in slide-in-from-bottom-4">
      <h2 className="mb-8 flex items-center gap-2">
        <FiCalendar className="text-primary" /> Choose your slot
      </h2>

      {/* DATE PICKER STRIP[cite: 1] */}
      <div className="mb-8">
        <p className="section-title mb-4">Select Date</p>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime(null); // Reset time when date changes
              }}
              className={`shrink-0 w-20 h-24 flex flex-col items-center justify-center transition-all border-2 ${
                selectedDate === date 
                ? 'bg-primary text-inverse' 
                : 'bg-surface text-muted'
              }`}
              style={{ borderColor: selectedDate === date ? "var(--color-primary)" : "var(--color-border)", borderRadius: "var(--radius-lg)" }}
            >
              <span className="text-xs font-black uppercase mb-1">{date.split(' ')[0]}</span>
              <span className="text-xl font-black">{date.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TIME SLOTS: MORNING[cite: 1] */}
      <div className="mb-8">
        <p className="section-title mb-4 flex items-center gap-1">
          <FiClock /> Morning
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.morning.map(time => (
            <button 
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`slot-chip ${
                selectedTime === time 
                ? 'selected' 
                : ''
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* TIME SLOTS: AFTERNOON[cite: 1] */}
      <div className="mb-10">
        <p className="section-title mb-4 flex items-center gap-1">
          <FiClock /> Afternoon
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.afternoon.map(time => (
            <button 
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`slot-chip ${
                selectedTime === time 
                ? 'selected' 
                : ''
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER: PRICE & NEXT BUTTON[cite: 1] */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div>
          <p className="section-title mb-1">Consultation Fee</p>
          <p className="page-title">{fee}</p>
        </div>
        
        <button 
          onClick={handleNext}
          disabled={!selectedTime}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          Next: Confirm Details
        </button>
      </div>
    </div>
  );
};

// --- THIS LINE FIXES YOUR ERROR ---
export default SlotPicker;

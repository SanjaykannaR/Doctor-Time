import React, { useState } from 'react';
import SlotPicker from './SlotPicker';
import ConfirmBookingForm from './ConfirmModal';
import BookingSuccess from './BookingSuccess'; // For Page 6

const BookingSteps = ({ doctor }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    reason: '',
    hasReports: false
  });

  // Step Indicator UI from Page 4
  const steps = ["Select Slot", "Confirm Details", "Confirmed!"];

  return (
    <div className="page-container">
      {/* 1-2-3 Progress Bar */}
      <div className="flex justify-between items-center mb-12 px-4 md:px-20">
        {steps.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
              step >= i + 1 ? 'bg-primary text-inverse' : 'bg-surface text-muted'
            }`}>
              {i + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              step >= i + 1 ? 'text-primary' : 'text-muted'
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      {step === 1 && (
        <SlotPicker 
          onNext={(data) => {
            setBookingData({ ...bookingData, ...data });
            setStep(2);
          }} 
        />
      )}

      {step === 2 && (
        <ConfirmBookingForm 
          data={bookingData} 
          doctor={doctor}
          onBack={() => setStep(1)}
          onConfirm={() => setStep(3)} 
        />
      )}

      {step === 3 && <BookingSuccess />}
    </div>
  );
};

export default BookingSteps;

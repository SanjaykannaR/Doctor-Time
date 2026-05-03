import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing the components from your specific folder structure
import SlotPicker from '../components/search/booking/SlotPicker';
import ConfirmModal from '../components/search/booking/ConfirmModal'; 
import BookingSuccess from '../components/search/booking/BookingSuccess';

const BookingPage = () => {
  const navigate = useNavigate();

  // HOOKS: Managing the 3-step flow from your PDF
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDetails, setSelectedDetails] = useState({
    date: null,
    time: null
  });

  // Step Labels for the progress indicator
  const steps = ["Select Slot", "Confirm Details", "Confirmed!"];

  return (
    <div className="page-shell">
      <main className="page-container">
        {/* STEP INDICATOR (Design Page 4)[cite: 1] */}
        <div className="flex justify-between items-center mb-16 max-w-2xl mx-auto">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-3 relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all duration-500 ${
                currentStep >= i + 1 
                ? 'bg-primary text-inverse' 
                : 'bg-surface text-muted'
              }`}>
                {i + 1}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                currentStep >= i + 1 ? 'text-primary' : 'text-muted'
              }`}>
                {label}
              </span>
            </div>
          ))}
          {/* Background Connector Line */}
          <div className="absolute top-[178px] left-1/2 -translate-x-1/2 w-full max-w-md h-1 bg-gray-100 -z-0" />
        </div>

        {/* STEP CONTENT SWITCHER[cite: 1] */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {currentStep === 1 && (
            <div className="max-w-xl mx-auto">
              <SlotPicker 
                onNext={(data) => {
                  setSelectedDetails(data);
                  setCurrentStep(2);
                }} 
              />
            </div>
          )}

          {currentStep === 2 && (
            <ConfirmModal 
              data={selectedDetails}
              onBack={() => setCurrentStep(1)}
              onConfirm={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <BookingSuccess 
              onViewAppointments={() => navigate('/appointments')}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// --- THIS FIXES THE "default export" ERROR ---
export default BookingPage;

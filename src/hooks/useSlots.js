import { useState, useEffect } from 'react';

export const useSlots = (doctorId) => {
  const [slots, setSlots] = useState({ morning: [], afternoon: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will eventually fetch from your appointmentService.js
    const fetchSlots = async () => {
      // Mocking the data from Page 4
      const availableSlots = {
        morning: ["10:00 AM", "10:30 AM", "11:00 AM"],
        afternoon: ["2:00 PM", "2:30 PM", "3:30 PM"]
      };
      setSlots(availableSlots);
      setLoading(false);
    };
    fetchSlots();
  }, [doctorId]);

  return { slots, loading };
};
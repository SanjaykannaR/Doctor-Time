// src/services/homeService.js

const mockHomeData = {
  user: { firstName: "Sanjay", id: "pat_123" },
  upcomingAppointment: {
    id: "app_987",
    doctorName: "Dr. Arjun Mehta",
    specialty: "Interventional Cardiologist",
    date: "Tue, Mar 25",
    time: "10:00 AM",
  },
  recentRecords: [
    { id: "REC-002", title: "ECG + Echo Report", date: "Feb 14, 2025" },
    { id: "REC-003", title: "Prescription - Atorvastatin", date: "Jan 08, 2025" },
  ],
  suggestedDoctors: [
    { id: 1, name: "Dr. Priya Sundaram", specialty: "Cardiologist", rating: 4.8 },
    { id: 2, name: "Dr. Karthik Rajan", specialty: "Cardiac Surgeon", rating: 4.6 },
  ]
};

export const fetchHomeData = () => {
  return new Promise((resolve) => {
    // Simulates a 1-second delay so you can test your loading screen
    setTimeout(() => {
      resolve(mockHomeData);
    }, 1000);
  });
};

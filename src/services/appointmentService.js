const mockAppointments = [
  {
    id: "DT-2025-03914",
    date: "MAR 25",
    time: "10:00 AM",
    doctor: "Dr. Arjun Mehta",
    specialty: "Interventional Cardiologist",
    hospital: "JIPMER, Puducherry",
    type: "In-person",
    status: "Upcoming",
  },
  {
    id: "DT-2025-04112",
    date: "APR 02",
    time: "3:30 PM",
    doctor: "Dr. Meena Iyer",
    specialty: "Cardiologist",
    hospital: "Online",
    type: "Online",
    status: "Upcoming",
  },
  {
    id: "DT-2025-02871",
    date: "FEB 18",
    time: "11:30 AM",
    doctor: "Dr. Priya Sundaram",
    specialty: "Cardiologist",
    hospital: "Apollo Chennai",
    type: "In-person",
    status: "Past",
  },
  {
    id: "DT-2025-02644",
    date: "FEB 02",
    time: "4:00 PM",
    doctor: "Dr. Karthik Rajan",
    specialty: "Cardiac Surgeon",
    hospital: "Online",
    type: "Online",
    status: "Past",
  },
  {
    id: "DT-2025-02338",
    date: "JAN 19",
    time: "9:30 AM",
    doctor: "Dr. Ananya Iyer",
    specialty: "Dermatologist",
    hospital: "City Skin Clinic",
    type: "In-person",
    status: "Past",
  },
  {
    id: "DT-2025-01987",
    date: "JAN 06",
    time: "2:00 PM",
    doctor: "Dr. Arjun Mehta",
    specialty: "Interventional Cardiologist",
    hospital: "JIPMER, Puducherry",
    type: "In-person",
    status: "Past",
  },
  {
    id: "DT-2024-11752",
    date: "DEC 14",
    time: "5:00 PM",
    doctor: "Dr. Meena Iyer",
    specialty: "Cardiologist",
    hospital: "Online",
    type: "Online",
    status: "Past",
  },
  {
    id: "DT-2025-03201",
    date: "MAR 08",
    time: "12:00 PM",
    doctor: "Dr. Priya Sundaram",
    specialty: "Cardiologist",
    hospital: "Apollo Chennai",
    type: "In-person",
    status: "Cancelled",
  },
];

export const fetchAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAppointments);
    }, 500);
  });
};

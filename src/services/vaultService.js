const mockVaultData = {
  records: [
    {
      id: "REC-001",
      title: "Cardiology Follow-up",
      subtitle: "Dr. Arjun Mehta - JIPMER",
      date: "Jan 08, 2025",
      type: "note",
    },
    {
      id: "REC-002",
      title: "ECG + Echo Report",
      subtitle: "Dr. Priya Sundaram - Apollo Chennai",
      date: "Feb 14, 2025",
      type: "report",
    },
    {
      id: "REC-003",
      title: "Prescription - Atorvastatin 40mg",
      subtitle: "Dr. Arjun Mehta - JIPMER",
      date: "Jan 08, 2025",
      type: "prescription",
    },
    {
      id: "REC-004",
      title: "Blood Panel - Lipid Profile",
      subtitle: "Uploaded manually - City Lab",
      date: "Dec 20, 2024",
      type: "lab",
    },
  ],
  reminder: {
    title: "Follow-up with Dr. Arjun Mehta",
    dueText: "April 15, 2025 - 3 weeks away",
  },
};

export const fetchVaultData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVaultData);
    }, 500);
  });
};

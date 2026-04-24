// src/services/doctorService.js

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Priya Sundaram",
    specialty: "Cardiologist",
    experience: "12 Years",
    rating: 4.8,
    reviews: 124,
    availability: "Available Tomorrow",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
    fee: "₹500"
  },
  {
    id: 2,
    name: "Dr. Karthik Rajan",
    specialty: "Cardiac Surgeon",
    experience: "15 Years",
    rating: 4.9,
    reviews: 89,
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    fee: "₹800"
  },
  {
    id: 3,
    name: "Dr. Ananya Iyer",
    specialty: "Dermatologist",
    experience: "8 Years",
    rating: 4.6,
    reviews: 210,
    availability: "Available Monday",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
    fee: "₹400"
  }
];

export const searchDoctors = async (query = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockDoctors.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase()) || 
        doc.specialty.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 800); // Small delay to test your loading state
  });
};
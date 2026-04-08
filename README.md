DoctorTime 🏥
DoctorTime is a comprehensive digital healthcare platform designed to streamline doctor-patient interactions, appointment scheduling, and medical record management.
🚀 Overview
Booking doctor appointments today often involves long wait times and fragmented paper records. DoctorTime solves this by providing:
Real-time Appointment Booking: Patients can find doctors and book slots in under 2 minutes.
Digital Health Vault: A secure place for patients to store prescriptions, doctor notes, and diagnosis history.
Practice Management: Tools for doctors to manage availability and send digital notes to patients.
🛠 Tech Stack
Layer
Technology
Frontend
React (Vite), Tailwind CSS
State Management
Redux Toolkit
Routing
React Router v6
Backend (Phase 2)
Node.js, Express
Database (Phase 2)
MongoDB, Mongoose

👥 User Roles & Features
1. Patient 🧑‍💼
Search & Discovery: Filter doctors by specialty, location, fee, and rating.
Booking: View real-time slots and manage upcoming/past appointments.
Health Vault: Upload physical prescriptions, view digital doctor notes, and share records via secure codes.
2. Doctor 👨‍⚕️
Profile Management: Professional bio, qualifications, and consultation fee setup.
Availability: Set weekly hours, define slot durations, and mark holidays/leaves.
Consultation Tools: View patient details and write post-visit notes directly into the patient's vault.
3. Admin 🔑
Doctor Verification: Review and approve/reject new doctor registrations.
Platform Oversight: Monitor total bookings and manage user accounts.
📁 Project Structure (Frontend)
The project follows a feature-based folder structure to ensure scalability:
src/pages/: Container components connected to Redux (e.g., SearchPage.jsx, HealthVaultPage.jsx).
src/components/: Modular UI pieces categorized by feature (search, booking, vault, common).
src/store/: Redux slices for managing application state.
src/services/: Centralized Axios API call logic.
🗺 Development Roadmap
Phase 1: Build complete frontend UI with mock data and Redux state.
Phase 2: Implement Node.js/Express backend and MongoDB integration.
Phase 3: Finalize JWT-based authentication and secure health record sharing.
👥 Team
Sanjay: Patient Side & Health Vault UI.
Prasanth: Doctor Side & Appointment Management.
Siva: Admin Panel & Shared UI Components.


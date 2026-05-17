import React from 'react';
// 1. Remove BrowserRouter from the import
import { Routes, Route, Navigate } from 'react-router-dom';

// Import your pages...
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SearchPage from '../pages/SearchPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';
import BookingPage from '../pages/BookingPage';
import AppointmentsDashboard from '../pages/AppointmentsDashboard';
import HealthVaultPage from '../pages/HealthVaultPage';
import RecordDetailPage from '../pages/RecordDetailPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import SignupPage from '../pages/SignupPage';
import SocialAuthPage from '../pages/SocialAuthPage';

const AppRouter = () => {
  return (
    // 2. Remove the <BrowserRouter> wrapping tags here! Just use <Routes>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth/:provider" element={<SocialAuthPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/doctor/:id" element={<DoctorProfilePage />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/appointments" element={<AppointmentsDashboard />} />
      <Route path="/vault" element={<HealthVaultPage />} />
      <Route path="/vault/record/:recordId" element={<RecordDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;

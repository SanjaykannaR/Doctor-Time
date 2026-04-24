import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 1. Import your pages
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import LoginPage from '../pages/LoginPage';
// Import other pages as you build them (HealthVault, etc.)

const AppRouter = () => {
  return (
    <Routes>
      {/* Redirect the empty path to /home */}
      <Route path="/" element={<Navigate to="/home" />} />
      
      {/* 2. Define the Home and Search routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 3. Catch-all: redirect any unknown URL back to home */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRouter;
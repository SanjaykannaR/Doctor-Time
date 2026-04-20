import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import our pages
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage'; // <-- 1. Import the new page!

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* 2. Add the route for /home */}
        <Route path="/home" element={<HomePage />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
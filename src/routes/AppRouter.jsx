import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import our newly created Login Page
import LoginPage from '../pages/LoginPage';

const AppRouter = () => {
  return (
    // BrowserRouter acts as the "wrapper" that enables all routing features
    <BrowserRouter>
      <Routes>
        {/* If the user goes to the root URL ("/"), immediately redirect them to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Render our LoginPage component when the URL is "/login" */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
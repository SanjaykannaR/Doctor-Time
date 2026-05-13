import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Path to your Layout file
import Dashboard from "./components/Dashboard"; // Path to your Dashboard file
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import Approvals from "./components/Approvals";
import Reports from "./components/Reports";
import Settings from "./components/settings";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TenantLogin from "./pages/TenantLogin";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddProperty from "./pages/AddProperty";
import TenantDashboard from "./pages/TenentDashboard";
import OwnerSignup from "./pages/OwnerSignUp";
import TenentSignup from './pages/TenentSignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenant" element={<TenantLogin />} />
        <Route path="/owner" element={<OwnerLogin />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/add-property" element={<AddProperty />} />
        <Route path="/tenent/dashboard" element={<TenantDashboard />} />
        <Route path="/owner/signup" element={<OwnerSignup />} />
        <Route path="/tenent/signup" element={<TenentSignup />} />
      </Routes>
    </>
  );
}

export default App;

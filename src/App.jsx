import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx"; // Import the new Layout component

// Placeholder pages for demonstration. You'll create these files.
import Profile from "./pages/Profile.jsx";
import Suggestions from "./pages/Suggestions.jsx";
import Maps from "./pages/Maps.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (no Navbar) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (with Navbar via Layout) */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/suggestions" element={<Layout><Suggestions /></Layout>} />
        <Route path="/maps" element={<Layout><Maps /></Layout>} />
        {/* Add any other protected routes here, wrapped in <Layout> */}
      </Routes>
    </Router>
  );
}

export default App;

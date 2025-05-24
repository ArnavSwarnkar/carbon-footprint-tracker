// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Dashboard</h3>

      <button
        onClick={() => navigate("/weekly-entries")}
        className="w-full text-left px-4 py-2 mb-4 bg-green-200 rounded hover:bg-green-300 transition"
      >
        Weekly Details
      </button>

      <button
        onClick={() => navigate("/monthly-entries")}
        className="w-full text-left px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 transition"
      >
        Monthly Details
      </button>
    </div>
  );
}

export default Sidebar;

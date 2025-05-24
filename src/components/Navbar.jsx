import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config'; // Import auth from your firebase config
import { signOut } from 'firebase/auth'; // Import signOut function

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login page after logout
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Optionally, display an error message to the user
    }
  };

  return (
    <>
      <style>{`
        /* Navbar container styles - UPDATED FOR FIXED POSITION */
        .navbar-container {
          background: rgba(255, 255, 255, 0.95); /* Slightly transparent white */
          padding: 1rem 2rem;
          /* Removed border-bottom-left-radius and border-bottom-right-radius for full width fixed bar */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          position: fixed; /* <--- CHANGED FROM 'sticky' TO 'fixed' */
          top: 0;
          left: 0; /* <--- ADDED to ensure it's fixed to the left edge */
          width: 100%; /* <--- Ensures it spans the entire width */
          box-sizing: border-box; /* Ensures padding is included in width */
          z-index: 1000; /* Ensures it stays on top of other content */
          font-family: Arial, sans-serif;
        }

        /* Logo/Brand Name */
        .navbar-logo {
          font-size: 1.8rem;
          font-weight: 700;
          color: #4caf50; /* Green from your theme */
          text-decoration: none;
          letter-spacing: 0.05em;
        }

        /* Navigation links container */
        .navbar-links {
          display: flex;
          gap: 1.5rem; /* Space between buttons */
          align-items: center;
        }

        /* Common button styles */
        .navbar-button {
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 8px; /* Slightly more rounded */
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none; /* For Link components */
          display: inline-flex; /* To align text and potential icons */
          align-items: center;
          justify-content: center;
        }

        /* Link button specific styles */
        .navbar-link-button {
          background-color: transparent;
          color: #333; /* Dark text for links */
          border: 1px solid #ddd; /* Subtle border */
        }

        .navbar-link-button:hover {
          background-color: #f0f0f0;
          color: #4caf50; /* Green on hover */
          border-color: #4caf50;
        }

        /* Logout button specific styles */
        .navbar-logout-button {
          background-color: #f44336; /* Red for logout */
          color: white;
          box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
        }

        .navbar-logout-button:hover {
          background-color: #d32f2f;
          box-shadow: 0 4px 10px rgba(211, 47, 47, 0.4);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .navbar-container {
            flex-direction: column;
            padding: 1rem;
            /* Removed border-radius for full width fixed bar on mobile too */
          }
          .navbar-links {
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
            margin-top: 1rem;
          }
          .navbar-button {
            width: 100%; /* Full width buttons on small screens */
          }
        }
      `}</style>
      <nav className="navbar-container" aria-label="Main Navigation">
        <Link to="/home" className="navbar-logo">
          CarbonFootprint
        </Link>
        <div className="navbar-links">
          <Link to="/profile" className="navbar-button navbar-link-button">
            Profile
          </Link>
          <Link to="/suggestions" className="navbar-button navbar-link-button">
            Suggestions
          </Link>
          <Link to="/maps" className="navbar-button navbar-link-button">
            Maps (WIP)
          </Link>
          <button onClick={handleLogout} className="navbar-button navbar-logout-button">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
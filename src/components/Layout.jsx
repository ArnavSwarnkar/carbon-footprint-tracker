// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar.jsx';

function Layout({ children }) {
  // IMPORTANT: Set this value to the actual height of your Navbar.
  // Based on your Navbar's CSS (padding: 1rem 2rem, plus content height),
  // 60px-70px is a good starting estimate. You may need to fine-tune this.
  const NAVBAR_HEIGHT = '70px'; // Adjust this value after inspecting your Navbar's true height

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensures the whole app container takes at least full viewport height
      boxSizing: 'border-box', // Good practice to include
    }}>
      {/* The Navbar, which is position: fixed */}
      <Navbar />

      {/* The main content area that needs to be pushed down */}
      <main style={{
        flexGrow: 1, // Ensures this area takes up all remaining vertical space
        paddingTop: NAVBAR_HEIGHT, // Pushes content down by Navbar's height
        // No other padding is needed directly on <main> if child components manage their own.
        // If you had padding: '20px' before, it was creating extra space *inside* main.
        // We only need padding-top for fixed navbars.
        // If you want space on left/right/bottom of pages, apply it *inside* the page components.
        
        display: 'flex', // Important for Home.jsx (which is a flex container) to fill this space
        flexDirection: 'column', // In case main's children need vertical stacking
        overflow: 'auto', // Changed from 'hidden' to 'auto' to allow scrolling within main if content overflows
        boxSizing: 'border-box', // Good practice
      }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
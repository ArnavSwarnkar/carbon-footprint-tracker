// src/pages/WeeklyDetails.jsx
import React from 'react';

function WeeklyDetails() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Enter Weekly Details</h3>
      <p>This is where your weekly data input form will go.</p>
      <p>For now, just displaying: **WEEKLY DETAILS**</p>
      {/* You'll put your weekly form (with inputs like geyser_hours, meat_kg, etc.) here */}
      {/* For example:
      <form>
        <label>Geyser Hours: <input type="number" /></label><br/>
        <label>Meat (kg): <input type="number" /></label>
        <button type="submit">Submit Weekly Data</button>
      </form>
      */}
    </div>
  );
}

export default WeeklyDetails;
// src/pages/MonthlyDetails.jsx
import React from 'react';

function MonthlyDetails() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Enter Monthly Details</h3>
      <p>This is where your monthly data input form will go.</p>
      <p>For now, just displaying: **MONTHLY DETAILS**</p>
      {/* You'll put your monthly form (with inputs like electricity_kwh, water_liters, etc.) here */}
      {/* For example:
      <form>
        <label>Electricity (kWh): <input type="number" /></label><br/>
        <label>Water (liters): <input type="number" /></label>
        <button type="submit">Submit Monthly Data</button>
      </form>
      */}
    </div>
  );
}

export default MonthlyDetails;
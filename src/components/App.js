import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

const App = () => {
  


   


  return (
    <div className="app-container">
      <h1>OTTERS FROLICKING</h1>
      <p></p>
    </div>
  );
};

export default App;

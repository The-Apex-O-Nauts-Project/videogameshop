import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import {Register} from "./index"
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import '../style/App.css';

const App = () => {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function tokenCheck(){
    if(window.localStorage.getItem("token")){
      setToken(window.localStorage.getItem("token"))
    }
  }

  useEffect(() =>{
    tokenCheck();
  }, [])
  useEffect(() =>{
    if(token){
      setIsLoggedIn(true)
    }
  }, [token])

   


  return (
    <div className="app-container">
      <h1>OTTERS FROLICKING</h1>
      <p></p>
      <Routes>
        <Route
        path="/register"
        element={<Register
        setToken={setToken}
        navigate={navigate}/>}
        />
      </Routes>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import {
  Registering,
  Nav,
  Login,
  Products
} from "./index"
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import '../style/App.css';

const App = () => {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [products, setProducts] = useState([])
  function tokenCheck(){
    if(window.localStorage.getItem("token")){
      setToken(window.localStorage.getItem("token"))
    }
  }
  const navigate = useNavigate()

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
    <h1>Video Game Shop</h1>
    <>
      <Routes>
        <Route
        path='/'
        element={<Nav
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        navigate ={navigate}
        />}
        />
        <Route
        path='/Registering'
        element={<Registering
        setUsername={setUsername}
        username={username}
        setPassword={setPassword}
        password={password}
        setEmail={setEmail}
        email={email}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        navigate={navigate}
        />}
        />
        <Route
        path="/Login"
        element={<Login
        setUsername={setUsername}
        username={username}
        setPassword={setPassword}
        password={password}
        setToken={setToken}
        navigate={navigate}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        />}
        />
        <Route
        path='/Products'
        element={<Products
        setProducts={setProducts}
        products={products}
        navigate={navigate}
        />}
        />
      </Routes>
      
    </>
      </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"
import {
  Register,
  Nav,
  Login,
  Products,
  CreateProduct,
  SingleProduct
} from "./index"
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import '../style/App.css';
import { myData } from '../axios-services/users';


const App = () => {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [user, setUser] = useState({})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [products, setProducts] = useState([])
  const [singleProduct, setSingleProduct] = useState([])
  const [isAdmin, setIsAdmin]=useState(false)
  const [name, setName] = useState("")
  const [description,setDescription] =useState("")
  const [price, setPrice]=useState()
  const [photourl,setPhotoUrl]= useState("")
  const [category,setCategory]= useState("")
  const navigate = useNavigate()


useEffect(() =>{
    tokenCheck();
  }, [])
  useEffect(() =>{
    if(token){
      setIsLoggedIn(true)
      // setUser(user)
      
    }
  }, [token])
  
  // useEffect(()=>{
  //     if(isLoggedIn){
  //       fetchUserData(user.id)
  //       }
  // }, [isLoggedIn])
  function tokenCheck(){
    if(window.localStorage.getItem("token")){
      setToken(window.localStorage.getItem("token"))
    }
  }
  
  async function fetchUserData(){
    try{
      const response = await myData(userId);
      // const user = response.user;
      // setIsAdmin(user.isAdmin)
      // console.log("isAdmin", isAdmin)
      console.log(response.user)
    }catch(err){
      console.error("Error Fetching Data", err)
    }
  }


  
  return (
    <div className="app-container">
    <h1>Video Game Shop</h1>
    <Nav
      isAdmin={isAdmin}
      setToken={setToken}
      setIsLoggedIn={setIsLoggedIn}
      isLoggedIn={isLoggedIn}
      navigate ={navigate}
    />
    <>
      <Routes>
  
        <Route
        path='/register'
        element={<Register
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
        path="/login"
        element={<Login
        // setUser={setUser}
        setUsername={setUsername}
        username={username}
        setPassword={setPassword}
        password={password}
        setToken={setToken}
        navigate={navigate}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setIsAdmin={setIsAdmin}
        />}
        />
        <Route
        path='/products'
        element={<Products
        singleProduct={singleProduct}
        setSingleProduct={setSingleProduct}
        setProducts={setProducts}
        products={products}
        navigate={navigate}
        />}
        />
        <Route
        path="/single-product/:productId"
        element={<SingleProduct
        navigate={navigate}
        singleProduct={singleProduct}
        setSingleProduct={setSingleProduct}
        />}
        />
        <Route
        path="/create-product"
        element={<CreateProduct
        navigate={navigate}
        setName={setName}
        name={name}
        setDescription={setDescription}
        description={description}
        setPrice={setPrice}
        price={price}
        setPhotoUrl={setPhotoUrl}
        photourl={photourl}
        setCategory={setCategory}
        category={category}
        />}/>
      </Routes>
      
    </>
      </div>
  );
};

export default App;

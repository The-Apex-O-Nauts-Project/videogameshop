import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate, Link} from "react-router-dom"

import {
  Register,
  Nav,
  Login,
  Products,
  CreateProduct,
  SingleProduct,
  Cart
} from "./index"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import '../style/App.css';
import { getUser } from '../axios-services/users';


const App = () => {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState('')
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [singleProduct, setSingleProduct] = useState([])
  const [isAdmin, setIsAdmin]=useState(false)
  const [name, setName] = useState("")
  const [description,setDescription] =useState("")
  const [price, setPrice]=useState()
  const [photourl,setPhotoUrl]= useState("")
  const [category,setCategory]= useState("")
  const [cartUserId, setCartUserId] =useState("")
  const [productId, setProductId] = useState("")
  const [total, setTotal] = useState("")
  const [cartId, setCartId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

const getCurrentUser = async (token)=>{
  try{
    const result = await getUser(token)
    console.log("This is the user", result)
    
    setIsAdmin(result.isadmin)
    setUser(result)


  }catch(err){
    console.error("Problem at get User in App!", err)
  }
}

useEffect(() =>{
    tokenCheck();
  }, [])
  useEffect(() =>{
    if(token){
      setIsLoggedIn(true)
      getCurrentUser(token)
    }
  }, [token])
  
 
  function tokenCheck(){
    if(window.localStorage.getItem("token")){
      setToken(window.localStorage.getItem("token"))
    }
  }
  function Copyright() {
    return (
      <Typography variant="body2" color="white" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3001/">
          Apex Shop
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  


  
  return (
    <div className="app-container" style={{
      backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/HiAqRxvtKqvxzVTWSov7bA.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: 'auto',
      height: 'auto',
    }}>
    <h1 
    style={{backgroundColor:"rgb(79,89,63)", color:"white", borderRadius: '8px' }}
    >Apex Shop</h1>
    <Nav
      isAdmin={isAdmin}
      setToken={setToken}
      setIsLoggedIn={setIsLoggedIn}
      isLoggedIn={isLoggedIn}
      navigate ={navigate}
      user={user}
      setCartUserId={setCartUserId}
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
        emailError={emailError}
        setEmailError={setEmailError}
        usernameError={usernameError}
        setUsernameError={setUsernameError}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        />}
        />
        <Route
        path="/login"
        element={<Login
        setUser={setUser}
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
        path='/'
        element={<Products
        user={user}
        singleProduct={singleProduct}
        setSingleProduct={setSingleProduct}
        setProducts={setProducts}
        products={products}
        navigate={navigate}
        setCartUserId={setCartUserId}
        setProductId={setProductId}
        quantity={quantity}
        total={total}
        cartUserId={cartUserId}
        productId={productId}
        setQuantity={setQuantity}
        setTotal={setTotal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        
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
        <Route
        path='/userandcart/:userId'
        element={<Cart
        cart={cart}
        setCart={setCart}
        products={products}
        setProducts={setProducts}
        user={user}
        />}
        />
      </Routes>
      <Box  component="footer">
      
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        
      </Typography>
      <Copyright />
    </Box>
   
    </>
      </div>
  );
};

export default App;

import React from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchCartByUserId } from "../axios-services/cart";

function Nav(props){
    const {
        setToken, 
        setIsLoggedIn, 
        isLoggedIn, 
        isAdmin, 
        navigate, 
        user,
       
        setCartUserId,
        setCart
    } = props
    
    function logout(){
        setToken("")
        setIsLoggedIn(false)
        window.localStorage.removeItem("token")
        navigate("/")
    }
    const handlleGoToCart = async() =>{
        
        try{

            console.log("This is the user id", user.id)
            const result = await fetchCartByUserId(user.id)
            console.log("This is the cart", result)
            if(result.cart){
                setCart(result.cart)
                console.log(result.cart)
                navigate(`/cart/${user.id}`)
            }else{
                alert("You do not have a cart")
            }
        }catch(err){
            console.error("There was an error getting the users cart", err)
        }
    }
    return(
        <nav className="nav-bar">
            {!isLoggedIn ?
            <>
            <Button variant="contained" style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
              }}>
                <Link to="/Register" 
                style={{textDecoration:"none", color:"white"}}>
                    Register
                    </Link>
            </Button>
           
            <Button variant="contained" style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
              }}>
                <Link to="/Login" 
                style={{textDecoration:"none", color:"white"}}>Login</Link>
            </Button>
           
            <Button variant="contained"style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
              }}>
                <Link to="/" 
                style={{textDecoration:"none", color:"white"}}>Store</Link>
            </Button> 
            </>
            :
            <>
            <Button variant="contained" style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
              }}>
                <Link to="/" 
                style={{textDecoration:"none", color:"white"}}
                >Store</Link>
            </Button>
           
            <Button variant="contained" 
            startIcon={<ShoppingCartIcon/>} 
            style={{
                textDecoration:"none", 
                color:"white", 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}}}
            onClick={handlleGoToCart}
            >
                Cart
            </Button>
           
            
            <Button type="sumbit" variant="contained" onClick={logout} 
            style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
              }}>
                Log Out</Button>
                { isAdmin ?  
                <Button variant="contained" style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                    background:"rgb(107,118,86)", 
                    '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                    backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
                  }}>
                    <Link to="/create-product" 
                        style={{textDecoration:"none", color:"white"}}>
                        Create Product
                    </Link>
                </Button> : null}
            </> 
            }
        </nav>    
    )
}

export default Nav;
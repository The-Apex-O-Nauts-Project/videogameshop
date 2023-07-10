import React from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Nav(props){
    const {setToken, setIsLoggedIn, isLoggedIn, isAdmin, navigate} = props
    function logout(){
        setToken("")
        setIsLoggedIn(false)
        window.localStorage.removeItem("token")
        navigate("/")
    }

    return(
        <nav className="nav-bar">
            {!isLoggedIn ?
            <>
            <Button variant="contained" >
                <Link to="/Register" 
                style={{textDecoration:"none", color:"white"}}>
                    Register
                    </Link>
            </Button>
           
            <Button variant="contained">
                <Link to="/Login" 
                style={{textDecoration:"none", color:"white"}}>Login</Link>
            </Button>
           
            <Button variant="contained">
                <Link to="/" 
                style={{textDecoration:"none", color:"white"}}>Store</Link>
            </Button> 
            </>
            :
            <>
            <Button variant="contained" >
                <Link to="/" 
                style={{textDecoration:"none", color:"white"}}
                >Store</Link>
            </Button>
            <Button variant="contained">
                <Link to="/create-product" 
                style={{textDecoration:"none", color:"white"}}>Create Product</Link>
            </Button>
            <Button variant="contained" 
            startIcon={<ShoppingCartIcon/>} 
            style={{textDecoration:"none", color:"white"}}>
                Your Cart
            </Button>
           
            
            <Button type="sumbit" variant="contained" onClick={logout}>Log Out</Button>
        
            </> 
            }
        </nav>    
    )
}

export default Nav;
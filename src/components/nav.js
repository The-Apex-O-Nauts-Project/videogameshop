import React from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';

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
            <Button variant="contained">
                <Link to="/Registering">Register</Link>
            </Button>
           
            <Button variant="contained">
                <Link to="/Login">Login</Link>
            </Button>
           
            <Button variant="contained">
                <Link to="/Products">Games</Link>
            </Button> 
            </>
            :
            <>
            <Button variant="contained">
                <Link to="/Products">Games</Link>
            </Button>
            <Button variant="contained">
                <Link to="/CreateProduct">Create Product</Link>
            </Button>
           
            
            <Button type="sumbit" variant="contained" onClick={logout}>Log Out</Button>
        
            </> 
            }
        </nav>    
    )
}

export default Nav;
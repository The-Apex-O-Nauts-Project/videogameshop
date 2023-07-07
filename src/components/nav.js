import React from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';

function Nav({setToken, setIsLoggedIn, isLoggedIn}){
    function logout(){
        setToken("")
        setIsLoggedIn(false)
        window.localStorage.removeItem("token")
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
            
            <Button type="sumbit" onClick={logout}>Log Out</Button>
            </> 
            }
        </nav>    
    )
}

export default Nav;
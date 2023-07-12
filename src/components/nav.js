import React from "react"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Nav(props){
    const {setToken, 
        setIsLoggedIn, 
        isLoggedIn, 
        isAdmin, 
        navigate,
        setCartUserId, 
        user} = props
    
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
            onClick={()=>{ navigate(`/userandcart/${user.id}`), setCartUserId(user.id)}}
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
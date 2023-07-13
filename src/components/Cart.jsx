import React, {useEffect} from "react"
import { Link } from "react-router-dom"
import {fetchUsersCart} from "../axios-services/cart"
import Button from '@mui/material/Button';
import "../style/Product.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const Cart = (props) =>{
    const { 
        cart,
        setCart,
        products,
        setProducts,
        user,
    }=props
    useEffect(() => {
        async function UserCart(){
            const response = await fetchUsersCart();
            const result = response
            console.log("This is users cart", result)
            setCart(result)
        }
        UserCart();
    }, [])

    return(
        <>
        <h1>Cart</h1>
       
        <Button 
         variant="contained">
        <Link to="/" style={{textDecoration:"none", color:"white"}}>Back to products</Link>
        </Button>
        </>
    )
};

export default Cart;
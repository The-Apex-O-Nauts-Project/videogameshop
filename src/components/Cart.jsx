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
        <Grid container spacing={4}>
          {cart.map((cartItem) => (
              <Grid item key={cartItem.id} xs={12} sm={6} md={4}>
             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {cartItem.quantity}
                  </Typography>
                  <Typography>
                   ${cartItem.total}
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
                      
              </Card>
        </Grid>
          ))}
        </Grid>
        <Button
         
         variant="contained">
        <Link to="/" style={{textDecoration:"none", color:"white"}}>Back to products</Link>
        </Button>
        </>
    )
};

export default Cart;
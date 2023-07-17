import React, {useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import {fetchCartByUserId } from "../axios-services/cart"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';



const Cart = (props) => {
  const { id } = useParams();
  console.log(id)
  const {
      cart,
      setCart,
      products,
      setProducts,
      user,
    
  } = props;
  const defaultTheme = createTheme()

console.log(user)
console.log(cart)
const calculateTotal = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.productprice;
  });
  return total;
};
const handleDeleteItem = (ev, productId) =>{
  ev.preventDefault();
  const updatedCart = cart.filter((item) => item.productId !== productId)
  setCart(updatedCart)
}

return(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline/>
      <Container  sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
        background:"rgb(190,210,175)", 
        alignItems:"center", py: 4, justifyContent:"center",
        color:"white" }} maxWidth="md">
        <ul style={{color:"white"}}>
          {
            cart.map((cartuser) =>(
            <Paper variant="outlined" sx={{ color:"white", background:"rgb(107,118,86)", 
            my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <span style={{ display: "flex", flexDirection: "row", justifyContent:"space-evenly" }}>
              <Typography key={cartuser.id} >
              {cartuser.productname}</Typography>
              <Typography >${cartuser.productprice}</Typography>
              </span>
              <Typography>{cartuser.productdescription}</Typography>
              <Typography>This is the Quantity: {cartuser.productquantity}</Typography>
              <Button
                variant="contained"
                style={{
                  background:"rgb(107, 118, 86)",
                  boxShadow:"0 2px 4px rgba(0, 0, 0, 1)",
                }}
                onClick={(ev) =>  handleDeleteItem(ev, cartuser.productId)}
                startIcon={<RemoveShoppingCartIcon/>}>
        
                </Button>

            </Paper>
                        ))}
        </ul>
        <Paper style={{background:"rgb(107,118,86)", color:"white", padding:" 25px"}}>
        <span style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>    
        <Typography variant="h4" style={{justifyContent:"space-evenly"}}>Total: ${calculateTotal()}</Typography>
        <Button variant="contained" style={{background:"rgb(107,118,86)", 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 1)'}}>
          <Link to="/check-out" style={{textDecoration:"none", color:"white"}}>
          Checkout
          </Link>
        </Button>
        </span>

        </Paper>
    </Container>
</ThemeProvider>
)
   

};


export default Cart;
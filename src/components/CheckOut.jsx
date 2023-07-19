import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {destroyCart} from "../axios-services/cart"


function CheckOut(props) {
    const {showOrderConfirmation, 
        setShowOrderConfirmation, 
        cart,
        handlleGoToCart} = props

    // console.log("this is the cart", cart)
    // setShowOrderConfirmation(false)
    const defaultTheme = createTheme()

    function handleOrder(){
        setShowOrderConfirmation(true)
    }
    const handleDeleteItem = async (ev) =>{
        console.log("This is the event", ev)
        try{
      
        destroyCart(ev)
      
      
        }catch(err){
        console.error("There was an error deleting the item", err);
    }
}
const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
        total += item.productprice;
    });
    return total;
};

return (
    
    <ThemeProvider theme={defaultTheme}>
    <Container
      component="main"
      maxWidth="xs"
      style={{
          boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
          background: 'rgb(79, 89, 63)',
          borderRadius: '8px',
          color: 'white'
        }}>
        {showOrderConfirmation ? (
            
            <Typography variant="h5">
            Thank you for your order. Your order number is #2001539. We have emailed your order confirmation, and will
            send you an update when your order has shipped.
          </Typography>
            ):(<>
            <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
            {cart.map((item) => (
                <Grid item xs={12} key={item.id}>
                <Paper
                  style={{
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
                      background: 'rgb(190, 210, 175)',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'right',
                      padding: '25px'
                    }}
                    >
                  <Typography variant="body1">{item.productname}</Typography>
                  <Typography variant="body1">${item.productprice}</Typography>
                  <Button
                    variant="contained"
                    style={{
                        background: 'rgb(107, 118, 86)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 1)'
                    }}
                    onClick={() => {
                        handleDeleteItem(item.id);
                        console.log('handlleGoToCart');
                        handlleGoToCart();
                        navigate(`/cart/${user.id}`);
                    }}
                    startIcon={<RemoveShoppingCartIcon />}
                    >
                  </Button>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                label="Remember credit card details for next time"
                />
            </Grid>
            <Paper
              style={{
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
                  background: 'rgb(190, 210, 175)',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  padding: '25px'
                }}
                >
              <Typography variant="body2">Your Total: ${calculateTotal()}</Typography>
            </Paper>
            <Button
              type="submit"
              variant="contained"
              style={{
                  textDecoration: 'none',
                  color: 'white',
                  background: 'rgb(190, 210, 175)'
                }}
                onClick={handleOrder}
                >
              Check Out
            </Button>
      </Grid>
      </>)}
    </Container>
  </ThemeProvider>
  );
}

export default CheckOut
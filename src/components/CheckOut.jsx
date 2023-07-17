import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

 function CheckOut(props) {
    const {showOrderConfirmation, setShowOrderConfirmation} = props
    const defaultTheme = createTheme()
    function handleOrder(){
        setShowOrderConfirmation(true)
    }
    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
              background:"rgb(79,89,63)", 
              borderRadius: '8px',}}>
        <Typography variant="h6" gutterBottom>
            Payment method
        </Typography>
        <Grid container spacing={3}>
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
            <Button 
            type="submit" 
            variant='contained'
            style={{textDecoration:"none", 
            color:"white", background:"rgb(190,210,175)"}}
            onClick={handleOrder}>
                Check Out
            </Button>
            {showOrderConfirmation && (
            <Typography variant='h5'>
                Thank you for your order. Your order number is #2001539. 
                We have emailed your order confirmation, 
                and will send you an update when your order has shipped.
            </Typography>  
            )}
        </Grid>
    </Container>  
    </ThemeProvider>
  );
}

export default CheckOut